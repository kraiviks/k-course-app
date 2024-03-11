import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import * as Yaml from "yaml";
import Ajv from "ajv";
import { Lesson } from "../schemas/lesson.schema";
import { Course } from "../schemas/course.schema";
import { Manifest } from "../schemas/manifest.schema";

export class ContentParser {
  private ajv = new Ajv({
    strict: false,
  });

  async parse<T>(text: string, schema: object) {
    const resultObject: unknown = await Yaml.parse(text);

    if (this.ajv.validate(schema, resultObject)) {
      return resultObject as T;
    } else {
      console.log(this.ajv.errors);
      throw this.ajv.errors;
    }
  }
}

const contentParser = new ContentParser();

// CHECK IDS
let ids = new Set<string>();

const checkIds = (obj: any, context: string, path = "") => {
  if (obj && typeof obj === "object") {
    if (obj.id) {
      if (ids.has(obj.id)) {
        console.error(
          `Duplicate ID found: ${obj.id} in ${context} path: ${path}`
        );
      } else {
        ids.add(obj.id);
      }
    }
    Object.entries(obj).forEach(([key, value]) =>
      checkIds(value, `${path}.${key}`, context)
    );
  }
};

// VALIDATE SCHEMA

const lessonSchema = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../schemas/lesson.schema.json"), {
    encoding: "utf8",
  })
);
const courseSchema = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../schemas/course.schema.json"), {
    encoding: "utf8",
  })
);
const manifestSchema = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../schemas/manifest.schema.json"), {
    encoding: "utf8",
  })
);

async function validateLesson(file: string) {
  const lesson = await contentParser.parse<Lesson>(
    fs.readFileSync(file, "utf8"),
    lessonSchema
  );

  checkIds(lesson, file);
  return lesson;
}

async function validateCourse(file: string) {
  const course = await contentParser.parse<Course>(
    fs.readFileSync(file, "utf8"),
    courseSchema
  );
  checkIds(course, file);
  return course;
}

async function validateManifest(file: string) {
  const manifest = await contentParser.parse<Manifest>(
    fs.readFileSync(file, "utf8"),
    manifestSchema
  );
  return manifest;
}

async function scanDirectory(directoryPath: string) {
  ids = new Set();

  const manifest = await validateManifest(`${directoryPath}/manifest.yaml`);

  for (const coursePath of manifest.courses) {
    const course = await validateCourse(
      `${directoryPath}/courses/${coursePath}/course.yaml`
    );

    for (const lessonPath of course.lessons) {
      await validateLesson(
        `${directoryPath}/courses/${coursePath}/lessons/${lessonPath}/lesson.yaml`
      );
    }
  }

  console.log("All files are valid");
}

function watchYAMLFiles(relativePath: string) {
  const directory = path.join(process.cwd(), relativePath);
  const watcher = chokidar.watch(path.join(directory, "**/*.yaml"), {
    ignored: /^\./,
    persistent: true,
    ignoreInitial: false,
  });

  scanDirectory(directory).catch((e) => {
    console.error(e);
  });
  // Обработка при изменении файла
  watcher.on("change", async () => {
    try {
      await scanDirectory(directory);
    } catch (error) {
      console.error(error);
    }
  });
}

const relativePath: string = process.argv[2];
watchYAMLFiles(relativePath);
