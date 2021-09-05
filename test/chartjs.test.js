import assert from "assert";

export default {
  "renders a plain line chart": async (compare) => {
    const config = {
      type: "line",
      data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            label: "# of Votes",
            data: [1, 7, 3, 2, 8, 6, 9, 3, 4, 7],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    assert.ok(await compare(config));
  },

  "renders a plain line chart with a blue background": async (compare) => {
    const config = {
      type: "line",
      data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            label: "# of Votes",
            data: [1, 7, 3, 2, 8, 6, 9, 3, 4, 7],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        backgroundColor: "rgb(192, 192, 255)",
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    assert.ok(await compare(config));
  },

  "renders a plain bar chart": async (compare) => {
    const config = {
      type: "bar",
      data: {
        labels: ["A", "B", "C", "D", "E", "F", "G"],
        datasets: [
          {
            label: "My First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: (context) =>
              [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ][context.dataIndex],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
      },
    };

    assert.ok(await compare(config));
  },

  "renders a plain radar chart": async (compare) => {
    const config = {
      type: "radar",
      data: {
        labels: [
          "Eating",
          "Drinking",
          "Sleeping",
          "Designing",
          "Coding",
          "Cycling",
          "Running",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [65, 59, 90, 81, 56, 55, 40],
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
          {
            label: "My Second Dataset",
            data: [28, 48, 40, 19, 96, 27, 100],
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            pointBackgroundColor: "rgb(54, 162, 235)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(54, 162, 235)",
          },
        ],
      },
      options: {
        elements: {
          line: {
            borderWidth: 3,
          },
        },
      },
    };

    assert.ok(await compare(config));
  },

  "renders a plain doughnut chart": async (compare) => {
    const config = {
      type: "doughnut",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    };

    assert.ok(await compare(config));
  },

  "renders a plain pie chart": async (compare) => {
    const config = {
      type: "pie",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    };

    assert.ok(await compare(config));
  },

  "renders a plain polar area chart": async (compare) => {
    const config = {
      type: "polarArea",
      data: {
        labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
        datasets: [
          {
            label: "My First Dataset",
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(201, 203, 207)",
              "rgb(54, 162, 235)",
            ],
          },
        ],
      },
    };

    assert.ok(await compare(config));
  },

  "renders a plain bubble chart": async (compare) => {
    const config = {
      type: "bubble",
      data: {
        datasets: [
          {
            label: "First Dataset",
            data: [
              {
                x: 20,
                y: 30,
                r: 15,
              },
              {
                x: 40,
                y: 10,
                r: 10,
              },
            ],
            backgroundColor: "rgb(255, 99, 132)",
          },
        ],
      },
    };

    assert.ok(await compare(config));
  },

  "renders a plain scatter chart": async (compare) => {
    const config = {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Scatter Dataset",
            data: [
              {
                x: -10,
                y: 0,
              },
              {
                x: 0,
                y: 10,
              },
              {
                x: 10,
                y: 5,
              },
              {
                x: 0.5,
                y: 5.5,
              },
            ],
            backgroundColor: "rgb(255, 99, 132)",
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
          },
        },
      },
    };

    assert.ok(await compare(config));
  },

  "renders a plain area chart": async (compare) => {
    const config = {
      type: "line",
      data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            label: "# of Votes",
            data: [1, 7, 3, 2, 8, 6, 9, 3, 4, 7],
            backgroundColor: "rgba(0,0,255,0.3)",
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
            fill: "start",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    assert.ok(await compare(config));
  },

  "renders a plain mixed chart": async (compare) => {
    const config = {
      data: {
        datasets: [
          {
            type: "bar",
            label: "Bar Dataset",
            data: [10, 20, 30, 40],
            backgroundColor: [
              "rgba(255,0,0,0.2)",
              "rgba(0,255,0,0.2)",
              "rgba(0,0,255,0.2)",
              "rgba(255,255,0,0.2)",
            ],
            borderColor: ["red", "green", "blue", "yellow"],
            borderWidth: 3,
          },
          {
            type: "line",
            label: "Line Dataset",
            data: [12, 37, 30, 27],
            borderColor: "black",
            borderWidth: 8,
          },
        ],
        labels: ["January", "February", "March", "April"],
      },
    };

    assert.ok(await compare(config));
  },
};
