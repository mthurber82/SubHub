let apps = [];
let usage = [];
const bars = {
  labels: apps,
  datasets: [
    {
      label: "Hrs/Week",
      data: [2, 24, 30, 1],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgb(54, 162, 235, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgb(54, 162, 235, 0.2)",
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

const getSpend = async () => {
  const response = await fetch("/api/subscription");
  const subData = await response.json();
  console.log(subData);
  if (response.ok) {
    const subs = subData.data.subscriptions;
    console.log(subs);
    subs.map((sub) => apps.push(sub.subscription_name));
    subs.map((sub) => usage.push(sub.usage));
    console.log(usage);
  }
};

var barChart = new Chart(document.getElementById("barChart"), configuration);
console.log(barChart);
function addD(chart, labels, usage) {
  chart.data.datasets[0].data.push(usage);
  chart.update();
}

async function preAddition() {
  const usage = await getSpend();
  addD(barChart, labels, usage);
}
preAddition();
