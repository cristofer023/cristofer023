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
exports.MULTIPLEROUTES_YAML = exports.SINGLEROUTE_YAML = exports.VARIABLESTEST_YAML = exports.LAUNCH_START_AND_ATTACH_DEBUGGER = exports.ATTACH_DEBUGGER_USING_PRELAUNCH_TASK = exports.START_WITH_CAMEL_DEBUG_MVN_GOAL = exports.RUN_WITH_JBANG_WITH_CAMEL_DEBUG = exports.MVN_BUILD_SUCCESS = exports.MVN_CLEAN = exports.MVN_COMPILE = exports.TOP_ROUTE_1 = exports.CAMEL_RUN_CODELENS = exports.CAMEL_DEBUG_CODELENS = exports.CAMEL_ROUTE_YAML_WITH_SPACE_COPY = exports.CAMEL_ROUTE_YAML_WITH_SPACE = exports.CAMEL_RUN_FOLDER_ACTION_LABEL = exports.CAMEL_RUN_WORKSPACE_ACTION_LABEL = exports.CAMEL_RUN_ACTION_LABEL = exports.CAMEL_RUN_DEBUG_FOLDER_ACTION_LABEL = exports.CAMEL_RUN_DEBUG_WORKSPACE_ACTION_LABEL = exports.CAMEL_RUN_DEBUG_ACTION_LABEL = exports.TEST_ARRAY_RUN_DEBUG = exports.TEST_ARRAY_RUN = exports.ENABLING_CAMEL_DEBUGGER = exports.TEST_MESSAGE = exports.TEST_BODY = exports.TEST_PROPERTY = exports.TEST_HEADER = exports.DEFAULT_MESSAGE = exports.DEFAULT_BODY = exports.DEFAULT_PROPERTY = exports.DEFAULT_HEADER = exports.LAUNCH_JSON = exports.TASKS_TEST_FILE_CAMEL_XML = exports.TASKS_TEST_FILE = exports.TASKS_COMMAND = exports.MAIN_CAMEL_EXAMPLE_DOT_VSCODE_DIR = exports.MAIN_CAMEL_EXAMPLE_DIR = exports.CAMEL_EXAMPLES_DIR = exports.RESOURCES_DOT_VSCODE_DIR = exports.RESOURCES_TASK_EXAMPLES_DIR = exports.RESOURCES_DIR = exports.WORKBENCH_DIR = exports.EXTENSION_DIR = exports.TEST_RESOURCES_DIR = void 0;
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
const os = __importStar(require("os"));
const path = __importStar(require("path"));
// Enforce same default storage setup as ExTester - see https://github.com/redhat-developer/vscode-extension-tester/wiki/Test-Setup#useful-env-variables
exports.TEST_RESOURCES_DIR = process.env.TEST_RESOURCES ? process.env.TEST_RESOURCES : `${os.tmpdir()}/test-resources`;
exports.EXTENSION_DIR = path.join(exports.TEST_RESOURCES_DIR, 'test-extensions');
exports.WORKBENCH_DIR = path.join(exports.TEST_RESOURCES_DIR, 'ui-workbench');
exports.RESOURCES_DIR = path.resolve('.', 'src', 'ui-test', 'resources');
exports.RESOURCES_TASK_EXAMPLES_DIR = path.join(exports.RESOURCES_DIR, 'tasks-examples');
exports.RESOURCES_DOT_VSCODE_DIR = path.join(exports.RESOURCES_DIR, ".vscode");
exports.CAMEL_EXAMPLES_DIR = path.join(exports.RESOURCES_DIR, 'camel-examples');
exports.MAIN_CAMEL_EXAMPLE_DIR = path.join(exports.CAMEL_EXAMPLES_DIR, 'main');
exports.MAIN_CAMEL_EXAMPLE_DOT_VSCODE_DIR = path.join(exports.MAIN_CAMEL_EXAMPLE_DIR, '.vscode');
exports.TASKS_COMMAND = "Tasks: Run Task";
exports.TASKS_TEST_FILE = "tasks.json";
exports.TASKS_TEST_FILE_CAMEL_XML = "tasks_test_file.camel.xml";
exports.LAUNCH_JSON = "launch.json";
exports.DEFAULT_HEADER = 'YamlHeader';
exports.DEFAULT_PROPERTY = 'yaml-dsl';
exports.DEFAULT_BODY = 'Hello Camel from';
exports.DEFAULT_MESSAGE = `${exports.DEFAULT_HEADER}: ${exports.DEFAULT_BODY} ${exports.DEFAULT_PROPERTY}`;
exports.TEST_HEADER = 'TestHeader';
exports.TEST_PROPERTY = 'test-dsl';
exports.TEST_BODY = 'Hello World from';
exports.TEST_MESSAGE = `${exports.TEST_HEADER}: ${exports.TEST_BODY} ${exports.TEST_PROPERTY}`;
exports.ENABLING_CAMEL_DEBUGGER = "Enabling Camel debugger";
exports.TEST_ARRAY_RUN = [
    'Routes startup',
    exports.DEFAULT_MESSAGE
];
exports.TEST_ARRAY_RUN_DEBUG = exports.TEST_ARRAY_RUN.concat([
    exports.ENABLING_CAMEL_DEBUGGER,
    'debugger has been attached'
]);
exports.CAMEL_RUN_DEBUG_ACTION_LABEL = 'Run with JBang and Debug Opened Camel Integration';
exports.CAMEL_RUN_DEBUG_WORKSPACE_ACTION_LABEL = 'Run with JBang and Debug All Camel Integrations from workspace root';
exports.CAMEL_RUN_DEBUG_FOLDER_ACTION_LABEL = 'Run with JBang and Debug All Camel Integrations from containing folder';
exports.CAMEL_RUN_ACTION_LABEL = 'Run with JBang Opened Camel Integration';
exports.CAMEL_RUN_WORKSPACE_ACTION_LABEL = 'Run with JBang All Camel Integrations from workspace root';
exports.CAMEL_RUN_FOLDER_ACTION_LABEL = 'Run with JBang All Camel Integrations from containing folder';
exports.CAMEL_ROUTE_YAML_WITH_SPACE = 'demo route.camel.yaml';
exports.CAMEL_ROUTE_YAML_WITH_SPACE_COPY = 'demo route copy.camel.yaml';
exports.CAMEL_DEBUG_CODELENS = 'Camel Debug with JBang';
exports.CAMEL_RUN_CODELENS = 'Camel Run with JBang';
exports.TOP_ROUTE_1 = 'top-route1.camel.yaml';
// maven
exports.MVN_COMPILE = 'mvn compile';
exports.MVN_CLEAN = 'mvn clean';
exports.MVN_BUILD_SUCCESS = 'BUILD SUCCESS';
// tasks.json
exports.RUN_WITH_JBANG_WITH_CAMEL_DEBUG = 'Run Camel application with JBang with camel-debug';
exports.START_WITH_CAMEL_DEBUG_MVN_GOAL = 'Start Camel application with camel:debug Maven goal';
exports.ATTACH_DEBUGGER_USING_PRELAUNCH_TASK = 'Attach Camel Debugger after starting the Camel Application using the preLaunchTask specified';
// launch.json
exports.LAUNCH_START_AND_ATTACH_DEBUGGER = 'Camel: Start Camel application and attach Camel debugger';
// VariablesTest.camel.yaml
exports.VARIABLESTEST_YAML = 'VariablesTest.camel.yaml';
// pause test
exports.SINGLEROUTE_YAML = 'SingleRoute.camel.yaml';
exports.MULTIPLEROUTES_YAML = 'MultipleRoutes.camel.yaml';
//# sourceMappingURL=variables.js.map