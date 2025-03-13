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
exports.EXTRA_LAUNCH_PARAMETER_ID = exports.RH_MAVEN_REPOSITORY_GLOBAL = exports.RH_MAVEN_REPOSITORY = exports.CATALOG_VERSION_ID = exports.JBANG_VERSION_ID = exports.CAMEL_ROUTE_YAML_WITH_SPACE_COPY = exports.CAMEL_ROUTE_YAML_WITH_SPACE = exports.CAMEL_RUN_ACTION_QUICKPICKS_LABEL = exports.CAMEL_RUN_DEBUG_ACTION_QUICKPICKS_LABEL = exports.CAMEL_RUN_ACTION_LABEL = exports.CAMEL_RUN_DEBUG_ACTION_LABEL = exports.TEST_ARRAY_RUN_DEBUG = exports.TEST_ARRAY_RUN = exports.DEBUGGER_ATTACHED_MESSAGE = exports.TEST_MESSAGE = exports.TEST_BODY = exports.TEST_PROPERTY = exports.TEST_HEADER = exports.DEFAULT_MESSAGE = exports.DEFAULT_BODY = exports.DEFAULT_PROPERTY = exports.DEFAULT_HEADER = exports.DEBUG_ITEM_OPERATOR = void 0;
exports.executeCommand = executeCommand;
exports.openContextMenu = openContextMenu;
exports.selectContextMenuItem = selectContextMenuItem;
exports.waitUntilTerminalHasText = waitUntilTerminalHasText;
exports.clearTerminal = clearTerminal;
exports.killTerminal = killTerminal;
exports.killTerminalChannel = killTerminalChannel;
exports.disconnectDebugger = disconnectDebugger;
exports.activateTerminalView = activateTerminalView;
exports.replaceTextInCodeEditor = replaceTextInCodeEditor;
exports.getDebuggerSectionItem = getDebuggerSectionItem;
exports.getBreakpoint = getBreakpoint;
exports.findCodelens = findCodelens;
exports.activateEditor = activateEditor;
exports.waitUntilContentAssistContains = waitUntilContentAssistContains;
exports.getTextExt = getTextExt;
exports.closeEditor = closeEditor;
exports.getFileContent = getFileContent;
exports.selectFromCA = selectFromCA;
exports.openFileInEditor = openFileInEditor;
exports.waitUntilEditorIsOpened = waitUntilEditorIsOpened;
exports.createFile = createFile;
exports.createFolder = createFolder;
exports.deleteResource = deleteResource;
exports.executeCommandInTerminal = executeCommandInTerminal;
exports.selectTask = selectTask;
exports.resetUserSettings = resetUserSettings;
exports.readUserSetting = readUserSetting;
exports.setUserSettingsDirectly = setUserSettingsDirectly;
exports.isCamelVersionProductized = isCamelVersionProductized;
exports.extractVersionNumber = extractVersionNumber;
exports.isVersionNewer = isVersionNewer;
exports.moveDebugBar = moveDebugBar;
exports.notificationCenterContains = notificationCenterContains;
exports.waitUntilNotificationShows = waitUntilNotificationShows;
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
const vscode_extension_tester_1 = require("vscode-extension-tester");
const path = __importStar(require("path"));
const fs = __importStar(require("fs-extra"));
const variables_1 = require("./variables");
const uitest_runner_1 = require("./uitest_runner");
// the changes in debug side bar view were presented for new VS Code versions
exports.DEBUG_ITEM_OPERATOR = vscode_extension_tester_1.VSBrowser.instance.version > '1.90.9' ? ' =' : ':';
exports.DEFAULT_HEADER = 'YamlHeader';
exports.DEFAULT_PROPERTY = 'yaml-dsl';
exports.DEFAULT_BODY = 'Hello Camel from';
exports.DEFAULT_MESSAGE = `${exports.DEFAULT_HEADER}: ${exports.DEFAULT_BODY} ${exports.DEFAULT_PROPERTY}`;
exports.TEST_HEADER = 'TestHeader';
exports.TEST_PROPERTY = 'test-dsl';
exports.TEST_BODY = 'Hello World from';
exports.TEST_MESSAGE = `${exports.TEST_HEADER}: ${exports.TEST_BODY} ${exports.TEST_PROPERTY}`;
exports.DEBUGGER_ATTACHED_MESSAGE = 'debugger has been attached';
exports.TEST_ARRAY_RUN = [
    'Routes startup',
    exports.DEFAULT_MESSAGE
];
exports.TEST_ARRAY_RUN_DEBUG = exports.TEST_ARRAY_RUN.concat([
    variables_1.ENABLING_CAMEL_DEBUGGER,
    exports.DEBUGGER_ATTACHED_MESSAGE
]);
exports.CAMEL_RUN_DEBUG_ACTION_LABEL = 'Run with JBang and Debug Opened Camel Integration';
exports.CAMEL_RUN_ACTION_LABEL = 'Run with JBang Opened Camel Integration';
exports.CAMEL_RUN_DEBUG_ACTION_QUICKPICKS_LABEL = 'Camel: ' + exports.CAMEL_RUN_DEBUG_ACTION_LABEL;
exports.CAMEL_RUN_ACTION_QUICKPICKS_LABEL = 'Camel: ' + exports.CAMEL_RUN_ACTION_LABEL;
exports.CAMEL_ROUTE_YAML_WITH_SPACE = 'demo route.camel.yaml';
exports.CAMEL_ROUTE_YAML_WITH_SPACE_COPY = 'demo route copy.camel.yaml';
// Identifiers of user preferences inside settings.json.
exports.JBANG_VERSION_ID = 'camel.debugAdapter.JBangVersion';
exports.CATALOG_VERSION_ID = 'camel.debugAdapter.CamelVersion';
exports.RH_MAVEN_REPOSITORY = "camel.debugAdapter.RedHatMavenRepository";
exports.RH_MAVEN_REPOSITORY_GLOBAL = "camel.debugAdapter.redHatMavenRepository.global";
exports.EXTRA_LAUNCH_PARAMETER_ID = 'camel.debugAdapter.ExtraLaunchParameter';
/**
 * Executes a command in the command prompt of the workbench.
 * @param command The command to execute.
 * @returns A Promise that resolves when the command is executed.
 * @throws An error if the command is not found in the command palette.
 */
async function executeCommand(command) {
    const workbench = new vscode_extension_tester_1.Workbench();
    await workbench.openCommandPrompt();
    const input = await vscode_extension_tester_1.InputBox.create();
    await input.setText(`>${command}`);
    const quickpicks = await input.getQuickPicks();
    for (const quickpick of quickpicks) {
        if (await quickpick.getLabel() === `${command}`) {
            await quickpick.select();
            return;
        }
    }
    throw new Error(`Command '${command}' not found in the command palette`);
}
/**
 * Opens the context menu for a given route in the sidebar.
 * @param route The route for which the context menu should be opened.
 * @returns A promise that resolves to the opened ContextMenu.
 */
async function openContextMenu(route) {
    const item = await (await new vscode_extension_tester_1.SideBarView().getContent().getSection('resources')).findItem(route);
    const menu = await item.openContextMenu();
    return menu;
}
/**
 * Selects a specific command from a given context menu.
 * @param command The command to select from the context menu.
 * @param menu The ContextMenu instance from which to select the command.
 * @returns A promise that resolves once the command is selected.
 * @throws An error if the specified command is not found in the context menu.
 */
async function selectContextMenuItem(command, menu) {
    const button = await menu.getItem(command);
    if (button instanceof vscode_extension_tester_1.ContextMenuItem) {
        await button.select();
    }
    else {
        throw new Error(`Button ${command} not found in context menu`);
    }
}
/**
 * Checks if the terminal view has the specified texts in the given textArray.
 * @param driver The WebDriver instance to use.
 * @param textArray An array of strings representing the texts to search for in the terminal view.
 * @param interval (Optional) The interval in milliseconds to wait between checks. Default is 2000ms.
 * @param timeout (Optional) The timeout in milliseconds. Default is 60000ms.
 * @returns A Promise that resolves to a boolean indicating whether the terminal view has the texts or not.
 */
async function waitUntilTerminalHasText(driver, textArray, interval = 2000, timeout = 60000) {
    if (vscode_extension_tester_1.VSBrowser.instance.version > '1.86.2' && textArray.includes(exports.DEBUGGER_ATTACHED_MESSAGE)) {
        // for newer VS Code versions, the Debug Bar has default floating position in collision with command palette
        // which leads to problems when trying to click on quick picks
        // solution is to move a Debug Bar a bit
        await moveDebugBar();
    }
    await driver.sleep(interval);
    await driver.wait(async function () {
        try {
            const terminal = await activateTerminalView();
            const terminalText = await terminal.getText();
            for await (const text of textArray) {
                if (!(terminalText.includes(text))) {
                    return false;
                }
            }
            return true;
        }
        catch (err) {
            return false;
        }
    }, timeout, undefined, interval);
}
/**
 * Click on button to clear output in Terminal View
 */
async function clearTerminal() {
    await activateTerminalView();
    await new vscode_extension_tester_1.Workbench().executeCommand('terminal: clear');
}
/**
 * Click on button to kill running process in Terminal View
 */
async function killTerminal() {
    await (await activateTerminalView()).killTerminal();
}
/**
 * Kill specific terminal.
 *
 * @param channelName Name of channel to be killed.
 */
async function killTerminalChannel(channelName) {
    const terminalView = await activateTerminalView();
    await terminalView.selectChannel(channelName);
    await terminalView.killTerminal();
}
/**
 * Click on 'Disconnect' button in debug bar
 * @param driver The WebDriver instance to use.
 */
async function disconnectDebugger(driver, interval = 500) {
    await driver.wait(async function () {
        try {
            const debugBar = await vscode_extension_tester_1.DebugToolbar.create();
            await debugBar.disconnect();
            await driver.wait(vscode_extension_tester_1.until.elementIsNotVisible(debugBar), 10000);
            return true;
        }
        catch (err) {
            // Extra click to avoid the error: "Element is not clickable at point (x, y)"
            // Workaround for the issue: https://issues.redhat.com/browse/FUSETOOLS2-2100 
            await driver.actions().click().perform();
            return false;
        }
    }, 10000, undefined, interval);
}
/**
 * Ensures Terminal View is opened and focused
 * @returns A Promise that resolves to TerminalView instance.
 */
async function activateTerminalView() {
    // workaround ExTester issue - https://github.com/redhat-developer/vscode-extension-tester/issues/785
    await new vscode_extension_tester_1.Workbench().executeCommand('Terminal: Focus on Terminal View');
    return await new vscode_extension_tester_1.BottomBarPanel().openTerminalView();
}
/**
 * Replaces the specified text with the given replacement in the editor.
 * @param text The text to be replaced.
 * @param replacement The replacement text.
 * @returns A boolean indicating whether the text replacement was successful.
 */
async function replaceTextInCodeEditor(text, replacement) {
    const editor = new vscode_extension_tester_1.TextEditor();
    try {
        await editor.selectText(text);
        await editor.typeText(replacement);
        await editor.save();
        return true;
    }
    catch (err) {
        return false;
    }
}
/**
 * Retrieves a specific item from the debugger's variable section.
 * @param driver The WebDriver instance to use for interaction.
 * @param item The name or identifier of the item to retrieve.
 * @param section The name of the section containing the item.
 * @param subsection (Optional) The name of the subsection within the section containing the item.
 * @returns A Promise that resolves to the retrieved VariableSectionItem or undefined if not found.
 */
async function getDebuggerSectionItem(driver, item, section, subsection) {
    const debugView = (await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Run'))?.openView());
    return await driver.wait(async function () {
        try {
            const variablesSection = await debugView.getVariablesSection();
            if (subsection) {
                await variablesSection?.openItem(section, subsection);
            }
            else {
                await variablesSection?.openItem(section);
            }
            return await variablesSection.findItem(item);
        }
        catch (e) {
            // Extra click to avoid the error: "Element is not clickable at point (x, y)"
            // Issue is similar to https://issues.redhat.com/browse/FUSETOOLS2-2100
            if (e instanceof Error && e.name === 'ElementClickInterceptedError') {
                await driver.actions().click().perform();
            }
            else if (e instanceof Error && e.message === 'Internal error.') {
                throw e;
            }
        }
    }, 120000, undefined, 500);
}
/**
 * Retrieves the BreakpointSectionItem in the debugger section.
 * @param driver The WebDriver instance to use for interaction.
 * @param line The line number of the breakpoint to modify.
 * @returns A Promise that resolves to the retrieved BreakpointSectionItem or undefined if not found.
 */
async function getBreakpoint(driver, line) {
    const debugView = (await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Run'))?.openView());
    return await driver.wait(async function () {
        try {
            const breakpointSection = await debugView.getBreakpointSection();
            return await breakpointSection.findItem(async (item) => await item.getBreakpointLine() === line);
        }
        catch (e) {
            return undefined;
        }
    }, 5000, undefined, 500);
}
/**
 * Finds a specific CodeLens with the given title.
 * @param title The title of the CodeLens to find.
 * @returns A Promise that resolves to the found CodeLens.
 */
async function findCodelens(driver, title) {
    return await driver.wait(async () => {
        const editor = new vscode_extension_tester_1.TextEditor();
        return await editor.getCodeLens(title);
    }, 10_000, `could not find codelens: ${title}`, 750);
}
/**
* Switch to an editor tab with the given title.
*
* @param title Title of editor to activate
*/
async function activateEditor(driver, title) {
    // workaround for https://issues.redhat.com/browse/FUSETOOLS2-2099
    let editor = null;
    await driver.wait(async function () {
        try {
            editor = await new vscode_extension_tester_1.EditorView().openEditor(title);
            return true;
        }
        catch (err) {
            await driver.actions().click().perform();
            return false;
        }
    }, 10000, undefined, 500);
    return editor;
}
/**
 * Wait until content assist contains specific item.
 *
 * @param expectedContentAssistItem Expected item.
 * @param timeout Timeout for waiting.
 * @returns Item from Content Assist.
 */
async function waitUntilContentAssistContains(expectedContentAssistItem, timeout = 10000) {
    const editor = new vscode_extension_tester_1.TextEditor();
    let contentAssist = null;
    await editor.getDriver().wait(async function () {
        contentAssist = await editor.toggleContentAssist(true);
        const hasItem = await contentAssist.hasItem(expectedContentAssistItem);
        if (!hasItem) {
            await editor.toggleContentAssist(false);
        }
        return hasItem;
    }, timeout);
    return contentAssist;
}
/**
 * Workaround for issue with ContentAssistItem getText() method.
 * For more details please see https://issues.redhat.com/browse/FUSETOOLS2-284
 *
 * @param item ContenAssistItem
 */
async function getTextExt(item) {
    const name = await item.getText();
    return name.split('\n')[0];
}
/**
 * Close editor with handling of Save/Don't Save Modal dialog.
 *
 * @param title Title of opened active editor.
 * @param save true/false
 */
async function closeEditor(title, save) {
    const dirty = await new vscode_extension_tester_1.TextEditor().isDirty();
    await new vscode_extension_tester_1.EditorView().closeEditor(title);
    if (dirty) {
        const dialog = new vscode_extension_tester_1.ModalDialog();
        if (save) {
            await dialog.pushButton('Save');
        }
        else {
            await dialog.pushButton('Don\'t Save');
        }
    }
}
/**
 * Get content of specific file.
 *
 * @param filename Name of file.
 * @param folder Folder with file.
 * @returns File content as string.
 */
function getFileContent(filename, folder) {
    return fs.readFileSync(path.resolve(folder, filename), { encoding: 'utf8', flag: 'r' });
}
/**
* Select specific item from Content Assist proposals.
*
* @param expectedItem Expected item in Content Assist.
*/
async function selectFromCA(expectedItem, timeout = 15000) {
    let contentAssist = null;
    contentAssist = await waitUntilContentAssistContains(expectedItem, timeout);
    if (contentAssist !== null) {
        const item = await contentAssist.getItem(expectedItem);
        await item?.click();
    }
}
/** Opens file in editor.
 *
 * @param driver WebDriver.
 * @param folder Folder with file.
 * @param file Filename.
 * @returns Instance of Text Editor.
 */
async function openFileInEditor(driver, folder, file) {
    await vscode_extension_tester_1.VSBrowser.instance.openResources(path.join(folder, file));
    await waitUntilEditorIsOpened(driver, file);
    return (await activateEditor(driver, file));
}
/**
 * Wait until editor is opened.
 *
 * @param driver WebDriver.
 * @param title Title of editor - filename.
 * @param timeout Timeout for dynamic wait.
 */
async function waitUntilEditorIsOpened(driver, title, timeout = 10000) {
    await driver.wait(async function () {
        return (await new vscode_extension_tester_1.EditorView().getOpenEditorTitles()).find(t => t === title);
    }, timeout);
}
/**
 * Creates empty file using fs.
 *
 * @param filename Name of file.
 * @param folder Folder with location of newly created file.
 */
async function createFile(filename, folder) {
    try {
        await fs.createFile(path.join(folder, filename));
    }
    catch (err) {
        console.error(err);
    }
}
/**
 * Creates empty folder using fs.
 *
 * @param folder Path to newly created folder.
 */
async function createFolder(folder) {
    try {
        await fs.mkdir(folder);
    }
    catch (err) {
        console.error(err);
    }
}
/**
 * Removes resource using fs.
 *
 * @param path Path of resource to remove.
 */
async function deleteResource(path) {
    try {
        await fs.remove(path);
    }
    catch (err) {
        console.error(err);
    }
}
/**
 * Executes a command in current terminal.
 *
 * @param command The command to execute.
 */
async function executeCommandInTerminal(command) {
    const terminal = await activateTerminalView();
    await terminal.executeCommand(command);
}
/**
 * Select specific task from list of available tasks.
 *
 * @param driver WebDriver.
 * @param task Task name to select.
 */
async function selectTask(driver, task) {
    let input;
    await driver.wait(async function () {
        input = await vscode_extension_tester_1.InputBox.create();
        return (await input.isDisplayed());
    }, 30000);
    const quickpicks = await input?.getQuickPicks();
    if (quickpicks !== undefined) {
        for (const quickpick of quickpicks) {
            if (await quickpick.getLabel() === task) {
                await quickpick.select();
            }
        }
    }
}
/**
 * Reset user setting to default value by deleting item in settings.json.
 *
 * @param id ID of setting to reset.
 */
function resetUserSettings(id) {
    const settingsPath = path.resolve(uitest_runner_1.storageFolder, 'settings', 'User', 'settings.json');
    const reset = fs.readFileSync(settingsPath, 'utf-8').replace(new RegExp(`"${id}.*`), '').replace(/,(?=[^,]*$)/, '');
    fs.writeFileSync(settingsPath, reset, 'utf-8');
}
/**
 * Read user settings value directly from settings.json
 *
 * @param id ID of setting to read.
 */
function readUserSetting(id) {
    const settingsPath = path.resolve(uitest_runner_1.storageFolder, 'settings', 'User', 'settings.json');
    const settingsContent = fs.readFileSync(settingsPath, 'utf-8');
    const regex = new RegExp(`"${id}":\\s*"(.*?)"`, 'i');
    const match = settingsContent.match(regex);
    if (match === null) {
        return null;
    }
    else {
        return match[1];
    }
}
/**
 * Set user setting directly inside settings.json
 *
 * @param id ID of setting.
 * @param value Value of setting.
 */
function setUserSettingsDirectly(id, value) {
    const settingsPath = path.resolve(uitest_runner_1.storageFolder, 'settings', 'User', 'settings.json');
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
    settings[id] = value;
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 4), 'utf-8');
}
/**
 * Checks if given Camel version is productized.
 *
 * @param input Camel version as string.
 * @returns true/false
 */
function isCamelVersionProductized(input) {
    if (input !== undefined) {
        const pattern = /\.redhat-\d+$/;
        return pattern.test(input);
    }
    else {
        return false;
    }
}
/**
 * Extract Camel version number. Productized or non-productized version can be provided as input.
 *
 * @param input Camel version in format "x.x.x.redhat-xxx" or "x.x.x".
 * @returns Camel version in format "x.x.x".
 */
function extractVersionNumber(input) {
    if (isCamelVersionProductized(input)) {
        const regex = /^(.*?)\.[^.]*$/;
        const match = regex.exec(input);
        return match ? match[1] : '';
    }
    else {
        return input;
    }
}
/**
 * Compare two versions in format "^\d+(\.\d+)*$".
 * @param base Base version.
 * @param target Version to be compared with base version.
 * @returns true if target is newer or same as base, false otherwise
 */
function isVersionNewer(base, target) {
    const partsBase = base.split('.').map(Number);
    const partsTarget = target.split('.').map(Number);
    const maxLength = Math.max(partsBase.length, partsTarget.length);
    for (let i = 0; i < maxLength; i++) {
        const basePart = i < partsBase.length ? partsBase[i] : 0;
        const comparatorPart = i < partsTarget.length ? partsTarget[i] : 0;
        if (basePart < comparatorPart) {
            return true;
        }
        if (basePart > comparatorPart) {
            return false;
        }
    }
    return true;
}
/**
 * Move Debug bar to avoid collision with opened command palette
 * @param time delay to wait till debug bar is displayed
 */
async function moveDebugBar(time = 60_000) {
    const debugBar = await vscode_extension_tester_1.DebugToolbar.create(time);
    const dragArea = await debugBar.findElement(vscode_extension_tester_1.By.className('drag-area'));
    await dragArea.getDriver().actions().dragAndDrop(dragArea, { x: 150, y: 0 }).perform();
}
/**
 * Checks if Notification Center contains notification with required text.
 *
 * @param notificationText Text of notification.
 * @returns true if notification is present, false otherwise
 */
async function notificationCenterContains(notificationText) {
    const notifications = await new vscode_extension_tester_1.Workbench().getNotifications();
    for (const notification of notifications) {
        const message = await notification.getMessage();
        if (message === notificationText) {
            return true;
        }
    }
    return false;
}
/**
 * Wait until notification with required text is present in Notification Center.
 * @param driver The WebDriver instance to use.
 * @param notificationText Text of notification.
 * @param interval (Optional) The interval in milliseconds to wait between checks. Default is 1000ms.
 * @param timeout (Optional) The timeout in milliseconds. Default is 10000ms.
 */
async function waitUntilNotificationShows(driver, notificationText, interval = 1000, timeout = 10000) {
    await driver.sleep(interval);
    await driver.wait(async function () {
        try {
            return (await notificationCenterContains(notificationText));
        }
        catch (err) {
            return false;
        }
    }, timeout, "Required notification not available", interval);
}
//# sourceMappingURL=utils.js.map