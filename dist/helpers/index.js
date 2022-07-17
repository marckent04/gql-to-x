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
exports.getFileContentAndConvertToGoodLanguage = exports.changeFileLocation = exports.changeFileExtension = exports.saveFile = void 0;
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var interfaces_1 = require("../interfaces");
var formatters_1 = require("./formatters");
var saveFile = function (filePath, content) {
    var parsedPath = path.parse(filePath);
    fs.mkdirSync(parsedPath.dir, { recursive: true });
    fs.writeFileSync(filePath, content, { encoding: "utf-8" });
};
exports.saveFile = saveFile;
var changeFileExtension = function (filePath, outputExtension) {
    return filePath.replace(path.extname(filePath), ".".concat(outputExtension));
};
exports.changeFileExtension = changeFileExtension;
var changeFileLocation = function (filePath, doc) {
    return filePath.replace(doc.graphql_folder, doc.output_folder);
};
exports.changeFileLocation = changeFileLocation;
var getFileContentAndConvertToGoodLanguage = function (gqlFilePath, targetLanguage) {
    var fileContent = fs.readFileSync(gqlFilePath).toString("utf-8").trim();
    var func;
    switch (targetLanguage) {
        case interfaces_1.SupportedLanguages.DART:
            func = formatters_1.formatDartFileContent;
            break;
        case interfaces_1.SupportedLanguages.GOLANG:
            func = formatters_1.formatGoFileContent;
            break;
        case interfaces_1.SupportedLanguages.JAVASCRIPT:
        case interfaces_1.SupportedLanguages.TYPESCRIPT:
            func = formatters_1.formatJsOrTsFileContent;
            break;
        default:
            throw new Error("language no recongnized");
    }
    return func(gqlFilePath, fileContent);
};
exports.getFileContentAndConvertToGoodLanguage = getFileContentAndConvertToGoodLanguage;
