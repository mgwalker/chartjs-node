import assert from "assert";

export default {
  "renders a line chart with data labels": async (compare) => {
    const config = {
      type: "line",
      data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            data: [1, 7, 3, 2, 8, 6, 9, 3, 4, 7],
            borderColor: "red",
            borderWidth: 1,
            datalabels: {
              align: "start",
              anchor: "start",
            },
          },
        ],
      },
      options: { plugins: { datalabels: { color: "orange" } } },
    };

    assert.ok(await compare(config));
  },
};
