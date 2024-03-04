const chart1 = document.getElementById("myChart1");
const chart2 = document.getElementById("myChart2");
const chart3 = document.getElementById("myChart3");
const chart4 = document.getElementById("myChart4");

const labels = emissionData.labels;
console.log(labels);
console.log(emissionData);

new Chart(chart1, {
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

new Chart(chart2, {
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

new Chart(chart3, {
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

new Chart(chart4, {
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