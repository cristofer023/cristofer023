"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const test_electron_1 = require("@vscode/test-electron");
const node_child_process_1 = require("node:child_process");
async function main() {
    try {
        // The folder containing the Extension Manifest package.json
        // Passed to `--extensionDevelopmentPath`
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');
        console.log(`extensionDevelopmentPath = ${extensionDevelopmentPath}`);
        // The path to test runner
        // Passed to --extensionTestsPath
        const extensionTestsPath = path.resolve(__dirname, './suite/index');
        console.log(`extensionTestsPath = ${extensionTestsPath}`);
        const testWorkspace = path.resolve(__dirname, '../../test Fixture with speci@l chars');
        console.log(`testWorkspace = ${testWorkspace}`);
        const vscodeVersion = computeVSCodeVersionToPlayTestWith();
        console.log(`vscodeVersion = ${vscodeVersion}`);
        const vscodeExecutablePath = await (0, test_electron_1.downloadAndUnzipVSCode)(vscodeVersion);
        const [cli, ...args] = (0, test_electron_1.resolveCliArgsFromVSCodeExecutablePath)(vscodeExecutablePath);
        (0, node_child_process_1.spawnSync)(cli, [...args, '--install-extension', 'redhat.vscode-yaml'], {
            encoding: 'utf-8',
            stdio: 'inherit'
        });
        await (0, test_electron_1.runTests)({ vscodeExecutablePath, extensionDevelopmentPath, extensionTestsPath, launchArgs: [testWorkspace, '--disable-workspace-trust', '--user-data-dir', `${extensionDevelopmentPath}/.vscode-test`] });
    }
    catch (err) {
        console.error('Failed to run tests');
        process.exit(1);
    }
    function computeVSCodeVersionToPlayTestWith() {
        const envVersion = process.env.CODE_VERSION;
        if (envVersion === undefined || envVersion === 'max') {
            return 'stable';
        }
        else if (envVersion === 'latest') {
            return 'insiders';
        }
        return envVersion;
    }
}
main().catch((error) => {
    console.error('Unhandled promise rejection in main: ', error);
});
//# sourceMappingURL=runTest.js.map