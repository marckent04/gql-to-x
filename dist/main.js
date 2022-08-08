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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const yaml = __importStar(require("js-yaml"));
const path_1 = require("path");
const util_1 = require("util");
const class_validator_1 = require("class-validator");
const consola_1 = __importDefault(require("consola"));
const glob_1 = __importDefault(require("glob"));
const helpers_1 = require("./helpers");
const interfaces_1 = require("./interfaces");
const myGlob = (0, util_1.promisify)(glob_1.default);
function convertFile(doc) {
    return (filePath) => {
        const targetPath = (0, helpers_1.changeFileLocation)((0, helpers_1.changeFileExtension)(filePath, doc.output_language), doc);
        const fileContent = (0, helpers_1.getFileContentAndConvertToGoodLanguage)(filePath, doc.output_language);
        (0, helpers_1.saveFile)(targetPath, fileContent);
    };
}
async function main() {
    try {
        const params = yaml.load((0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), "gql_to_x.yaml"), "utf8"));
        const doc = new interfaces_1.Doc(params);
        const errors = await (0, class_validator_1.validate)(doc);
        if (errors.length)
            throw new Error("Invalid config file");
        const files = await myGlob((0, path_1.join)(doc.graphql_folder, "**", `*.${doc.graphql_extension}`));
        files.forEach(convertFile(doc));
        consola_1.default.success("Files successfully generated");
    }
    catch (e) {
        let message = e.message;
        if (e.errno === -2 && e.path.includes("gql_to_x.yaml")) {
            message = "Config file not found";
        }
        consola_1.default.error(message);
    }
}
main();
