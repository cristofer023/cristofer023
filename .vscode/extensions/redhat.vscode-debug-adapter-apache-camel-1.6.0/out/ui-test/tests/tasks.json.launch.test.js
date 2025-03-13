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
const vscode_extension_tester_1 = require("vscode-extension-tester");
const utils_1 = require("../utils");
const variables_1 = require("../variables");
const path = __importStar(require("path"));
const chai_1 = require("chai");
describe('Launch configuration from tasks.json autocompletion', function () {
    this.timeout(360000);
    let driver;
    let textEditor;
    before(async function () {
        // Tested in main pipeline.
        if (process.env.CAMEL_VERSION) {
            this.skip();
        }
    });
    async function setupEnvironment(resourceDir, vscodeDir, launch = false) {
        driver = vscode_extension_tester_1.VSBrowser.instance.driver;
        await vscode_extension_tester_1.VSBrowser.instance.openResources(resourceDir);
        await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Explorer'))?.openView();
        await (0, utils_1.deleteResource)(vscodeDir);
        await (0, utils_1.createFolder)(vscodeDir);
        await (0, utils_1.createFile)(variables_1.TASKS_TEST_FILE, vscodeDir); // create tasks.json
        if (launch) {
            await (0, utils_1.createFile)(variables_1.LAUNCH_JSON, vscodeDir); // create launch.json
        }
    }
    async function tearDownEnvironment(vscodeDir) {
        await (0, utils_1.killTerminal)();
        await new vscode_extension_tester_1.EditorView().closeAllEditors();
        await (0, utils_1.deleteResource)(vscodeDir);
    }
    async function createJsonConfiguration(taskName, resourceDir, fileName, workaroundLine) {
        await (0, utils_1.openFileInEditor)(driver, resourceDir, fileName);
        const textEditor = await (0, utils_1.activateEditor)(driver, fileName);
        await textEditor?.setText((0, utils_1.getFileContent)(fileName, variables_1.RESOURCES_DIR));
        // workaround for https://github.com/redhat-developer/vscode-extension-tester/issues/931
        await textEditor?.setTextAtLine(workaroundLine, "        ");
        await textEditor?.moveCursor(workaroundLine, 9);
        await (0, utils_1.selectFromCA)(taskName);
        await textEditor?.save();
    }
    async function createTasksJsonConfiguration(taskName, resourceDir) {
        await createJsonConfiguration(taskName, resourceDir, variables_1.TASKS_TEST_FILE, 6);
    }
    async function createLaunchJsonConfiguration(taskName, resourceDir) {
        await createJsonConfiguration(taskName, resourceDir, variables_1.LAUNCH_JSON, 8);
    }
    describe(variables_1.RUN_WITH_JBANG_WITH_CAMEL_DEBUG, function () {
        before(async function () {
            await setupEnvironment(variables_1.RESOURCES_DIR, variables_1.RESOURCES_DOT_VSCODE_DIR);
        });
        after(async function () {
            await tearDownEnvironment(variables_1.RESOURCES_DOT_VSCODE_DIR);
        });
        it('Launch with tasks.json configuration', async function () {
            await createTasksJsonConfiguration(variables_1.RUN_WITH_JBANG_WITH_CAMEL_DEBUG, variables_1.RESOURCES_DOT_VSCODE_DIR);
            await (0, utils_1.openFileInEditor)(driver, variables_1.RESOURCES_DIR, variables_1.TASKS_TEST_FILE_CAMEL_XML);
            await (0, utils_1.executeCommand)(variables_1.TASKS_COMMAND);
            await (0, utils_1.selectTask)(driver, variables_1.RUN_WITH_JBANG_WITH_CAMEL_DEBUG);
            await (0, utils_1.waitUntilTerminalHasText)(driver, [variables_1.ENABLING_CAMEL_DEBUGGER], 2000, 60000);
        });
    });
    describe(variables_1.START_WITH_CAMEL_DEBUG_MVN_GOAL, function () {
        const EXAMPLE_SRC_DIR = path.join(variables_1.MAIN_CAMEL_EXAMPLE_DIR, 'src', 'main', 'java', 'org', 'apache', 'camel', 'example');
        const EXAMPLE_FILE = 'MyApplication.java';
        before(async function () {
            await setupEnvironment(variables_1.MAIN_CAMEL_EXAMPLE_DIR, variables_1.MAIN_CAMEL_EXAMPLE_DOT_VSCODE_DIR);
        });
        after(async function () {
            await tearDownEnvironment(variables_1.MAIN_CAMEL_EXAMPLE_DOT_VSCODE_DIR);
            await (0, utils_1.executeCommandInTerminal)(variables_1.MVN_CLEAN);
            await (0, utils_1.waitUntilTerminalHasText)(driver, [variables_1.MVN_BUILD_SUCCESS], 1000, 60000);
            await (0, utils_1.killTerminal)();
        });
        it('Launch with tasks.json configuration', async function () {
            await createTasksJsonConfiguration(variables_1.START_WITH_CAMEL_DEBUG_MVN_GOAL, variables_1.MAIN_CAMEL_EXAMPLE_DOT_VSCODE_DIR);
            await (0, utils_1.openFileInEditor)(driver, EXAMPLE_SRC_DIR, EXAMPLE_FILE);
            await (0, utils_1.executeCommandInTerminal)(variables_1.MVN_COMPILE);
            await (0, utils_1.waitUntilTerminalHasText)(driver, [variables_1.MVN_BUILD_SUCCESS], 1000, 60000);
            await (0, utils_1.executeCommand)(variables_1.TASKS_COMMAND);
            await (0, utils_1.selectTask)(driver, variables_1.START_WITH_CAMEL_DEBUG_MVN_GOAL);
            await (0, utils_1.waitUntilTerminalHasText)(driver, [variables_1.ENABLING_CAMEL_DEBUGGER], 2000, 60000);
            chai_1.assert.isTrue((await (await (0, utils_1.activateTerminalView)()).getText()).includes("Started foo (timer://foo)"));
        });
    });
    describe('Provide UI test for snippet to create combined launch configuration with Camel Debug Adapter', function () {
        before(async function () {
            await setupEnvironment(variables_1.RESOURCES_DIR, variables_1.RESOURCES_DOT_VSCODE_DIR, true);
        });
        after(async function () {
            await (0, utils_1.disconnectDebugger)(driver);
            await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Run and Debug'))?.closeView();
            await tearDownEnvironment(variables_1.RESOURCES_DOT_VSCODE_DIR);
        });
        it('Combined launch configuration with Camel Debug Adapter', async function () {
            await createTasksJsonConfiguration(variables_1.RUN_WITH_JBANG_WITH_CAMEL_DEBUG, variables_1.RESOURCES_DOT_VSCODE_DIR);
            await createLaunchJsonConfiguration(variables_1.LAUNCH_START_AND_ATTACH_DEBUGGER, variables_1.RESOURCES_DOT_VSCODE_DIR);
            textEditor = await (0, utils_1.activateEditor)(driver, variables_1.LAUNCH_JSON);
            await textEditor?.setTextAtLine(12, "            \"preLaunchTask\": \"" + variables_1.RUN_WITH_JBANG_WITH_CAMEL_DEBUG + "\"");
            await textEditor?.save();
            await (0, utils_1.openFileInEditor)(driver, variables_1.RESOURCES_DIR, variables_1.TASKS_TEST_FILE_CAMEL_XML);
            const btn = await new vscode_extension_tester_1.ActivityBar().getViewControl('Run');
            const debugView = (await btn?.openView());
            const configs = await debugView.getLaunchConfigurations();
            chai_1.assert.isTrue(configs.includes(variables_1.ATTACH_DEBUGGER_USING_PRELAUNCH_TASK));
            await (0, utils_1.killTerminal)(); // prevent failure
            await debugView.selectLaunchConfiguration(variables_1.ATTACH_DEBUGGER_USING_PRELAUNCH_TASK);
            await debugView.start();
            await (0, utils_1.waitUntilTerminalHasText)(driver, [variables_1.ENABLING_CAMEL_DEBUGGER, utils_1.DEBUGGER_ATTACHED_MESSAGE, "Hello Camel from route1"], 2500, 20000);
        });
    });
});
//# sourceMappingURL=tasks.json.launch.test.js.map