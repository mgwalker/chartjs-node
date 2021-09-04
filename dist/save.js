import fs from "fs/promises";
import path from "path";
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "url";

const run = async (cmd, savePath) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const url = pathToFileURL(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "charts.html")
  ).href;

  await page.goto(url);

  try {
    const dataUrl = await page.evaluate(cmd);
    const buffer = Buffer.from(
      dataUrl.replace(/^data:image\/png;base64,/, ""),
      "base64"
    );

    if (savePath) {
      return await fs.writeFile(savePath, buffer);
    }
    return buffer;
  } finally {
    await browser.close();
  }
};

export default run;
