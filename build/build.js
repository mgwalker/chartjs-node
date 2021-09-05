import fetch from "node-fetch"; // eslint-disable-line import/no-extraneous-dependencies
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

(async () => {
  const root = path.dirname(fileURLToPath(import.meta.url));

  const SCRIPTS = JSON.parse(
    await fs.readFile(path.join(root, "external.json"), { encoding: "utf-8" })
  );

  const html = await fs.readFile(path.join(root, "index.html"), {
    encoding: "utf-8",
  });

  const scripts = (
    await Promise.all(
      SCRIPTS.map(([name, version]) =>
        fetch(`https://cdn.jsdelivr.net/npm/${name}@${version}`).then((t) =>
          t.text()
        )
      )
    )
  ).map((s) => s.replace(/\/\/# sourceMappingURL=\S+/i, ""));

  SCRIPTS.map(([, , integration]) => integration)
    .filter((i) => !!i)
    .forEach((i) => scripts.push(`Chart.register(window["${i}"]);`));

  const withJs = html.replace(
    /\s+<!-- script -->/i,
    // Make this a function so we don't accidentally interpret any $x type
    // tokens in the downloaded source as replacements from the regex. (Happens
    // with Luxon for sure, but possibly others too!)
    () => `
<script type="text/javascript">
${scripts.join("\n")}
</script>
`
  );

  await fs.writeFile(path.join(root, "../dist", "charts.html"), withJs, {
    encoding: "utf-8",
  });
})();
