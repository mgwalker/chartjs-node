import saveChart from "./save.js";

const clone = (o) => {
  if (Array.isArray(o)) {
    return [...o];
  }
  if (typeof o === "object") {
    return { ...o };
  }
  return o;
};

const Chart = new Proxy(Object, {
  construct: (_, [[width, height], ...constructorArgs]) => {
    const cArgs = [...constructorArgs];
    if (cArgs.length > 0) {
      const opts = cArgs[0].options ?? {};

      // Disable animations. We're rendering static images, so they'll just mess
      // up the draw timing.
      opts.animation = false;

      if (!opts.plugins) {
        opts.plugins = {};
      }

      // The datalabels plugin will add labels by default. Make them opt-in by
      // disabling the plugin globally if the user hasn't set a global config.
      if (!opts.plugins.datalabels) {
        opts.plugins.datalabels = { labels: { title: null } };
      }

      if (!opts.backgroundColor) {
        opts.backgroundColor = "white";
      }

      cArgs[0].options = opts;
    }

    // These arguments will get passed into the browser context, so they need
    // to be converted into strings that will be eval'd (basically) over there.
    // Also preserve functions, though they can't reference any external scope.
    const processArgs = (args) => {
      const fnStrings = [];
      const copy = clone(args);

      const removeFns = (obj) => {
        if (Array.isArray(obj)) {
          obj.forEach((o) => {
            removeFns(o);
          });
        } else if (typeof obj === "object" && !!obj) {
          Object.entries(obj).forEach(([key, value]) => {
            // For functions, stringify them and replace them with placeholder
            // tokens in the argument object
            if (typeof value === "function") {
              fnStrings.push(
                value
                  .toString()
                  .split("\n")
                  .map((l) => l.trim())
                  .join("")
              );

              // eslint-disable-next-line no-param-reassign
              obj[key] = `%FN${fnStrings.length - 1}%`;
            } else if (typeof value === "object" || Array.isArray(value)) {
              removeFns(value);
            }
          });
        }
      };

      removeFns(copy);

      // Smoosh all the arguments together, and replace the function
      // placeholders with the stringy version of the real function. Then it can
      // be evaluated in the browser. Yay!
      return copy
        .map((a) => JSON.stringify(a))
        .map((a) => a.replace(/"%FN(\d+)%"/gi, (_, i) => fnStrings[+i]))
        .join(",");
    };

    // Build up a list of chained commands. I don't think Chart.js has any
    // built-in command chains, but I guess plugins could add some. In any case,
    // let's just pretend like it does and we'll roll with it. The first command
    // is the Chart constructor. Because we control the rendering context, we
    // know the hardcoded context name is "ctx". Pass the rest of the arguments
    // in as the config/data to the chart.
    const commandChain = [`new Chart(ctx, ${processArgs(cArgs)})`];

    // Self is a proxy for the Chart object. This way we can intercept all
    // getters to build up the command chain.
    const self = new Proxy(Object, {
      get: (_, p) => {
        // If the user calls save(), then it's time for the good stuff. Now we
        // build the complete set of code to be evaluated in the browser
        // context. This includes creating the canvas, running the code we built
        // from user commands, and exporting the resulting chart as a data URL.
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
            const saveOpts = { cmd, height, path, width };
            if (cArgs?.[0].deviceScaleFactor) {
              saveOpts.deviceScaleFactor = cArgs[0].deviceScaleFactor;
            }

            return saveChart(saveOpts);
          };
        }

        // For everything else, push this command on to the command chain and
        // return the proxy self.
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
