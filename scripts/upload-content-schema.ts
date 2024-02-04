import { compileFromFile } from "json-schema-to-typescript";
import { promises as fsPromises } from "fs";
import * as path from "path";

// Function for downloading and saving a file
async function downloadFile(url: string, outputPath: string): Promise<void> {
  const response = await fetch(url);
  const data = await response.text();
  await fsPromises.writeFile(outputPath, data);
}

// Function for generating TypeScript types from JSON schema
async function generateTypes(
  schemaPath: string,
  outputPath: string,
): Promise<void> {
  const ts = await compileFromFile(schemaPath);
  await fsPromises.writeFile(outputPath, ts);
}

// Main function
async function downloadAndGenerateTypes(
  schemaDir: string,
  outputDir: string,
): Promise<void> {
  const schemaFiles = [
    "manifest.schema.json",
    "course.schema.json",
    "lesson.schema.json",
  ];

  for (const file of schemaFiles) {
    const schemaPath = path.join(schemaDir, file);
    const outputPath = path.join(outputDir, file);

    // File download
    await downloadFile(schemaPath, outputPath);

    // Generating TypeScript types
    const typesOutputPath = path.join(
      outputDir,
      file.replace(".json", ".d.ts"),
    );
    await generateTypes(outputPath, typesOutputPath);
  }
}

// Reading command line arguments
const [schemaDir, outputDir] = process.argv.slice(2);

if (!schemaDir || !outputDir) {
  console.error(
    "Both paths must be specified: the path to the schematics and the path to the output files",
  );
  process.exit(1);
}

downloadAndGenerateTypes(schemaDir, outputDir)
  .then(() => console.log("Schematics downloaded and types generated!!"))
  .catch((error) => console.error("There's been an error:", error));
