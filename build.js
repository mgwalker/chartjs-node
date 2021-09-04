import ChartJS from "./dist/chart.js";

(async () => {
  const data = [
    { x: 0, y: 1 },
    { x: 1, y: 7 },
    { x: 2, y: 3 },
    { x: 3, y: 2 },
    { x: 4, y: 8 },
    { x: 5, y: 6 },
    { x: 6, y: 9 },
    { x: 7, y: 3 },
    { x: 8, y: 4 },
    { x: 9, y: 7 },
  ];

  const c = new ChartJS([1200, 400], {
    type: "line",
    data: {
      labels: data.map(({ x }) => x),
      datasets: [
        {
          label: "# of Votes",
          data: data.map(({ y }) => y),
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
      canvasBackgroundColor: "white",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  await c.save("f.png");
})();
