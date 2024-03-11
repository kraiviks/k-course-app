import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import cuid from "cuid";

function replaceCuidInFile(file: string) {
  try {
    let content = fs.readFileSync(file, "utf8");
    const updatedContent = content.replace(/{cuid}/g, () => cuid());

    if (content !== updatedContent) {
      fs.writeFileSync(file, updatedContent, "utf8");
      console.log(`Updated: ${file}`);
    }
  } catch (error) {
    console.error(`Error when updating a file ${file}:`, error);
  }
}

function watchYAMLFiles(relativePath: string) {
  const directory = path.join(process.cwd(), relativePath);
  const watcher = chokidar.watch(path.join(directory, "**/*.yaml"), {
    ignored: /^\./,
    persistent: true,
    ignoreInitial: false,
  });

  watcher.on("add", (file) => {
    replaceCuidInFile(file);
  });

  // Processing when a file is changed
  watcher.on("change", (file) => {
    replaceCuidInFile(file);
  });
}

// Using a command line argument to specify a relative path
const relativePath: string = process.argv[2]; // The default is './test-structure'
watchYAMLFiles(relativePath);
