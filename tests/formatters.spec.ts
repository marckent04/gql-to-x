jest.mock("fs");

import {
  formatDartFileContent,
  formatJsOrTsFileContent,
  formatGoFileContent,
} from "../src/helpers/formatters";
import { GO_PACKAGE_NAME } from "../src/constants";
describe("should convert graphql file content", () => {
  let contentFile = `
  mutation userLogin($credentials: AuthCredentialsInput) {
      customerLogin(credentials: $credentials) {
        token
      }
    }
    
  `;

  test("to Dart code", () => {
    expect(
      formatDartFileContent("graphql_files/login.graphql", contentFile),
    ).toEqual(`final String loginGql = r"""${contentFile}""";`);
  });

  test("to Javascript or Typescript code", () => {
    expect(
      formatJsOrTsFileContent("graphql_files/SignIn.graphql", contentFile),
    ).toEqual(`const signInGql = \`${contentFile}\`;`);
  });

  test("to Golang code", () => {
    expect(
      formatGoFileContent("graphql_files/SignIn.graphql", contentFile).trim(),
    ).toEqual(
      `package ${GO_PACKAGE_NAME}\n\nconst SignInGql = \`${contentFile}\``,
    );
  });
});
