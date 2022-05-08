document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("message", function (e) {
    const data = JSON.parse(e.data);
    console.log(data);
  });
});
