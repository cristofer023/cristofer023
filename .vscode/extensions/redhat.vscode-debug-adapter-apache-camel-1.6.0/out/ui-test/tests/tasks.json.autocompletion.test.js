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
const chai_1 = require("chai");
const utils_1 = require("../utils");
const vscode_extension_tester_1 = require("vscode-extension-tester");
const path = __importStar(require("path"));
const variables_1 = require("../variables");
describe('Completion inside tasks.json', function () {
    this.timeout(120000);
    let driver;
    let textEditor;
    before(async function () {
        // Tested in main pipeline.
        if (process.env.CAMEL_VERSION) {
            this.skip();
        }
        driver = vscode_extension_tester_1.VSBrowser.instance.driver;
        await vscode_extension_tester_1.VSBrowser.instance.openResources(path.resolve('src', 'ui-test', 'resources'));
        await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Explorer'))?.openView();
    });
    (0, vscode_extension_tester_1.afterEach)(async function () {
        await (0, utils_1.closeEditor)(variables_1.TASKS_TEST_FILE, false);
    });
    const PARAMS = [
        // command, filename 
        ['Launch Camel test with Maven with camel.debug profile', '01_launch_camel_debug_profile.json'],
        ['Run Camel application with JBang with camel-debug', '02_run_jbang_w_camel_debug.json'],
        ['Start Camel application with camel:debug Maven goal', '03_start_mvn_camel_debug_goal.json'],
        ['Start Camel application with Maven Quarkus Dev with camel.debug profile', '04_start_mvn_quarkus_dev_debug_profile.json'],
        ['Start Camel application with Maven with camel.debug profile', '05_start_mvn_camel_debug_profile.json'],
        ['Build a Camel Quarkus application as a Native executable debug-ready', '06_build_native_camel_quarkus_debug.json'],
        ['Start Camel native application debug-ready', '07_start_native_camel_quarkus_debug.json']
    ];
    PARAMS.forEach(function (params) {
        const command = params.at(0);
        const file = params.at(1);
        it(`${command}`, async function () {
            await (0, utils_1.openFileInEditor)(driver, variables_1.RESOURCES_DIR, variables_1.TASKS_TEST_FILE);
            textEditor = await (0, utils_1.activateEditor)(driver, variables_1.TASKS_TEST_FILE);
            // workaround for https://github.com/redhat-developer/vscode-extension-tester/issues/931
            await textEditor?.setTextAtLine(6, "        ");
            await textEditor?.moveCursor(6, 9);
            await (0, utils_1.selectFromCA)(command);
            const text = await textEditor?.getText();
            (0, chai_1.expect)(text).equals((0, utils_1.getFileContent)(file, variables_1.RESOURCES_TASK_EXAMPLES_DIR));
        });
    });
});
//# sourceMappingURL=tasks.json.autocompletion.test.js.map