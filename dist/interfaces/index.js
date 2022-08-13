"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doc = exports.SupportedGqlExtensions = exports.SupportedLanguages = void 0;
const tslib_1 = require("tslib");
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
    constructor(params) {
        this.graphql_folder = params.graphql_folder;
        this.graphql_extension = params.graphql_extension;
        this.output_folder = params.output_folder;
        this.output_language = params.output_language;
        this.prefer_const = params.prefer_const;
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Doc.prototype, "graphql_folder", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(SupportedGqlExtensions),
    tslib_1.__metadata("design:type", String)
], Doc.prototype, "graphql_extension", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Doc.prototype, "output_folder", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(SupportedLanguages),
    tslib_1.__metadata("design:type", String)
], Doc.prototype, "output_language", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], Doc.prototype, "prefer_const", void 0);
exports.Doc = Doc;
