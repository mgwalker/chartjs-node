import assert from "assert";

export default {
  "renders a line chart with annotations": async (compare) => {
    const config = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        plugins: {
          annotation: {
            annotations: {
              box: {
                // Indicates the type of annotation
                type: "box",
                xMin: 1,
                xMax: 2,
                yMin: 50,
                yMax: 70,
                backgroundColor: "rgba(255, 99, 132, 0.25)",
              },
              ellipse: {
                type: "ellipse",
                xMin: 2,
                xMax: 3,
                yMin: 70,
                yMax: 90,
                backgroundColor: "rgba(99, 255, 132, 0.25)",
              },
              line: {
                type: "line",
                yMin: 60,
                yMax: 60,
                borderColor: () => "rgb(255, 99, 132)",
                borderWidth: 2,
              },
              point: {
                type: "point",
                xValue: 1.75,
                yValue: 75,
                backgroundColor: "rgba(132, 99, 255, 0.25)",
              },
            },
          },
        },
      },
    };

    assert.ok(await compare(config));
  },
};
