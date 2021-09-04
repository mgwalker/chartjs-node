import saveChart from "./save.js";

const Chart = new Proxy(Object, {
  construct: (_, [[width, height], ...constructorArgs]) => {
    if (constructorArgs.length > 0) {
      // eslint-disable-next-line no-param-reassign
      constructorArgs[0].options.animation = false;
    }

    const processArgs = (args) => args.map((a) => JSON.stringify(a)).join(",");

    const commandChain = [`new Chart(ctx, ${processArgs(constructorArgs)})`];

    const self = new Proxy(Object, {
      get: (_, p) => {
        if (p === "save") {
          return async (path) => {
            const cmd = `
(async () => {
  canvas.setAttribute("width", ${width});
  canvas.setAttribute("height", ${height});
  const ctx = canvas.getContext("2d");

  await tick();

  ${commandChain.join(".")};

  await tick();

  return canvas.toDataURL();
})();
`;
            return saveChart(cmd, path);
          };
        }

        return (...args) => {
          commandChain.push(`${p}(${processArgs(args)})`);
          return self;
        };
      },
    });

    return self;
  },
});

export default Chart;
