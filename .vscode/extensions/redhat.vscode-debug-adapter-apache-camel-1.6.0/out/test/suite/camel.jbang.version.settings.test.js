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
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const CamelJBangTaskProvider_1 = require("../../task/CamelJBangTaskProvider");
const chai_1 = require("chai");
const util_1 = require("./util");
suite('Should run commands with Camel JBang version specified in settings', () => {
    const CAMEL_JBANG_VERSION = '3.20.2';
    const CAMEL_JBANG_VERSION_SETTINGS_ID = 'camel.debugAdapter.JBangVersion';
    let defaultJBangVersion = '';
    suiteSetup(function () {
        defaultJBangVersion = vscode_1.workspace.getConfiguration().get(CAMEL_JBANG_VERSION_SETTINGS_ID);
    });
    teardown(async function () {
        await vscode_1.workspace.getConfiguration().update(CAMEL_JBANG_VERSION_SETTINGS_ID, defaultJBangVersion);
    });
    test('Default Camel JBang version is not empty', function () {
        (0, chai_1.expect)(vscode_1.workspace.getConfiguration().get(CAMEL_JBANG_VERSION_SETTINGS_ID)).to.not.be.undefined;
    });
    test('Updated Camel JBang version is correct in generated \'Run with JBang\' task', async function () {
        const config = vscode_1.workspace.getConfiguration();
        (0, chai_1.expect)(config.get(CAMEL_JBANG_VERSION_SETTINGS_ID)).to.not.be.equal(CAMEL_JBANG_VERSION);
        await config.update(CAMEL_JBANG_VERSION_SETTINGS_ID, CAMEL_JBANG_VERSION);
        const camelRunTask = await (0, util_1.getCamelTask)(CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunTask);
        (0, chai_1.expect)((0, util_1.getTaskCommandArguments)(camelRunTask)[0].value).to.includes(CAMEL_JBANG_VERSION);
    });
    test('Updated Camel JBang version is correct in generated \'Run and Debug with JBang\' task', async function () {
        const config = vscode_1.workspace.getConfiguration();
        (0, chai_1.expect)(config.get(CAMEL_JBANG_VERSION_SETTINGS_ID)).to.not.be.equal(CAMEL_JBANG_VERSION);
        await config.update(CAMEL_JBANG_VERSION_SETTINGS_ID, CAMEL_JBANG_VERSION);
        const camelRunAndDebugTask = await (0, util_1.getCamelTask)(CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunWithDebugActivatedTask);
        (0, chai_1.expect)((0, util_1.getTaskCommandArguments)(camelRunAndDebugTask)[0].value).to.includes(CAMEL_JBANG_VERSION);
    });
});
//# sourceMappingURL=camel.jbang.version.settings.test.js.map