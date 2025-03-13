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
exports.checkCodelensForOpenedDocument = checkCodelensForOpenedDocument;
const chai_1 = require("chai");
const extension = __importStar(require("../../../extension"));
const vscode = __importStar(require("vscode"));
const util_1 = require("../util");
const async_wait_until_1 = require("async-wait-until");
suite("CodeLenses Test", function () {
    suite("Camel Debug with JBang", function () {
        test("Codelens provider returns correct CodeLens for YAML file", async () => testCodeLens('my-route.yaml', extension.CAMEL_RUN_AND_DEBUG_WITH_JBANG_COMMAND_ID));
        test("Codelens provider returns correct CodeLens for XML file", async () => testCodeLens('my-route.xml', extension.CAMEL_RUN_AND_DEBUG_WITH_JBANG_COMMAND_ID));
        test("Codelens provider returns correct CodeLens for Java file", async () => testCodeLens('MyCamelRoute.java', extension.CAMEL_RUN_AND_DEBUG_WITH_JBANG_COMMAND_ID));
    });
    suite("Camel Run with JBang", function () {
        test("Codelens provider returns correct CodeLens for YAML file", async () => testCodeLens('my-route.yaml', extension.CAMEL_RUN_WITH_JBANG_COMMAND_ID));
        test("Codelens provider returns correct CodeLens for XML file", async () => testCodeLens('my-route.xml', extension.CAMEL_RUN_WITH_JBANG_COMMAND_ID));
        test("Codelens provider returns correct CodeLens for Java file", async () => testCodeLens('MyCamelRoute.java', extension.CAMEL_RUN_WITH_JBANG_COMMAND_ID));
    });
});
async function testCodeLens(uri, camelCommand) {
    const doc = (0, util_1.getDocUri)(uri);
    await vscode.workspace.openTextDocument(doc);
    await checkCodelensForOpenedDocument(doc, camelCommand);
}
async function checkCodelensForOpenedDocument(uri, camelCommand) {
    const codeLenses = await retrieveCodeLensOnOpenedDocument(uri);
    checkCodeLens(codeLenses, camelCommand);
}
async function retrieveCodeLensOnOpenedDocument(uri) {
    let res;
    await (0, async_wait_until_1.waitUntil)(async () => {
        res = await vscode.commands.executeCommand('vscode.executeCodeLensProvider', uri);
        return res !== undefined && res.length > 0;
    });
    return res;
}
function checkCodeLens(codeLenses, camelCommand) {
    const integrationCondeLens = codeLenses.find(codelens => {
        return codelens.command?.command === camelCommand;
    });
    (0, chai_1.expect)(integrationCondeLens).to.not.be.undefined;
    const codeLens = integrationCondeLens;
    (0, chai_1.expect)(codeLens.isResolved).to.be.true;
}
//# sourceMappingURL=CamelJBangCodelens.test.js.map