"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileContentAndConvertToGoodLanguage = exports.changeFileLocation = exports.changeFileExtension = exports.saveFile = void 0;
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const fs = tslib_1.__importStar(require("fs"));
const interfaces_1 = require("../interfaces");
const formatters_1 = require("./formatters");
const saveFile = (filePath, content) => {
    const parsedPath = path.parse(filePath);
    fs.mkdirSync(parsedPath.dir, { recursive: true });
    fs.writeFileSync(filePath, content, { encoding: "utf-8" });
};
exports.saveFile = saveFile;
const changeFileExtension = (filePath, outputExtension) => {
    return filePath.replace(path.extname(filePath), `.${outputExtension}`);
};
exports.changeFileExtension = changeFileExtension;
const changeFileLocation = (filePath, doc) => {
    return filePath.replace(doc.graphql_folder, doc.output_folder);
};
exports.changeFileLocation = changeFileLocation;
const getFileContentAndConvertToGoodLanguage = (gqlFilePath, targetLanguage) => {
    const fileContent = fs.readFileSync(gqlFilePath).toString("utf-8").trim();
    let func;
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
