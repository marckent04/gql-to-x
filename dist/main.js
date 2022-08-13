"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const yaml = tslib_1.__importStar(require("js-yaml"));
const path_1 = require("path");
const util_1 = require("util");
const class_validator_1 = require("class-validator");
const consola_1 = tslib_1.__importDefault(require("consola"));
const glob_1 = tslib_1.__importDefault(require("glob"));
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
        const path = (0, path_1.join)(doc.graphql_folder, "**", `*.${doc.graphql_extension}`).replace(/\\/g, "/");
        const files = await myGlob(path);
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
