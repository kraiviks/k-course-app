import fs from "fs";
import path from "path";
import { compileFromFile } from "json-schema-to-typescript";
import chokidar from "chokidar";

async function convertSchemaToType(file: string): Promise<void> {
  try {
    const ts: string = await compileFromFile(file);
    fs.writeFileSync(
      path.join(path.dirname(file), path.basename(file, ".json") + ".d.ts"),
      ts
    );
    console.log(`Converted: ${file}`);
  } catch (error) {
    console.error(`Error during file conversion ${file}:`, error);
  }
}

function watchSchemas(relativePath: string): void {
  const directory: string = path.join(process.cwd(), relativePath);

  const watcher = chokidar.watch(path.join(directory, "*.json"), {
    ignored: /^\./,
    persistent: true,
    ignoreInitial: false,
  });

  watcher
    .on("add", async (file) => {
      console.log(`New file found: ${file}`);
      await convertSchemaToType(file);
    })
    .on("change", async (file) => {
      console.log(`Changes detected in the file: ${file}`);
      await convertSchemaToType(file);
    });
}

// Using a command line argument to specify a relative path
const relativePath: string = process.argv[2];
watchSchemas(relativePath);
