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
exports.checkExpectedCompletion = checkExpectedCompletion;
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
const async_wait_until_1 = require("async-wait-until");
const vscode = __importStar(require("vscode"));
const util_1 = require("./util");
suite('Should do completion in tasks.json', () => {
    test('Completion for Start application with camel.debug profile', async () => {
        const docURiTasksJson = (0, util_1.getDocUri)('.vscode/tasks.json');
        const expectedCompletion = { label: 'Start Camel application with Maven with camel.debug profile' };
        await testCompletion(docURiTasksJson, new vscode.Position(3, 7), expectedCompletion);
    }).timeout(20000);
    test('Completion for Start application with jbang', async () => {
        const docURiTasksJson = (0, util_1.getDocUri)('.vscode/tasks.json');
        const expectedCompletion = { label: 'Run Camel application with JBang with camel-debug' };
        await testCompletion(docURiTasksJson, new vscode.Position(3, 7), expectedCompletion);
    }).timeout(20000);
    test('Completion for Build a native Camel Quarkus application', async () => {
        const docURiTasksJson = (0, util_1.getDocUri)('.vscode/tasks.json');
        const expectedCompletion = { label: 'Build a Camel Quarkus application as a Native executable debug-ready' };
        await testCompletion(docURiTasksJson, new vscode.Position(3, 7), expectedCompletion);
    }).timeout(20000);
    test('Completion for Start Camel native application', async () => {
        const docURiTasksJson = (0, util_1.getDocUri)('.vscode/tasks.json');
        const expectedCompletion = { label: 'Start Camel native application debug-ready' };
        await testCompletion(docURiTasksJson, new vscode.Position(3, 7), expectedCompletion);
    }).timeout(20000);
});
async function testCompletion(docUri, position, expectedCompletion) {
    const doc = await vscode.workspace.openTextDocument(docUri);
    await vscode.window.showTextDocument(doc);
    await checkExpectedCompletion(docUri, position, expectedCompletion);
}
async function checkExpectedCompletion(docUri, position, expectedCompletion) {
    let hasExpectedCompletion = false;
    let lastCompletionList;
    try {
        await (0, async_wait_until_1.waitUntil)(async () => {
            // Executing the command `vscode.executeCompletionItemProvider` to simulate triggering completion
            await (vscode.commands.executeCommand('vscode.executeCompletionItemProvider', docUri, position)).then(value => {
                const actualCompletionList = value;
                lastCompletionList = actualCompletionList;
                const completionItemFound = actualCompletionList.items.find(completion => {
                    return completion.label === expectedCompletion.label
                        && (expectedCompletion.insertText === undefined || completion.insertText === expectedCompletion.insertText);
                });
                hasExpectedCompletion = completionItemFound !== undefined;
            });
            return hasExpectedCompletion;
        }, 10000, 500);
    }
    catch (err) {
        let errorMessage = '';
        if (lastCompletionList) {
            lastCompletionList.items.forEach(completion => {
                errorMessage += completion.label + '\n';
            });
        }
        throw new Error(`${err}\nCannot find expected completion "${expectedCompletion.label}" in the list of completions:\n${errorMessage}`);
    }
}
//# sourceMappingURL=completion.task.test.js.map