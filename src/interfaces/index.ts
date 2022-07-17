import { IsBoolean, IsEnum, IsString } from "class-validator";

export interface IDoc {
  graphql_folder: string;
  output_folder: string;
  graphql_extension: SupportedGqlExtensions;
  output_language: SupportedLanguages;
  prefer_const: boolean;
}

export enum SupportedLanguages {
  JAVASCRIPT = "js",
  GOLANG = "go",
  TYPESCRIPT = "ts",
  DART = "dart",
}
export enum SupportedGqlExtensions {
  GRAPHQL = "graphql",
  GQL = "gql",
}

export class Doc {
  @IsString()
  readonly graphql_folder: string;

  @IsEnum(SupportedGqlExtensions)
  readonly graphql_extension: SupportedGqlExtensions;

  @IsString()
  readonly output_folder: string;

  @IsEnum(SupportedLanguages)
  readonly output_language: SupportedLanguages;

  @IsBoolean()
  readonly prefer_const: boolean;

  constructor(params: IDoc) {
    this.graphql_folder = params.graphql_folder;
    this.graphql_extension = params.graphql_extension;
    this.output_folder = params.output_folder;
    this.output_language = params.output_language;
    this.prefer_const = params.prefer_const;
  }
}
