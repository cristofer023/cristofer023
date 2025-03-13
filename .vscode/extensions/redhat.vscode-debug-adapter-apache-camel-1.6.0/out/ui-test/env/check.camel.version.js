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
const chai_1 = require("chai");
const utils_1 = require("../utils");
describe('Camel version', function () {
    this.timeout(15000);
    const testDescription = process.env.CAMEL_VERSION ? `Check actual version is ${process.env.CAMEL_VERSION}` : 'Nothing to check';
    it(testDescription, async function () {
        if (process.env.CAMEL_VERSION === undefined || process.env.CAMEL_VERSION === null || process.env.CAMEL_VERSION.length === 0) {
            this.skip();
        }
        chai_1.assert.equal((0, utils_1.readUserSetting)(utils_1.CATALOG_VERSION_ID), process.env.CAMEL_VERSION);
    });
});
//# sourceMappingURL=check.camel.version.js.map