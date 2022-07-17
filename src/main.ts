import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";
import { promisify } from "util";
import { validate } from "class-validator";

import consola from "consola";
import glob from "glob";

import {
  changeFileLocation,
  changeFileExtension,
  saveFile,
  getFileContentAndConvertToGoodLanguage,
} from "./helpers";

import { Doc, IDoc } from "./interfaces";

const myGlob = promisify(glob);

function convertFile(doc: Doc) {
  return (filePath: string) => {
    const targetPath = changeFileLocation(
      changeFileExtension(filePath, doc.output_language!),
      doc,
    );

    const fileContent = getFileContentAndConvertToGoodLanguage(
      filePath,
      doc.output_language,
    );

    saveFile(targetPath, fileContent);
  };
}

async function main() {
  try {
    const params = yaml.load(
      readFileSync(join(process.cwd(), "gql_to_x.yaml"), "utf8"),
    ) as IDoc;

    const doc = new Doc(params);

    const errors = await validate(doc);

    if (errors.length) throw new Error("Invalid config file");

    const files = await myGlob(
      join(doc.graphql_folder, "**", `*.${doc.graphql_extension}`),
    );

    files.forEach(convertFile(doc));

    consola.success("Files successfully generated");
  } catch (e) {
    let message = e.message;

    if (e.errno === -2 && (e.path as string).includes("gql_to_x.yaml")) {
      message = "Config file not found";
    }

    consola.error(message);
  }
}

main();
