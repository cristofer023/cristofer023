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
const node_path_1 = require("node:path");
const variables_1 = require("../variables");
const vscode_extension_tester_1 = require("vscode-extension-tester");
const utils_1 = require("../utils");
const child_process_1 = require("child_process");
describe('Camel standalone file deployment using Camel JBang Kubernetes Run', function () {
    this.timeout(180_000);
    let editorView;
    let jbangVersion;
    const RESOURCES_PATH = (0, node_path_1.resolve)('src', 'ui-test', 'resources');
    (0, vscode_extension_tester_1.before)(async function () {
        jbangVersion = await getJBangVersion();
        await vscode_extension_tester_1.VSBrowser.instance.openResources(RESOURCES_PATH);
        await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Explorer'))?.openView();
        const section = await new vscode_extension_tester_1.SideBarView().getContent().getSection('resources');
        await section.openItem(variables_1.CAMEL_ROUTE_YAML_WITH_SPACE);
        editorView = new vscode_extension_tester_1.EditorView();
        await editorView.getDriver().wait(async function () {
            return (await editorView.getOpenEditorTitles()).find(title => title === variables_1.CAMEL_ROUTE_YAML_WITH_SPACE);
        }, 10_000, `The test file ${variables_1.CAMEL_ROUTE_YAML_WITH_SPACE} was not opened`);
    });
    (0, vscode_extension_tester_1.after)(async function () {
        await (0, utils_1.killTerminal)();
        await editorView.closeAllEditors();
        // remove deployed integration from a local cluster
        (0, child_process_1.execSync)(`jbang -Dcamel.jbang.version=${jbangVersion} camel@apache/camel kubernetes delete --name=demoroute`, { stdio: 'inherit', cwd: RESOURCES_PATH });
    });
    it('Deploy integration to Kubernetes (Minikube)', async function () {
        const action = (await editorView.getAction('Deploy Integration with Apache Camel Kubernetes Run'));
        await action.click();
        // using some additional steps for CAMEL 4.9.0-SNAPSHOT / 4.8.1 version
        // because the '--dev' parameter is not working for a deployment to Kubernetes
        await (0, utils_1.waitUntilTerminalHasText)(action.getDriver(), ['BUILD SUCCESS'], 3_000, 120_000);
        await (0, utils_1.killTerminal)();
        const terminalView = await new vscode_extension_tester_1.BottomBarPanel().openTerminalView();
        await terminalView.getDriver().wait(async () => {
            const found = (await terminalView.getText()).match(/[A-Za-z]/g);
            return found;
        }, 10_000, 'New terminal shell was not opened properly.', 2_000);
        // skip 'await' for async function to allow continue test after terminal command execution which would be blocking thread for infinity
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        terminalView.executeCommand(`jbang -Dcamel.jbang.version=${jbangVersion} camel@apache/camel kubernetes logs --name=demoroute`);
        await (0, utils_1.waitUntilTerminalHasText)(action.getDriver(), ['Hello Camel from'], 3_000, 120_000);
    });
    async function getJBangVersion() {
        const textField = await (await new vscode_extension_tester_1.Workbench().openSettings()).findSetting('JBang Version', 'Camel', 'Debug Adapter');
        const value = await textField.getValue();
        await new vscode_extension_tester_1.EditorView().closeEditor('Settings');
        return value;
    }
});
//# sourceMappingURL=deploy.kubernetes.run.test.js.map