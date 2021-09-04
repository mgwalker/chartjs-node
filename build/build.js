import fetch from "node-fetch"; // eslint-disable-line import/no-extraneous-dependencies
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

(async () => {
  const CHARTJS_VERSION = process.env.CHARTJS_VERSION ?? "3.5.1";

  const root = path.dirname(fileURLToPath(import.meta.url));

  const html = await fs.readFile(path.join(root, "index.html"), {
    encoding: "utf-8",
  });

  const chartjs = await fetch(
    `https://cdn.jsdelivr.net/npm/chart.js@${CHARTJS_VERSION}/dist/chart.min.js`
  ).then((t) => t.text());

  const withJs = html.replace(
    /(\s+)<!-- script -->/i,
    `
$1<script type="text/javascript">
${chartjs}
$1</script>
`
  );

  await fs.writeFile(path.join(root, "../dist", "charts.html"), withJs, {
    encoding: "utf-8",
  });
})();
