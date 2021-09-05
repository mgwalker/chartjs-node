import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import snapshot from "./snapshot.js";

(async () => {
  /* eslint-disable no-console */
  let code = 0;
  const searchPath = path.dirname(fileURLToPath(import.meta.url));

  const files = await fs.readdir(searchPath);

  // This lint warning is for Babel transpiled code. Not relevant here.
  // eslint-disable-next-line no-restricted-syntax
  for await (const file of files) {
    if (file.match(/\.test\.js$/i)) {
      const { default: tests } = await import(`./${file}`);
      console.log(file);
      // eslint-disable-next-line no-restricted-syntax
      for await (const [name, fn] of Object.entries(tests)) {
        try {
          const { compare } = snapshot(path.join(searchPath, file), name);
          await fn(compare);

          console.log(`  \x1b[1;32m✓ ${name}\x1b[0m`);
        } catch (e) {
          console.log(`  \x1b[1;31m✕ ${name}\x1b[0m`);
          console.log(e);
          console.log();
          code = 127;
        }
      }
    }
  }

  process.exit(code);
})();
