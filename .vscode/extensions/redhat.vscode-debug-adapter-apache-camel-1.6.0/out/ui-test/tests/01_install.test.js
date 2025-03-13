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
const fs = __importStar(require("fs"));
const vscode_extension_tester_1 = require("vscode-extension-tester");
describe('Install test, Extensions View', function () {
    this.timeout(60000);
    this.slow(10000);
    const extensionMetadata = JSON.parse(fs.readFileSync('package.json', {
        encoding: 'utf-8'
    }));
    let item;
    let driver;
    (0, vscode_extension_tester_1.after)(async () => {
        this.timeout(5000);
        const view = await new vscode_extension_tester_1.ActivityBar().getViewControl("Extensions");
        await view.closeView();
        await new vscode_extension_tester_1.EditorView().closeAllEditors();
    });
    before(async () => {
        driver = vscode_extension_tester_1.VSBrowser.instance.driver;
        item = await openExtensionPage(extensionMetadata['displayName'], this.timeout());
    });
    it('Extension is installed', async function () {
        const testState = await driver.wait(async () => {
            try {
                return await item.isInstalled();
            }
            catch (e) {
                if (e instanceof vscode_extension_tester_1.error.StaleElementReferenceError) {
                    item = await openExtensionPage(extensionMetadata['displayName'], this.timeout());
                    return undefined;
                }
                throw e;
            }
        }, this.timeout(), 'Page was not rendered well');
        (0, chai_1.expect)(testState).to.be.true;
    });
    it('Has correct author', async function () {
        const testAuthor = await driver.wait(async () => {
            try {
                return await item.getAuthor();
            }
            catch (e) {
                if (e instanceof vscode_extension_tester_1.error.StaleElementReferenceError) {
                    item = await openExtensionPage(extensionMetadata['displayName'], this.timeout());
                    return undefined;
                }
                throw e;
            }
        }, this.timeout(), 'Page was not rendered well');
        (0, chai_1.expect)(testAuthor).to.be.equal('Red Hat');
    });
    it('Has correct title', async function () {
        const testTitle = await driver.wait(async () => {
            try {
                return await item.getTitle();
            }
            catch (e) {
                if (e instanceof vscode_extension_tester_1.error.StaleElementReferenceError) {
                    item = await openExtensionPage(extensionMetadata['displayName'], this.timeout());
                    return undefined;
                }
                throw e;
            }
        }, this.timeout(), 'Page was not rendered well');
        (0, chai_1.expect)(testTitle).to.be.equal(extensionMetadata['displayName']);
    });
    it('Has correct description', async function () {
        const testDescription = await driver.wait(async () => {
            try {
                return await item.getDescription();
            }
            catch (e) {
                if (e instanceof vscode_extension_tester_1.error.StaleElementReferenceError) {
                    item = await openExtensionPage(extensionMetadata['displayName'], this.timeout());
                    return undefined;
                }
                throw e;
            }
        }, this.timeout(), 'Page was not rendered well');
        (0, chai_1.expect)(testDescription).to.be.equal(extensionMetadata['description']);
    });
    it('Has correct version', async function () {
        const testVersion = await driver.wait(async () => {
            try {
                return await item.getVersion();
            }
            catch (e) {
                if (e instanceof vscode_extension_tester_1.error.StaleElementReferenceError) {
                    item = await openExtensionPage(extensionMetadata['displayName'], this.timeout());
                    return undefined;
                }
                throw e;
            }
        }, this.timeout(), 'Page was not rendered well');
        (0, chai_1.expect)(testVersion).to.be.equal(extensionMetadata['version']);
    });
    /**
     * Open the extension page.
     * @param name Display name of the extension.
     * @param timeout Timeout in ms.
     * @returns A tuple -- marketplace and ExtensionViewItem object tied with the extension.
     */
    async function openExtensionPage(name, timeout) {
        let item;
        await driver.wait(async () => {
            try {
                const extensionsView = await (await new vscode_extension_tester_1.ActivityBar().getViewControl('Extensions'))?.openView();
                const marketplace = (await extensionsView?.getContent().getSection('Installed'));
                item = await marketplace.findItem(`@installed ${name}`);
                return true;
            }
            catch (e) {
                if (e instanceof vscode_extension_tester_1.error.StaleElementReferenceError) {
                    return {
                        delay: 1000,
                        value: undefined
                    };
                }
            }
        }, timeout, 'Page was not rendered');
        return item;
    }
});
//# sourceMappingURL=01_install.test.js.map