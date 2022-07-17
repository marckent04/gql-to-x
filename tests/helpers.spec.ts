jest.mock("fs");

import * as fs from "fs";

import {
  changeFileExtension,
  changeFileLocation,
  getFileContentAndConvertToGoodLanguage,
  saveFile,
} from "../src/helpers";

import { SupportedGqlExtensions, SupportedLanguages } from "../src/interfaces";

describe("helpers test", () => {
  test("should change current files directory to output directory", () => {
    expect(
      changeFileLocation("graphql_files/graphql_files/login.graphql", {
        output_folder: "gql_files",
        graphql_folder: "graphql_files",
        graphql_extension: SupportedGqlExtensions.GRAPHQL,
        output_language: SupportedLanguages.DART,
        prefer_const: false,
      }),
    ).toEqual("gql_files/graphql_files/login.graphql");
  });

  test("should change files extension to output extension", () => {
    expect(
      changeFileExtension("graphql_files/graphql_files/login.graphql", "dart"),
    ).toEqual("graphql_files/graphql_files/login.dart");
  });

  test("should create file with correct content", () => {
    jest.spyOn(fs, "writeFileSync").mockImplementation(() => null);
    saveFile("jj", "rrr");
    expect(fs.writeFileSync).toHaveBeenCalledWith("jj", "rrr", {
      encoding: "utf-8",
    });
  });

  describe("should get file content and convert to good language", () => {
    // test("With golang", () => {
    //   jest.spyOn(fs, "readFileSync").mockReturnValue("oki");

    //   expect(
    //     getFileContentAndConvertToGoodLanguage(
    //       "ee/jj.gql",
    //       SupportedLanguages.GOLANG,
    //     ),
    //   ).toContainEqual("const JjGql = `oki`;");
    // });

    test("With dart", () => {
      jest.spyOn(fs, "readFileSync").mockReturnValue("oki");

      expect(
        getFileContentAndConvertToGoodLanguage(
          "ee/jj.gql",
          SupportedLanguages.DART,
        ),
      ).toEqual('final String jjGql = r"""oki""";');
    });

    test("With no trimmed content", () => {
      jest.spyOn(fs, "readFileSync").mockReturnValue("  oki  ");

      expect(
        getFileContentAndConvertToGoodLanguage(
          "ee/test-micro.gql",
          SupportedLanguages.DART,
        ),
      ).toEqual('final String testMicroGql = r"""oki""";');
    });
  });
});
