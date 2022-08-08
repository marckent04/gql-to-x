"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doc = exports.SupportedGqlExtensions = exports.SupportedLanguages = void 0;
const class_validator_1 = require("class-validator");
var SupportedLanguages;
(function (SupportedLanguages) {
    SupportedLanguages["JAVASCRIPT"] = "js";
    SupportedLanguages["GOLANG"] = "go";
    SupportedLanguages["TYPESCRIPT"] = "ts";
    SupportedLanguages["DART"] = "dart";
})(SupportedLanguages = exports.SupportedLanguages || (exports.SupportedLanguages = {}));
var SupportedGqlExtensions;
(function (SupportedGqlExtensions) {
    SupportedGqlExtensions["GRAPHQL"] = "graphql";
    SupportedGqlExtensions["GQL"] = "gql";
})(SupportedGqlExtensions = exports.SupportedGqlExtensions || (exports.SupportedGqlExtensions = {}));
class Doc {
    graphql_folder;
    graphql_extension;
    output_folder;
    output_language;
    prefer_const;
    constructor(params) {
        this.graphql_folder = params.graphql_folder;
        this.graphql_extension = params.graphql_extension;
        this.output_folder = params.output_folder;
        this.output_language = params.output_language;
        this.prefer_const = params.prefer_const;
    }
}
__decorate([
    (0, class_validator_1.IsString)()
], Doc.prototype, "graphql_folder", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(SupportedGqlExtensions)
], Doc.prototype, "graphql_extension", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], Doc.prototype, "output_folder", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(SupportedLanguages)
], Doc.prototype, "output_language", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)()
], Doc.prototype, "prefer_const", void 0);
exports.Doc = Doc;
