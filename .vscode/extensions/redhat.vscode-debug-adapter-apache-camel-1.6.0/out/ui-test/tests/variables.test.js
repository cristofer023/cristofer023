"use strict";
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
const vscode_extension_tester_1 = require("vscode-extension-tester");
const utils_1 = require("../utils");
const variables_1 = require("../variables");
describe('Display exchange variables values test', function () {
    this.timeout(300000);
    let driver;
    let textEditor;
    before(async function () {
        if ((0, utils_1.isCamelVersionProductized)(process.env.CAMEL_VERSION) || (process.env.CAMEL_VERSION !== undefined && !(0, utils_1.isVersionNewer)("4.4.0", process.env.CAMEL_VERSION))) { // available since Camel 4.4
            this.skip();
        }
        driver = vscode_extension_tester_1.VSBrowser.instance.driver;
        await vscode_extension_tester_1.VSBrowser.instance.openResources(variables_1.RESOURCES_DIR);
        await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Explorer'))?.openView();
        const section = await new vscode_extension_tester_1.SideBarView().getContent().getSection('resources');
        await section.openItem(variables_1.VARIABLESTEST_YAML);
        const editorView = new vscode_extension_tester_1.EditorView();
        await driver.wait(async function () {
            return (await editorView.getOpenEditorTitles()).find(title => title === variables_1.VARIABLESTEST_YAML);
        }, 5000);
        await (0, utils_1.executeCommand)(utils_1.CAMEL_RUN_DEBUG_ACTION_QUICKPICKS_LABEL);
        await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Run'))?.openView();
        await (0, utils_1.waitUntilTerminalHasText)(driver, [utils_1.DEBUGGER_ATTACHED_MESSAGE], 4000, 120000);
        textEditor = new vscode_extension_tester_1.TextEditor();
    });
    after(async function () {
        if ((0, utils_1.isCamelVersionProductized)(process.env.CAMEL_VERSION) || (process.env.CAMEL_VERSION !== undefined && !(0, utils_1.isVersionNewer)("4.4.0", process.env.CAMEL_VERSION))) {
            // do nothing - after is executed even if skip is called in before
        }
        else {
            await (0, utils_1.disconnectDebugger)(driver);
            await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Run and Debug'))?.closeView();
            await (0, utils_1.killTerminal)();
            await new vscode_extension_tester_1.EditorView().closeAllEditors();
        }
    });
    it('Variable is displayed', async function () {
        await driver.wait(async function () {
            return await textEditor.toggleBreakpoint(10);
        }, 5000);
        const sectionItem = await (0, utils_1.getDebuggerSectionItem)(driver, 'item' + utils_1.DEBUG_ITEM_OPERATOR, 'Message', 'Variables');
        (0, chai_1.expect)(await sectionItem?.getVariableValue()).to.be.equal("world");
        const sectionItem2 = await (0, utils_1.getDebuggerSectionItem)(driver, 'name' + utils_1.DEBUG_ITEM_OPERATOR, 'Message', 'Variables');
        (0, chai_1.expect)(await sectionItem2?.getVariableValue()).to.be.equal("Camel");
    });
    const EXCHANGED_VALUE = "exchanged value";
    const EXCHANGED_LOG = ["Hello exchanged value from Camel"];
    // Tis functionality was added in version 4.4.1. 
    // https://issues.apache.org/jira/browse/CAMEL-20445
    it('Update exchange variable values', async function () {
        if (process.env.CAMEL_VERSION !== undefined && !(0, utils_1.isVersionNewer)("4.4.1", process.env.CAMEL_VERSION)) {
            this.skip();
        }
        const sectionItem = await (0, utils_1.getDebuggerSectionItem)(driver, 'item' + utils_1.DEBUG_ITEM_OPERATOR, 'Message', 'Variables');
        await sectionItem?.setVariableValue(EXCHANGED_VALUE);
        const debugBar = await vscode_extension_tester_1.DebugToolbar.create();
        await debugBar.continue();
        await (0, utils_1.waitUntilTerminalHasText)(driver, EXCHANGED_LOG, 4000, 120000);
    });
});
//# sourceMappingURL=variables.test.js.map