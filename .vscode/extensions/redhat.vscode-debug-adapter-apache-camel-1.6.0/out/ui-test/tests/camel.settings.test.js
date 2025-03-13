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
const fs = __importStar(require("node:fs"));
const path = __importStar(require("path"));
const vscode_extension_tester_1 = require("vscode-extension-tester");
const uitest_runner_1 = require("../uitest_runner");
const utils_1 = require("../utils");
describe('Camel User Settings', function () {
    this.timeout(240000);
    let driver;
    let defaultJBangVersion;
    let defaultMavenRepository;
    let defaultExtraLaunchParameterSetting;
    const RESOURCES = path.resolve('src', 'ui-test', 'resources');
    (0, vscode_extension_tester_1.before)(async function () {
        // Tested in main pipeline.
        if (process.env.CAMEL_VERSION) {
            this.skip();
        }
        driver = vscode_extension_tester_1.VSBrowser.instance.driver;
        await vscode_extension_tester_1.VSBrowser.instance.openResources(path.join(RESOURCES));
        defaultJBangVersion = await getSettingsValue('JBang Version');
        defaultMavenRepository = await getSettingsValue('Red Hat Maven Repository');
        defaultExtraLaunchParameterSetting = await getArraySettingsValueAtRow(0, 'Extra Launch Parameter', ['Camel', 'Debug Adapter']);
    });
    describe('Update Camel Version', function () {
        const customCamelVersion = '3.20.1';
        (0, vscode_extension_tester_1.beforeEach)(async function () {
            await prepareEnvironment();
        });
        (0, vscode_extension_tester_1.afterEach)(async function () {
            await cleanEnvironment();
            resetUserSettings(utils_1.CATALOG_VERSION_ID);
        });
        it(`Should use '${customCamelVersion}' user defined Camel version`, async function () {
            await setCamelVersion(customCamelVersion);
            await (0, utils_1.executeCommand)(utils_1.CAMEL_RUN_ACTION_QUICKPICKS_LABEL);
            await (0, utils_1.waitUntilTerminalHasText)(driver, [`--camel-version=${customCamelVersion}`, ...utils_1.TEST_ARRAY_RUN.concat([`Apache Camel ${customCamelVersion}`])], 15000, 180000);
        });
    });
    describe('Update JBang Version', function () {
        const customJBangVersion = '3.20.5';
        (0, vscode_extension_tester_1.beforeEach)(async function () {
            await prepareEnvironment();
        });
        (0, vscode_extension_tester_1.afterEach)(async function () {
            await cleanEnvironment();
            resetUserSettings(utils_1.JBANG_VERSION_ID);
        });
        it(`Should use default JBang version`, async function () {
            await (0, utils_1.executeCommand)(utils_1.CAMEL_RUN_ACTION_QUICKPICKS_LABEL);
            await (0, utils_1.waitUntilTerminalHasText)(driver, [`-Dcamel.jbang.version=${defaultJBangVersion}`, ...utils_1.TEST_ARRAY_RUN.concat([`Apache Camel ${defaultJBangVersion}`])], 6000, 120000);
        });
        it(`Should use user defined JBang version '${customJBangVersion}'`, async function () {
            await setJBangVersion(customJBangVersion);
            await (0, utils_1.executeCommand)(utils_1.CAMEL_RUN_ACTION_QUICKPICKS_LABEL);
            await (0, utils_1.waitUntilTerminalHasText)(driver, [`-Dcamel.jbang.version=${customJBangVersion}`, ...utils_1.TEST_ARRAY_RUN.concat([`Apache Camel ${customJBangVersion}`])], 6000, 120000);
        });
    });
    describe('Update Maven Repository', function () {
        const productizedCamelVersion = '3.20.1.redhat-00026';
        (0, vscode_extension_tester_1.beforeEach)(async function () {
            await prepareEnvironment();
        });
        (0, vscode_extension_tester_1.afterEach)(async function () {
            await cleanEnvironment();
            resetUserSettings(utils_1.CATALOG_VERSION_ID);
            resetUserSettings(utils_1.RH_MAVEN_REPOSITORY_GLOBAL);
        });
        it(`Should use '${productizedCamelVersion}' user defined Camel Version and Red Hat Maven Repository`, async function () {
            await setCamelVersion(productizedCamelVersion);
            await (0, utils_1.executeCommand)(utils_1.CAMEL_RUN_ACTION_QUICKPICKS_LABEL);
            await (0, utils_1.waitUntilTerminalHasText)(driver, [`--camel-version=${productizedCamelVersion} --repos=#repos,${defaultMavenRepository}`, ...utils_1.TEST_ARRAY_RUN], 6000, 120000);
        });
        it(`Should not use '#repos' placeholder for global Camel JBang repository config`, async function () {
            await setCamelVersion(productizedCamelVersion);
            await setSettingsValue(false, 'Global', ['Camel', 'Debug Adapter', 'Red Hat Maven Repository']);
            await (0, utils_1.executeCommand)(utils_1.CAMEL_RUN_ACTION_QUICKPICKS_LABEL);
            await (0, utils_1.waitUntilTerminalHasText)(driver, [`--camel-version=${productizedCamelVersion} --repos=${defaultMavenRepository}`, ...utils_1.TEST_ARRAY_RUN], 6000, 120000);
        });
    });
    describe('Update Extra Launch Parameter setting', function () {
        const newParameter = '--trace';
        it('Should add another parameter', async function () {
            this.timeout(20000);
            const arraySetting = await (await new vscode_extension_tester_1.Workbench().openSettings()).findSettingByID("camel.debugAdapter.ExtraLaunchParameter");
            const add1 = await arraySetting.add();
            await add1.setValue(newParameter);
            await add1.ok();
            await waitUntilItemExists(newParameter, arraySetting);
            const newValue = await arraySetting.getItem(newParameter);
            (0, chai_1.expect)(await newValue?.getValue()).is.equal(newParameter);
            const items = await arraySetting.getItems();
            (0, chai_1.expect)(items).is.not.empty;
            (0, chai_1.expect)(items.length).is.equal(3);
        });
        it('Should influence result of "run with JBang" task', async function () {
            await prepareEnvironment();
            await (0, utils_1.executeCommand)(utils_1.CAMEL_RUN_ACTION_QUICKPICKS_LABEL);
            await (0, utils_1.waitUntilTerminalHasText)(driver, [defaultExtraLaunchParameterSetting, newParameter, `Tracing is enabled on CamelContext`], 15000, 180000);
        });
        it('Should remove parameter', async function () {
            this.timeout(15000);
            const arraySetting = await (await new vscode_extension_tester_1.Workbench().openSettings()).findSettingByID("camel.debugAdapter.ExtraLaunchParameter");
            const toRemove = await arraySetting.getItem(newParameter);
            await toRemove?.remove();
            await waitUntilItemNotExists(newParameter, arraySetting);
            const values = await arraySetting.getValues();
            (0, chai_1.expect)(values.length).is.lessThan(3);
            (0, chai_1.expect)(values).not.includes(newParameter);
            await cleanEnvironment();
        });
    });
    async function prepareEnvironment() {
        await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Explorer'))?.openView();
        const section = await new vscode_extension_tester_1.SideBarView().getContent().getSection('resources');
        await section.openItem(utils_1.CAMEL_ROUTE_YAML_WITH_SPACE);
        await driver.wait(async function () {
            return (await new vscode_extension_tester_1.EditorView().getOpenEditorTitles()).find(title => title === utils_1.CAMEL_ROUTE_YAML_WITH_SPACE);
        }, 5000);
    }
    async function cleanEnvironment() {
        await (0, utils_1.killTerminal)();
        await new vscode_extension_tester_1.EditorView().closeAllEditors();
        await new vscode_extension_tester_1.BottomBarPanel().toggle(false);
    }
    async function setCamelVersion(version) {
        await setSettingsValue(version, 'Camel Version');
    }
    async function setJBangVersion(version) {
        await setSettingsValue(version, 'JBang Version');
    }
    async function setSettingsValue(value, title, path = ['Camel', 'Debug Adapter']) {
        const textField = await (await new vscode_extension_tester_1.Workbench().openSettings()).findSetting(title, ...path);
        await textField.setValue(value);
        await driver.sleep(500);
        await new vscode_extension_tester_1.EditorView().closeEditor('Settings');
    }
    async function getSettingsValue(title, path = ['Camel', 'Debug Adapter']) {
        const textField = await (await new vscode_extension_tester_1.Workbench().openSettings()).findSetting(title, ...path);
        const value = await textField.getValue();
        await new vscode_extension_tester_1.EditorView().closeEditor('Settings');
        return value;
    }
    async function getArraySettingsValueAtRow(row, title, path = ['Camel', 'Debug Adapter']) {
        const arraySetting = await (await new vscode_extension_tester_1.Workbench().openSettings()).findSetting(title, ...path);
        const arrayItem = await arraySetting.getItem(row);
        const itemValue = await arrayItem.getValue();
        await new vscode_extension_tester_1.EditorView().closeEditor('Settings');
        return itemValue;
    }
    function resetUserSettings(id) {
        const settingsPath = path.resolve(uitest_runner_1.storageFolder, 'settings', 'User', 'settings.json');
        const reset = fs.readFileSync(settingsPath, 'utf-8').replace(new RegExp(`"${id}.*`), '');
        fs.writeFileSync(settingsPath, reset, 'utf-8');
    }
    async function waitUntilItemExists(item, setting, timeout = 10_000) {
        let values = [];
        await setting.getDriver().wait(async function () {
            values = await setting.getValues();
            return values.includes(item);
        }, timeout, `Expected item - '${item}' was not found in list of: ${values}`);
    }
    async function waitUntilItemNotExists(item, setting, timeout = 10_000) {
        let values = [];
        await setting.getDriver().wait(async function () {
            values = await setting.getValues();
            return !values.includes(item);
        }, timeout, `Expected item - '${item}' was found in list of: ${values}`);
    }
});
//# sourceMappingURL=camel.settings.test.js.map