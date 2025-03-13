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
suite('Should run commands with Maven Repository specified in settings', () => {
    const RH_CAMEL_VERSION = '3.20.1.redhat-00026';
    const CAMEL_VERSION_SETTINGS_ID = 'camel.debugAdapter.CamelVersion';
    const REPOSITORY_SETTINGS_ID = 'camel.debugAdapter.RedHatMavenRepository';
    const GLOBAL_CAMEL_MAVEN_CONFIG_ID = 'camel.debugAdapter.redHatMavenRepository.global';
    let initialCamelVersion = '';
    let defaultMavenRepository = '';
    suiteSetup(async function () {
        initialCamelVersion = vscode_1.workspace.getConfiguration().get(CAMEL_VERSION_SETTINGS_ID);
        defaultMavenRepository = vscode_1.workspace.getConfiguration().get(REPOSITORY_SETTINGS_ID);
    });
    teardown(async function () {
        this.timeout(4000);
        await vscode_1.workspace.getConfiguration().update(CAMEL_VERSION_SETTINGS_ID, initialCamelVersion);
    });
    test('Default upstream Camel Version in commands is not using Red Hat Maven Repository', async function () {
        const camelRunTask = await (0, util_1.getCamelTask)(CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunTask);
        (0, chai_1.expect)((0, util_1.getTaskCommandArguments)(camelRunTask)).to.not.includes(`--repos`);
        const camelRunAndDebugTask = await (0, util_1.getCamelTask)(CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunWithDebugActivatedTask);
        (0, chai_1.expect)((0, util_1.getTaskCommandArguments)(camelRunAndDebugTask)).to.not.includes(`--repos`);
    });
    test('Productized Camel version is using RH Maven Repository in generated \'Run with JBang\' task', async function () {
        await vscode_1.workspace.getConfiguration().update(CAMEL_VERSION_SETTINGS_ID, RH_CAMEL_VERSION);
        const camelRunTask = await (0, util_1.getCamelTask)(CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunTask);
        (0, chai_1.expect)((0, util_1.getTaskCommandArguments)(camelRunTask)).to.includes(`--repos=#repos,${defaultMavenRepository}`);
    });
    test('Productized Camel version is using RH Maven Repository in generated \'Run and Debug with JBang\' task', async function () {
        await vscode_1.workspace.getConfiguration().update(CAMEL_VERSION_SETTINGS_ID, RH_CAMEL_VERSION);
        const camelRunAndDebugTask = await (0, util_1.getCamelTask)(CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunWithDebugActivatedTask);
        (0, chai_1.expect)((0, util_1.getTaskCommandArguments)(camelRunAndDebugTask)).to.includes(`--repos=#repos,${defaultMavenRepository}`);
    });
    test('Placeholder \'#repos\' is not used when Global Maven Repository is not set', async function () {
        await vscode_1.workspace.getConfiguration().update(CAMEL_VERSION_SETTINGS_ID, RH_CAMEL_VERSION);
        await vscode_1.workspace.getConfiguration().update(GLOBAL_CAMEL_MAVEN_CONFIG_ID, false);
        const camelRunAndDebugTask = await (0, util_1.getCamelTask)(CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunWithDebugActivatedTask);
        (0, chai_1.expect)((0, util_1.getTaskCommandArguments)(camelRunAndDebugTask)).to.not.includes(`--repos=#repos`);
    });
});
//# sourceMappingURL=maven.repository.settings.test.js.map