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
const path = __importStar(require("path"));
const vscode_extension_tester_1 = require("vscode-extension-tester");
const utils_1 = require("../utils");
const variables_1 = require("../variables");
describe('Camel file editor test', function () {
    describe('Camel Actions', function () {
        this.timeout(300000);
        let driver;
        let editorView;
        beforeEach(async function () {
            driver = vscode_extension_tester_1.VSBrowser.instance.driver;
            await vscode_extension_tester_1.VSBrowser.instance.openResources(path.resolve('src', 'ui-test', 'resources', 'actions'));
            await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Explorer'))?.openView();
            const section = await new vscode_extension_tester_1.SideBarView().getContent().getSection('actions');
            await section.openItem('top', variables_1.TOP_ROUTE_1);
            editorView = new vscode_extension_tester_1.EditorView();
            await driver.wait(async function () {
                return (await editorView.getOpenEditorTitles()).find(title => title === variables_1.TOP_ROUTE_1);
            }, 5000);
        });
        afterEach(async function () {
            await editorView.closeAllEditors();
            await new vscode_extension_tester_1.BottomBarPanel().toggle(false);
        });
        it('Run actions are available', async function () {
            if (process.platform === "darwin") {
                this.skip();
            }
            await driver.sleep(500);
            const action = (await editorView.getAction("Run or Debug..."));
            const menu = await action.open();
            (0, chai_1.expect)(await menu.hasItem(utils_1.CAMEL_RUN_ACTION_LABEL)).true;
            (0, chai_1.expect)(await menu.hasItem(variables_1.CAMEL_RUN_WORKSPACE_ACTION_LABEL)).true;
            (0, chai_1.expect)(await menu.hasItem(variables_1.CAMEL_RUN_FOLDER_ACTION_LABEL)).true;
            await menu.close();
        });
        it('Debug and Run actions are available', async function () {
            if (process.platform === "darwin") {
                this.skip();
            }
            await driver.sleep(500);
            const action = (await editorView.getAction("Run or Debug..."));
            const menu = await action.open();
            (0, chai_1.expect)(await menu.hasItem(utils_1.CAMEL_RUN_DEBUG_ACTION_LABEL)).true;
            (0, chai_1.expect)(await menu.hasItem(variables_1.CAMEL_RUN_DEBUG_WORKSPACE_ACTION_LABEL)).true;
            (0, chai_1.expect)(await menu.hasItem(variables_1.CAMEL_RUN_DEBUG_FOLDER_ACTION_LABEL)).true;
            await menu.close();
        });
        const runActionLabels = [
            { label: utils_1.CAMEL_RUN_ACTION_LABEL, terminalText: ['Hello Camel from top-route1'] },
            { label: variables_1.CAMEL_RUN_WORKSPACE_ACTION_LABEL, terminalText: ['Hello Camel from route1', 'Hello Camel from route2'], },
            { label: variables_1.CAMEL_RUN_FOLDER_ACTION_LABEL, terminalText: ['Hello Camel from top-route1', 'Hello Camel from top-route2'] }
        ];
        runActionLabels.forEach(runActionLabels => {
            it(`Can execute '${runActionLabels.label}' action`, async function () {
                if (process.platform === "darwin") {
                    this.skip();
                }
                const action = (await editorView.getAction("Run or Debug..."));
                const menu = await action.open();
                await menu.select(runActionLabels.label);
                await (0, utils_1.waitUntilTerminalHasText)(driver, runActionLabels.terminalText, 2000, 120000);
                await (0, utils_1.killTerminal)();
            });
        });
        const debugActionLabels = [
            { label: utils_1.CAMEL_RUN_DEBUG_ACTION_LABEL, terminalText: ['Hello Camel from top-route1'] },
            { label: variables_1.CAMEL_RUN_DEBUG_WORKSPACE_ACTION_LABEL, terminalText: ['Hello Camel from route1', 'Hello Camel from route2'], },
            { label: variables_1.CAMEL_RUN_DEBUG_FOLDER_ACTION_LABEL, terminalText: ['Hello Camel from top-route1', 'Hello Camel from top-route2'] }
        ];
        debugActionLabels.forEach(debugActionLabels => {
            it(`Can execute '${debugActionLabels.label}' action`, async function () {
                if ((0, utils_1.isCamelVersionProductized)(process.env.CAMEL_VERSION)) {
                    this.skip();
                }
                if (process.platform === "darwin") {
                    this.skip();
                }
                const action = (await editorView.getAction("Run or Debug..."));
                const menu = await action.open();
                await menu.select(debugActionLabels.label);
                await (0, utils_1.waitUntilTerminalHasText)(driver, debugActionLabels.terminalText, 2000, 120000);
                await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Run and Debug'))?.closeView();
                await (0, utils_1.disconnectDebugger)(driver);
                await (0, utils_1.killTerminal)();
            });
        });
    });
});
//# sourceMappingURL=editor.actions.test.js.map