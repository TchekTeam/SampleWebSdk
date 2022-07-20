import "./styles.css";

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("message", function (e) {
    const data = JSON.parse(e.data);
    const date = new Date(data.date).toLocaleTimeString("en-US");
    const messageEle = document.getElementById('message');
    messageEle.innerHTML = `Receive "${data.message}" at ${date}<br>` + messageEle.innerHTML;
    console.log(data);
  });
});
