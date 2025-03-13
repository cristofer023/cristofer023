/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License", destination); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
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
exports.projectPath = exports.storageFolder = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const variables = __importStar(require("./variables"));
const vscode_extension_tester_1 = require("vscode-extension-tester");
exports.storageFolder = variables.TEST_RESOURCES_DIR;
const releaseType = process.env.CODE_TYPE === 'insider' ? vscode_extension_tester_1.ReleaseQuality.Insider : vscode_extension_tester_1.ReleaseQuality.Stable;
exports.projectPath = path.resolve(__dirname, '..', '..');
const extensionFolder = variables.EXTENSION_DIR;
const coverage = process.argv[2] === 'coverage';
const deploy = process.argv[2] === 'deploy';
async function main() {
    const tester = new vscode_extension_tester_1.ExTester(exports.storageFolder, releaseType, extensionFolder, coverage);
    const tests = deploy ? 'out/ui-test/tests/deploy*.test.js' : [
        'out/ui-test/env/set.camel.version.js',
        'out/ui-test/tests/!(deploy)*.test.js', // run everything, except deployment tests
        'out/ui-test/env/check.camel.version.js'
    ];
    await tester.setupAndRunTests(tests, process.env.CODE_VERSION, {
        'installDependencies': true
    }, {
        'cleanup': true,
        'settings': './src/ui-test/resources/vscode-settings.json',
        resources: []
    });
    fs.rmSync(extensionFolder, { recursive: true });
}
main().catch((error) => {
    throw Error('Unhandled promise rejection in main: ', error);
});
//# sourceMappingURL=uitest_runner.js.map