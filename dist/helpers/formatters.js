"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatGoFileContent = exports.formatJsOrTsFileContent = exports.formatDartFileContent = exports.formatVariableName = void 0;
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const camel_case_1 = require("camel-case");
const constants_1 = require("../constants");
const formatVariableName = (gqlFilePath, toUpper = false) => {
    const method = toUpper ? "toUpperCase" : "toLowerCase";
    let filename = (0, camel_case_1.camelCase)(path.parse(gqlFilePath).name);
    filename = filename[0][method]() + filename.substring(1);
    return filename + "Gql";
};
exports.formatVariableName = formatVariableName;
const formatDartFileContent = (gqlFilePath, gql) => {
    return `final String ${(0, exports.formatVariableName)(gqlFilePath)} = r"""${gql}""";`;
};
exports.formatDartFileContent = formatDartFileContent;
const formatJsOrTsFileContent = (gqlFilePath, gql) => {
    return `const ${(0, exports.formatVariableName)(gqlFilePath)} = \`${gql}\`;`;
};
exports.formatJsOrTsFileContent = formatJsOrTsFileContent;
const formatGoFileContent = (gqlFilePath, gql) => {
    return `package ${constants_1.GO_PACKAGE_NAME}\n\nconst ${(0, exports.formatVariableName)(gqlFilePath, true)} = \`${gql}\``;
};
exports.formatGoFileContent = formatGoFileContent;
