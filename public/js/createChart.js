let labels = [];
let spend = [];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: spend,
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(102, 255, 178)",
        "rgb(102, 255, 102)",
        "rgb(255, 205, 86)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const config = {
  type: "doughnut",
  label: "Monthly Spend",
  data: data,
  options: {},
};

const getSubs = async () => {
  const response = await fetch("/api/subscription");
  const subData = await response.json();
  if (response.ok) {
    const subs = subData.data.subscriptions;
    console.log(subs);
    subs.map((sub) => labels.push(sub.subscription_name));
    console.log(labels);
    subs.map((sub) => spend.push(sub.spend));
  }
};

const myChart = new Chart(document.getElementById("myChart"), config);

function addData(chart, labels, spend) {
  chart.data.datasets[0].data.push(spend);
  chart.update();
}

async function preAdd() {
  const spend = await getSubs();
  addData(myChart, labels, spend);
}
preAdd();
