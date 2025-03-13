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
const variables = __importStar(require("../variables"));
const vscode_extension_tester_1 = require("vscode-extension-tester");
const utils_1 = require("../utils");
describe('JBang commands execution through command codelens', function () {
    this.timeout(800000);
    let driver;
    (0, vscode_extension_tester_1.before)(async function () {
        driver = vscode_extension_tester_1.VSBrowser.instance.driver;
    });
    (0, vscode_extension_tester_1.after)(async function () {
        await new vscode_extension_tester_1.EditorView().closeAllEditors();
    });
    beforeEach(async function () {
        await vscode_extension_tester_1.VSBrowser.instance.openResources(path.resolve('src', 'ui-test', 'resources'));
        await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Explorer'))?.openView();
        const section = await new vscode_extension_tester_1.SideBarView().getContent().getSection('resources');
        await section.openItem(variables.CAMEL_ROUTE_YAML_WITH_SPACE);
        const editorView = new vscode_extension_tester_1.EditorView();
        await driver.wait(async function () {
            return (await editorView.getOpenEditorTitles()).find(title => title === variables.CAMEL_ROUTE_YAML_WITH_SPACE);
        }, 10000, `The test file ${variables.CAMEL_ROUTE_YAML_WITH_SPACE} was not opened`);
    });
    afterEach(async function () {
        await (0, utils_1.killTerminal)();
    });
    it(`Execute command 'apache.camel.run.jbang' with codelens '${variables.CAMEL_RUN_CODELENS}'`, async function () {
        try {
            const codelens = await (0, utils_1.findCodelens)(driver, variables.CAMEL_RUN_CODELENS);
            await codelens.click();
        }
        catch {
            // Workaround: try another time as it seems that sometimes the codelens is recomputed and there is a stale reference error
            const codelens = await (0, utils_1.findCodelens)(driver, variables.CAMEL_RUN_CODELENS);
            await codelens.click();
        }
        await (0, utils_1.waitUntilTerminalHasText)(driver, variables.TEST_ARRAY_RUN, 4000, 350000);
    });
    it(`Execute command 'apache.camel.debug.jbang' with codelens '${variables.CAMEL_DEBUG_CODELENS}'`, async function () {
        if ((0, utils_1.isCamelVersionProductized)(process.env.CAMEL_VERSION)) {
            this.skip();
        }
        const codelens = await (0, utils_1.findCodelens)(driver, variables.CAMEL_DEBUG_CODELENS);
        await codelens.click();
        await (0, utils_1.waitUntilTerminalHasText)(driver, variables.TEST_ARRAY_RUN_DEBUG, 4000, 350000);
        await (0, utils_1.disconnectDebugger)(driver);
        await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Run and Debug'))?.closeView();
    });
});
//# sourceMappingURL=codelens.test.js.map