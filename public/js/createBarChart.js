const months = ["January", "February", "March"];

const bars = {
  labels: months,
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
      ],
      borderWidth: 1,
    },
  ],
};
const configuration = {
  type: "bar",
  data: bars,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
var barChart = new Chart(document.getElementById("barChart"), configuration);
