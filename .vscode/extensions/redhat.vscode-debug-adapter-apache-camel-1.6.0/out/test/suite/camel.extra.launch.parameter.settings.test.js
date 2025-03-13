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
const chai_1 = require("chai");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const vscode_1 = require("vscode");
const CamelJBangTaskProvider_1 = require("../../task/CamelJBangTaskProvider");
const util_1 = require("./util");
suite('Should run commands with the extra launch parameter specified in settings', () => {
    const EXTRA_LAUNCH_PARAMETER = ['--fresh'];
    const EXTRA_LAUNCH_PARAMETER_ID = 'camel.debugAdapter.ExtraLaunchParameter';
    const TMP_XSL_FILE = (0, path_1.resolve)(__dirname, '../../../test Fixture with speci@l chars', 'tmp-file.xsl');
    let defaultExtraLaunchParameter = [''];
    suiteSetup(function () {
        defaultExtraLaunchParameter = vscode_1.workspace.getConfiguration().get(EXTRA_LAUNCH_PARAMETER_ID);
    });
    teardown(async function () {
        await vscode_1.workspace.getConfiguration().update(EXTRA_LAUNCH_PARAMETER_ID, defaultExtraLaunchParameter);
    });
    suiteTeardown(function () {
        (0, fs_extra_1.rmSync)(TMP_XSL_FILE);
    });
    test('Default extra launch parameter is not empty', function () {
        (0, chai_1.expect)(vscode_1.workspace.getConfiguration().get(EXTRA_LAUNCH_PARAMETER_ID)).to.not.be.undefined;
    });
    test('Updated extra launch parameter is correct in generated \'Run with JBang\' task', async function () {
        const config = vscode_1.workspace.getConfiguration();
        (0, chai_1.expect)(config.get(EXTRA_LAUNCH_PARAMETER_ID)).to.not.be.equal(EXTRA_LAUNCH_PARAMETER);
        await config.update(EXTRA_LAUNCH_PARAMETER_ID, EXTRA_LAUNCH_PARAMETER);
        const camelRunTask = await (0, util_1.getCamelTask)(CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunTask);
        const extraLaunchParameterPosition = 6;
        (0, chai_1.expect)((0, util_1.getTaskCommandArguments)(camelRunTask)[extraLaunchParameterPosition]).to.includes(EXTRA_LAUNCH_PARAMETER[0]);
    });
    test('Updated extra launch parameter is correct in generated \'Run and Debug with JBang\' task', async function () {
        const config = vscode_1.workspace.getConfiguration();
        (0, chai_1.expect)(config.get(EXTRA_LAUNCH_PARAMETER_ID)).to.not.be.equal(EXTRA_LAUNCH_PARAMETER);
        await config.update(EXTRA_LAUNCH_PARAMETER_ID, EXTRA_LAUNCH_PARAMETER);
        const camelRunAndDebugTask = await (0, util_1.getCamelTask)(CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunWithDebugActivatedTask);
        const extraLaunchParameterPosition = 8;
        (0, chai_1.expect)((0, util_1.getTaskCommandArguments)(camelRunAndDebugTask)[extraLaunchParameterPosition]).to.includes(EXTRA_LAUNCH_PARAMETER[0]);
    });
    test(`Should skip '*.xsl' argument when there is none XSL file in workspace`, async function () {
        const camelRunTask = await (0, util_1.getCamelTask)(CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunTask);
        (0, chai_1.expect)((0, util_1.getTaskCommandArguments)(camelRunTask)).to.not.includes('*.xsl');
    });
    test(`Should add '*.xsl' argument when there is a XSL file in workspace`, async function () {
        (0, fs_extra_1.createFileSync)(TMP_XSL_FILE);
        const camelRunTask = await (0, util_1.getCamelTask)(CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunTask);
        (0, chai_1.expect)((0, util_1.getTaskCommandArguments)(camelRunTask)).to.includes('*.xsl');
    });
});
//# sourceMappingURL=camel.extra.launch.parameter.settings.test.js.map