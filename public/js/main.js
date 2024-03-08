/* */

/* Truncate Card Title */
window.addEventListener("load", function () {
  truncateCardTitle();
});

function truncateCardTitle() {
  let cardList = document.getElementsByClassName("card-title");
  // console.log(cardList);
  for (let i = 0; i < cardList.length; i++) {
    let text = cardList[i].innerHTML;
    let newText = truncateString(text, 35);
    cardList[i].innerHTML = newText;
  }
}

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

function fetchData() {
  fetch(`/get-data-to-render/${userID}`) // Gửi yêu cầu GET đến máy chủ để lấy dữ liệu mới
    .then((response) => response.json())
    .then((data) => addDataToCharts(data))
    .catch((error) => console.error("Error fetching data:", error));
}

setInterval(() => {
  fetchData();
}, 15000);
