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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.formatGoFileContent = exports.formatJsOrTsFileContent = exports.formatDartFileContent = exports.formatVariableName = void 0;
var path = __importStar(require("path"));
var camel_case_1 = require("camel-case");
var constants_1 = require("../constants");
var formatVariableName = function (gqlFilePath, toUpper) {
    if (toUpper === void 0) { toUpper = false; }
    var method = toUpper ? "toUpperCase" : "toLowerCase";
    var filename = (0, camel_case_1.camelCase)(path.parse(gqlFilePath).name);
    filename = filename[0][method]() + filename.substring(1);
    return filename + "Gql";
};
exports.formatVariableName = formatVariableName;
var formatDartFileContent = function (gqlFilePath, gql) {
    return "final String ".concat((0, exports.formatVariableName)(gqlFilePath), " = r\"\"\"").concat(gql, "\"\"\";");
};
exports.formatDartFileContent = formatDartFileContent;
var formatJsOrTsFileContent = function (gqlFilePath, gql) {
    return "const ".concat((0, exports.formatVariableName)(gqlFilePath), " = `").concat(gql, "`;");
};
exports.formatJsOrTsFileContent = formatJsOrTsFileContent;
var formatGoFileContent = function (gqlFilePath, gql) {
    return "package ".concat(constants_1.GO_PACKAGE_NAME, "\n\nconst ").concat((0, exports.formatVariableName)(gqlFilePath, true), " = `").concat(gql, "`");
};
exports.formatGoFileContent = formatGoFileContent;
