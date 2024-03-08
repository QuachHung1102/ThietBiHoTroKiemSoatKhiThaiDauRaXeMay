const chartDoom1 = document.getElementById("myChart1");
const chartDoom2 = document.getElementById("myChart2");
const chartDoom3 = document.getElementById("myChart3");
const chartDoom4 = document.getElementById("myChart4");

let labels = emissionData.labels;

//save these to varialble like let chartName1 = new Chart ...
const chart1 = new Chart(chartDoom1, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Nhiệt độ",
        data: emissionData.emissions[0].data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Màu đỏ
          // "rgba(54, 162, 235, 0.2)", // Màu xanh dương
          // "rgba(255, 206, 86, 0.2)", // Màu vàng
          // "rgba(75, 192, 192, 0.2)", // Màu xanh lá cây
          // "rgba(153, 102, 255, 0.2)", // Màu tím
          // "rgba(255, 159, 64, 0.2)", // Màu cam
        ],
        borderColor: [
          "#FF0000", // Màu đỏ
          // 'rgba(54, 162, 235, 1)',     // Màu xanh dương
          // 'rgba(255, 206, 86, 1)',     // Màu vàng
          // 'rgba(75, 192, 192, 1)',     // Màu xanh lá cây
          // 'rgba(153, 102, 255, 1)',    // Màu tím
          // 'rgba(255, 159, 64, 1)'      // Màu cam
        ],
        borderWidth: 1,
      },
      {
        label: "Độ ẩm",
        data: emissionData.emissions[1].data,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)", // Màu xanh dương
        ],
        borderColor: [
          "#0000FF", // Màu xanh
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        // beginAtZero: true,
      },
    },
  },
});

const chart2 = new Chart(chartDoom2, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "CO",
        data: emissionData.emissions[2].data,
        backgroundColor: [
          "rgba(153, 102, 255, 0.2)", // Màu tím
        ],
        borderColor: ["#800080"],
        borderWidth: 1,
      },
      {
        label: "SO2",
        data: emissionData.emissions[3].data,
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", // Màu xanh lá cây
        ],
        borderColor: ["#068205"],
        borderWidth: 1,
      },
      {
        label: "LPG",
        data: emissionData.emissions[4].data,
        backgroundColor: ["rgba(255, 159, 64, 0.2)"],
        borderColor: ["orange"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        // beginAtZero: true,
      },
    },
  },
});

const chart3 = new Chart(chartDoom3, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "PM 2.5",
        data: emissionData.emissions[5].data,
        backgroundColor: [
          "rgba(255, 206, 86, 0.2)", // Màu vàng
        ],
        borderColor: [
          "#FFA500", // Màu vàng
        ],
        borderWidth: 1,
      },
      {
        label: "PM 1.0",
        data: emissionData.emissions[6].data,
        backgroundColor: [
          "rgba(153, 102, 255, 0.2)", // Màu tím
        ],
        borderColor: ["#800080"],
        borderWidth: 1,
      },
      {
        label: "PM 10",
        data: emissionData.emissions[7].data,
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", // Màu xanh lá cây
        ],
        borderColor: ["#008000"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        // beginAtZero: true,
      },
    },
  },
});

const chart4 = new Chart(chartDoom4, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "CO2",
        data: emissionData.emissions[8].data,
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)", // Màu cam
        ],
        borderColor: [
          "#FFA500", // Màu cam
        ],
        borderWidth: 1,
      },
      {
        label: "NO",
        data: emissionData.emissions[9].data,
        backgroundColor: ["rgba(255, 192, 203, 0.2)"],
        borderColor: ["#FF00FF"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        // beginAtZero: true,
      },
    },
  },
});

// Vậy sẽ tách object ra thành 4 mảng để dễ dàng thao tác.

const random1and100 = (x, y) => {
  return Math.trunc(Math.random() * 100);
};

// Data nhận được sẽ có dạng sau

function addData(chart, newData) {
  let i = 0;
  chart.data.datasets.forEach((dataset) => {
    dataset.data.shift();
    dataset.data.push(newData[i++]);
  });
  chart.update();
}
function changeLabels(label) {
  chart1.data.labels.shift();
  chart1.data.labels.push(label);
  // Ko hiểu sao nhưng update labels cho 1 chart thì nó update cho cả 4
  chart1.update();
  chart2.update();
  chart3.update();
  chart4.update();
}
function addDataToCharts(data) {
  if (data.alert == "1") {
    alert(`Xe đang gặp sự cố!`);
  }
  let labelUpdate = data.label;
  // let data1 = [random1and100(), random1and100()];
  let data1 = data.emissions.slice(0, 2);
  // let data2 = [random1and100(), random1and100(), random1and100()];
  let data2 = data.emissions.slice(2, 5);
  // let data3 = [random1and100(), random1and100(), random1and100()];
  let data3 = data.emissions.slice(5, 8);
  // let data4 = [random1and100(), random1and100()];
  let data4 = data.emissions.slice(8, 10);

  addData(chart1, data1);
  addData(chart2, data2);
  addData(chart3, data3);
  addData(chart4, data4);
  changeLabels(labelUpdate);
}

