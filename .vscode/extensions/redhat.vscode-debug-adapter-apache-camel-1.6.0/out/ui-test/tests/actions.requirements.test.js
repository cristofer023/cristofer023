"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const vscode_extension_tester_1 = require("vscode-extension-tester");
const variables_1 = require("../variables");
const chai_1 = require("chai");
const utils_1 = require("../utils");
describe('Check actions requirements to run/debug', function () {
    this.timeout(90000);
    let driver;
    let editorView;
    const NOTIFICATION_TEXT = "The action requires an opened folder/workspace to complete successfully.";
    before(async function () {
        driver = vscode_extension_tester_1.VSBrowser.instance.driver;
        if (!await noFolderOpened()) {
            await (new vscode_extension_tester_1.Workbench()).executeCommand("Workspaces: Close Workspace");
        }
        await vscode_extension_tester_1.VSBrowser.instance.openResources(path_1.default.resolve('src', 'ui-test', 'resources', variables_1.CAMEL_ROUTE_YAML_WITH_SPACE));
        editorView = new vscode_extension_tester_1.EditorView();
        await driver.wait(async function () {
            return (await editorView.getOpenEditorTitles()).find(title => title === variables_1.CAMEL_ROUTE_YAML_WITH_SPACE);
        }, 5000);
    });
    it(`No folder opened in sidebar`, async function () {
        (0, chai_1.expect)(await noFolderOpened()).to.be.true;
    });
    (process.platform === "darwin" ? describe.skip : describe)('Click on Run button and check warning message is displayed', function () {
        const runActionLabels = [
            { label: variables_1.CAMEL_RUN_ACTION_LABEL },
            { label: variables_1.CAMEL_RUN_WORKSPACE_ACTION_LABEL },
            { label: variables_1.CAMEL_RUN_FOLDER_ACTION_LABEL }
        ];
        runActionLabels.forEach(({ label }) => {
            it(`${label} button}`, async function () {
                await clickButtonAndVerifyNotification(label);
            });
        });
    });
    (process.platform === "darwin" ? describe.skip : describe)('Click on Debug and Run button and check warning message is displayed', function () {
        const debugActionLabels = [
            { label: variables_1.CAMEL_RUN_DEBUG_ACTION_LABEL },
            { label: variables_1.CAMEL_RUN_DEBUG_WORKSPACE_ACTION_LABEL },
            { label: variables_1.CAMEL_RUN_DEBUG_FOLDER_ACTION_LABEL }
        ];
        debugActionLabels.forEach(({ label }) => {
            it(`${label} button}`, async function () {
                await clickButtonAndVerifyNotification(label);
            });
        });
    });
    async function clickButtonAndVerifyNotification(actionLabel) {
        const action = (await editorView.getAction("Run or Debug..."));
        const menu = await action.open();
        await menu.select(actionLabel);
        await (0, utils_1.waitUntilNotificationShows)(driver, NOTIFICATION_TEXT);
        (0, chai_1.expect)(await (0, utils_1.notificationCenterContains)(NOTIFICATION_TEXT)).to.be.true;
        const center = await new vscode_extension_tester_1.Workbench().openNotificationsCenter();
        await center.clearAllNotifications();
    }
    async function noFolderOpened() {
        const activityBar = new vscode_extension_tester_1.ActivityBar();
        const explorerView = await activityBar.getViewControl('Explorer');
        await explorerView?.openView();
        const explorer = await new vscode_extension_tester_1.SideBarView().getContent();
        const sections = await explorer.getSections();
        return ((await sections.at(0)?.getTitle()) === "No Folder Opened");
    }
});
//# sourceMappingURL=actions.requirements.test.js.map