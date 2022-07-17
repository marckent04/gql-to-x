import * as path from "path";
import * as fs from "fs";

import { Doc, SupportedLanguages } from "../interfaces";
import {
  formatDartFileContent,
  formatGoFileContent,
  formatJsOrTsFileContent,
  Formatter,
} from "./formatters";

export const saveFile = (filePath: string, content: string) => {
  const parsedPath = path.parse(filePath);
  fs.mkdirSync(parsedPath.dir, { recursive: true });
  fs.writeFileSync(filePath, content, { encoding: "utf-8" });
};

export const changeFileExtension = (
  filePath: string,
  outputExtension: string,
): string => {
  return filePath.replace(path.extname(filePath), `.${outputExtension}`);
};

export const changeFileLocation = (filePath: string, doc: Doc): string => {
  return filePath.replace(doc.graphql_folder, doc.output_folder);
};

export const getFileContentAndConvertToGoodLanguage = (
  gqlFilePath: string,
  targetLanguage: SupportedLanguages,
) => {
  const fileContent = fs.readFileSync(gqlFilePath).toString("utf-8").trim();

  let func: Formatter;

  switch (targetLanguage) {
    case SupportedLanguages.DART:
      func = formatDartFileContent;
      break;
    case SupportedLanguages.GOLANG:
      func = formatGoFileContent;
      break;
    case SupportedLanguages.JAVASCRIPT:
    case SupportedLanguages.TYPESCRIPT:
      func = formatJsOrTsFileContent;
      break;
    default:
      throw new Error("language no recongnized");
  }

  return func(gqlFilePath, fileContent);
};
