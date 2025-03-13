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
describe('Camel Debugger tests', function () {
    this.timeout(300000);
    let driver;
    let textEditor;
    let skip = true;
    let breakpointToggled = false;
    before(async function () {
        if ((0, utils_1.isCamelVersionProductized)(process.env.CAMEL_VERSION)) {
            this.skip();
        }
        driver = vscode_extension_tester_1.VSBrowser.instance.driver;
        await vscode_extension_tester_1.VSBrowser.instance.openResources(path.resolve('src', 'ui-test', 'resources'));
        await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Explorer'))?.openView();
        const section = await new vscode_extension_tester_1.SideBarView().getContent().getSection('resources');
        await section.openItem(utils_1.CAMEL_ROUTE_YAML_WITH_SPACE);
        const editorView = new vscode_extension_tester_1.EditorView();
        await driver.wait(async function () {
            return (await editorView.getOpenEditorTitles()).find(title => title === utils_1.CAMEL_ROUTE_YAML_WITH_SPACE);
        }, 5000);
        await (0, utils_1.executeCommand)(utils_1.CAMEL_RUN_DEBUG_ACTION_QUICKPICKS_LABEL);
        await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Run'))?.openView();
        await (0, utils_1.waitUntilTerminalHasText)(driver, utils_1.TEST_ARRAY_RUN_DEBUG, 4000, 120000);
        textEditor = new vscode_extension_tester_1.TextEditor();
    });
    after(async function () {
        if ((0, utils_1.isCamelVersionProductized)(process.env.CAMEL_VERSION)) {
            // do nothing - after is executed even if skip is called in before
        }
        else {
            await (0, utils_1.disconnectDebugger)(driver);
            await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Run and Debug'))?.closeView();
            await (0, utils_1.killTerminal)();
            await new vscode_extension_tester_1.EditorView().closeAllEditors();
        }
    });
    it('Toggle breakpoint on line (17)', async function () {
        await driver.wait(async function () {
            return await textEditor.toggleBreakpoint(17);
        }, 5000);
        const breakpoint = await driver.wait(async () => {
            return await textEditor.getPausedBreakpoint();
        }, 10000, undefined, 500);
        (0, chai_1.expect)(await breakpoint.isPaused()).to.be.true;
        breakpointToggled = true;
        skip = false;
    });
    // Skip test due the issue: https://issues.redhat.com/browse/FUSETOOLS2-2162
    it.skip('Disable breakpoint on line (17)', async function () {
        if (skip) {
            this.test?.skip();
        }
        skip = true;
        await (0, utils_1.clearTerminal)();
        const breakpointSectionItem = await (0, utils_1.getBreakpoint)(driver, 17);
        (0, chai_1.expect)(breakpointSectionItem).is.not.undefined;
        await breakpointSectionItem?.setBreakpointEnabled(false);
        (0, chai_1.expect)(await breakpointSectionItem?.isBreakpointEnabled()).to.be.false;
        await (0, utils_1.waitUntilTerminalHasText)(driver, [utils_1.DEFAULT_MESSAGE], 4000, 120000);
        skip = false;
    });
    // Skip test due the issue: https://issues.redhat.com/browse/FUSETOOLS2-2162
    it.skip('Enable breakpoint on line (17)', async function () {
        if (skip) {
            this.test?.skip();
        }
        skip = true;
        const breakpointSectionItem = await (0, utils_1.getBreakpoint)(driver, 17);
        (0, chai_1.expect)(breakpointSectionItem).is.not.undefined;
        await breakpointSectionItem?.setBreakpointEnabled(true);
        (0, chai_1.expect)(await breakpointSectionItem?.isBreakpointEnabled()).to.be.true;
        const breakpoint = await driver.wait(async () => {
            return await textEditor.getPausedBreakpoint();
        }, 10000, undefined, 500);
        (0, chai_1.expect)(await breakpoint.isPaused()).to.be.true;
        skip = false;
    });
    it('Update Body value with Camel debugger', async function () {
        if (skip) {
            this.test?.skip();
        }
        skip = true;
        let sectionItem = await (0, utils_1.getDebuggerSectionItem)(driver, 'Body' + utils_1.DEBUG_ITEM_OPERATOR, 'Message');
        await sectionItem?.setVariableValue(utils_1.TEST_BODY);
        await (0, utils_1.waitUntilTerminalHasText)(driver, [utils_1.TEST_BODY]);
        sectionItem = await (0, utils_1.getDebuggerSectionItem)(driver, 'Body' + utils_1.DEBUG_ITEM_OPERATOR, 'Message');
        (0, chai_1.expect)(await sectionItem?.getVariableValue()).to.be.equal(utils_1.TEST_BODY);
        await (0, utils_1.clearTerminal)();
        skip = false;
    });
    it('Update Header value with Camel debugger', async function () {
        if (skip) {
            this.test?.skip();
        }
        skip = true;
        const debugView = (await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Run'))?.openView());
        await (await debugView.getContent().getSection('Watch')).collapse();
        await (await debugView.getContent().getSection('Call Stack')).collapse();
        let sectionItem = await (0, utils_1.getDebuggerSectionItem)(driver, 'header' + utils_1.DEBUG_ITEM_OPERATOR, 'Message', 'Headers');
        await sectionItem?.setVariableValue(utils_1.TEST_HEADER);
        await (0, utils_1.waitUntilTerminalHasText)(driver, [utils_1.TEST_HEADER]);
        sectionItem = await (0, utils_1.getDebuggerSectionItem)(driver, 'header' + utils_1.DEBUG_ITEM_OPERATOR, 'Message', 'Headers');
        (0, chai_1.expect)(await sectionItem?.getVariableValue()).to.be.equal(utils_1.TEST_HEADER);
        await (0, utils_1.clearTerminal)();
        skip = false;
    });
    it('Update Exchange property value with Camel debugger', async function () {
        if (skip) {
            this.test?.skip();
        }
        // not available in older versions than 4.2.0
        // https://github.com/camel-tooling/camel-debug-adapter/pull/256#issuecomment-1821200978
        if (process.env.CAMEL_VERSION !== undefined && !(0, utils_1.isVersionNewer)("4.2.0", process.env.CAMEL_VERSION)) {
            skip = true;
            this.skip();
        }
        skip = true;
        let sectionItem = await (0, utils_1.getDebuggerSectionItem)(driver, 'from' + utils_1.DEBUG_ITEM_OPERATOR, 'Message', 'Properties');
        await sectionItem?.setVariableValue(utils_1.TEST_PROPERTY);
        sectionItem = await (0, utils_1.getDebuggerSectionItem)(driver, 'from' + utils_1.DEBUG_ITEM_OPERATOR, 'Message', 'Properties');
        (0, chai_1.expect)(await sectionItem?.getVariableValue()).to.be.equal(utils_1.TEST_PROPERTY);
        await (0, utils_1.clearTerminal)();
        skip = false;
    });
    it('Click on Continue button, and check updated message', async function () {
        if (skip) {
            this.test?.skip();
        }
        skip = true;
        const debugBar = await vscode_extension_tester_1.DebugToolbar.create();
        await debugBar.continue();
        await (0, utils_1.waitUntilTerminalHasText)(driver, [utils_1.TEST_MESSAGE]);
        skip = false;
    });
    it('Untoggle breakpoint on line (17)', async function () {
        if (!breakpointToggled) {
            this.test?.skip();
        }
        await driver.wait(async function () {
            return !await textEditor.toggleBreakpoint(17);
        }, 5000);
    });
});
//# sourceMappingURL=debugger.test.js.map