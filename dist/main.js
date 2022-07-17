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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = require("fs");
var yaml = __importStar(require("js-yaml"));
var path_1 = require("path");
var util_1 = require("util");
var class_validator_1 = require("class-validator");
var consola_1 = __importDefault(require("consola"));
var glob_1 = __importDefault(require("glob"));
var helpers_1 = require("./helpers");
var interfaces_1 = require("./interfaces");
var myGlob = (0, util_1.promisify)(glob_1["default"]);
function convertFile(doc) {
    return function (filePath) {
        var targetPath = (0, helpers_1.changeFileLocation)((0, helpers_1.changeFileExtension)(filePath, doc.output_language), doc);
        var fileContent = (0, helpers_1.getFileContentAndConvertToGoodLanguage)(filePath, doc.output_language);
        (0, helpers_1.saveFile)(targetPath, fileContent);
    };
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var params, doc, errors, files, e_1, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    params = yaml.load((0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), "gql_to_x.yaml"), "utf8"));
                    doc = new interfaces_1.Doc(params);
                    return [4, (0, class_validator_1.validate)(doc)];
                case 1:
                    errors = _a.sent();
                    if (errors.length)
                        throw new Error("Invalid config file");
                    return [4, myGlob((0, path_1.join)(doc.graphql_folder, "**", "*.".concat(doc.graphql_extension)))];
                case 2:
                    files = _a.sent();
                    files.forEach(convertFile(doc));
                    consola_1["default"].success("Files successfully generated");
                    return [3, 4];
                case 3:
                    e_1 = _a.sent();
                    message = e_1.message;
                    if (e_1.errno === -2 && e_1.path.includes("gql_to_x.yaml")) {
                        message = "Config file not found";
                    }
                    consola_1["default"].error(message);
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
main();
