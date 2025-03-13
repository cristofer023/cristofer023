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
const path = __importStar(require("path"));
const fs = __importStar(require("fs-extra"));
const vscode_extension_tester_1 = require("vscode-extension-tester");
const utils_1 = require("../utils");
describe('Jbang commands with automatic reload', function () {
    this.timeout(300000);
    let driver;
    const RESOURCES = path.resolve('src', 'ui-test', 'resources');
    (0, vscode_extension_tester_1.before)(async function () {
        driver = vscode_extension_tester_1.VSBrowser.instance.driver;
        fs.copyFileSync(path.join(RESOURCES, utils_1.CAMEL_ROUTE_YAML_WITH_SPACE), path.join(RESOURCES, utils_1.CAMEL_ROUTE_YAML_WITH_SPACE_COPY));
        await vscode_extension_tester_1.VSBrowser.instance.openResources(RESOURCES);
        await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Explorer'))?.openView();
        const section = await new vscode_extension_tester_1.SideBarView().getContent().getSection('resources');
        await section.openItem(utils_1.CAMEL_ROUTE_YAML_WITH_SPACE_COPY);
        const editorView = new vscode_extension_tester_1.EditorView();
        await driver.wait(async function () {
            return (await editorView.getOpenEditorTitles()).find(title => title === utils_1.CAMEL_ROUTE_YAML_WITH_SPACE_COPY);
        }, 5000);
        await (0, utils_1.executeCommand)(utils_1.CAMEL_RUN_ACTION_QUICKPICKS_LABEL);
        await (0, utils_1.waitUntilTerminalHasText)(driver, utils_1.TEST_ARRAY_RUN);
    });
    (0, vscode_extension_tester_1.after)(async function () {
        await (0, utils_1.killTerminal)();
        await new vscode_extension_tester_1.EditorView().closeAllEditors();
        fs.removeSync(path.join(RESOURCES, utils_1.CAMEL_ROUTE_YAML_WITH_SPACE_COPY));
    });
    beforeEach(async function () {
        await (0, utils_1.clearTerminal)();
    });
    it(`Replace body with automatic reload`, async function () {
        await driver.wait(async () => { return await (0, utils_1.replaceTextInCodeEditor)(utils_1.DEFAULT_BODY, utils_1.TEST_BODY); }, 60000);
        await (0, utils_1.waitUntilTerminalHasText)(driver, [`${utils_1.DEFAULT_HEADER}: ${utils_1.TEST_BODY} ${utils_1.DEFAULT_PROPERTY}`]);
    });
    it(`Replace header with automatic reload`, async function () {
        await driver.wait(async () => { return await (0, utils_1.replaceTextInCodeEditor)(utils_1.DEFAULT_HEADER, utils_1.TEST_HEADER); }, 60000);
        await (0, utils_1.waitUntilTerminalHasText)(driver, [`${utils_1.TEST_HEADER}: ${utils_1.TEST_BODY} ${utils_1.DEFAULT_PROPERTY}`]);
    });
    it(`Replace Exchange Property with automatic reload`, async function () {
        await driver.wait(async () => { return await (0, utils_1.replaceTextInCodeEditor)(utils_1.DEFAULT_PROPERTY, utils_1.TEST_PROPERTY); }, 60000);
        await (0, utils_1.waitUntilTerminalHasText)(driver, [utils_1.TEST_MESSAGE]);
    });
});
//# sourceMappingURL=reload.test.js.map