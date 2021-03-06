"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Doc = exports.SupportedGqlExtensions = exports.SupportedLanguages = void 0;
var class_validator_1 = require("class-validator");
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
var Doc = (function () {
    function Doc(params) {
        this.graphql_folder = params.graphql_folder;
        this.graphql_extension = params.graphql_extension;
        this.output_folder = params.output_folder;
        this.output_language = params.output_language;
        this.prefer_const = params.prefer_const;
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], Doc.prototype, "graphql_folder");
    __decorate([
        (0, class_validator_1.IsEnum)(SupportedGqlExtensions)
    ], Doc.prototype, "graphql_extension");
    __decorate([
        (0, class_validator_1.IsString)()
    ], Doc.prototype, "output_folder");
    __decorate([
        (0, class_validator_1.IsEnum)(SupportedLanguages)
    ], Doc.prototype, "output_language");
    __decorate([
        (0, class_validator_1.IsBoolean)()
    ], Doc.prototype, "prefer_const");
    return Doc;
}());
exports.Doc = Doc;
