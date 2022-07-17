import * as path from "path";
import { camelCase } from "camel-case";
import { GO_PACKAGE_NAME } from "../constants";

export type Formatter = (gqlFilePath: string, gql: string) => string;

export const formatVariableName = (gqlFilePath: string, toUpper = false) => {
  const method = toUpper ? "toUpperCase" : "toLowerCase";

  let filename = camelCase(path.parse(gqlFilePath).name);

  filename = filename[0][method]() + filename.substring(1);

  return filename + "Gql";
};

export const formatDartFileContent: Formatter = (
  gqlFilePath: string,
  gql: string,
) => {
  return `final String ${formatVariableName(gqlFilePath)} = r"""${gql}""";`;
};

export const formatJsOrTsFileContent: Formatter = (
  gqlFilePath: string,
  gql: string,
) => {
  return `const ${formatVariableName(gqlFilePath)} = \`${gql}\`;`;
};

export const formatGoFileContent: Formatter = (
  gqlFilePath: string,
  gql: string,
) => {
  return `package ${GO_PACKAGE_NAME}\n\nconst ${formatVariableName(
    gqlFilePath,
    true,
  )} = \`${gql}\``;
};
