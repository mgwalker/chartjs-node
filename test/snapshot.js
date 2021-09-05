import fs from "fs/promises";
import path from "path";
import looksSame from "looks-same";
import Chart from "../dist/chart.js";

const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch (e) {
    return false;
  }
};

const imgPath = (testPath, testName, index) => {
  const dir = path.dirname(testPath);
  const fn = path.basename(testPath, ".test.js");

  return path.join(
    dir,
    "snapshots",
    `${fn}-${testName.replace(/\s/g, "-")}.${index}.png`
  );
};

const makeDiff = async (reference, current, diff) =>
  new Promise((resolve) => {
    looksSame.createDiff(
      {
        reference,
        current,
        diff,
        highlightColor: "#ff00ff", // color to highlight the differences
        strict: false, // strict comparsion
        tolerance: 2.5,
        antialiasingTolerance: 3,
        ignoreAntialiasing: true, // ignore antialising by default
        ignoreCaret: true, // ignore caret by default
      },
      () => {
        resolve();
      }
    );
  });

export default (testPath, name) => {
  let comparison = 0;

  return {
    compare: async (config) => {
      const imagePath = imgPath(testPath, name, (comparison += 1));

      if (!(await exists(imagePath))) {
        await new Chart([500, 350], { ...config, deviceScaleFactor: 5 }).save(
          imagePath
        );
        return true;
      }

      const newImage = await new Chart([500, 350], {
        ...config,
        deviceScaleFactor: 5,
      }).save();

      return new Promise((resolve) => {
        looksSame(
          imagePath,
          newImage,
          {
            antialiasingTolerance: 10,
            clusterSize: 2,
            ignoreAntialiasing: false,
            shouldCluster: true,
            tolerance: 5,
          },
          async (err, { equal }) => {
            if (!equal) {
              await makeDiff(
                imagePath,
                newImage,
                imgPath(testPath, name, `${comparison}-diff`)
              );
            }

            if (err) {
              return resolve(false);
            }
            return resolve(equal);
          }
        );
      });
    },
  };
};
