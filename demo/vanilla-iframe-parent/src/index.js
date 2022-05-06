/* /!\ WARNING: in this sandbox example, the domain CORS
 *      security limitation block the communication
 *      beetween the parent view and the iframe.
 * (?) FOR COMPLETE TEST:
 *      export project to zip and launch it with npm start
 */
document.addEventListener("DOMContentLoaded", function () {
  const messageEle = document.getElementById("message");
  /* You have to listen the iframe messages
   *    (who named "message" in this example)
   *    for receiving the response of the iframe process
   */
  window.addEventListener("message", function (e) {
    const data = JSON.parse(e.data);
    const date = new Date(data.date).toLocaleTimeString("en-US");
    messageEle.innerHTML =
      `Receive "${data.message}" at ${date}<br>` + messageEle.innerHTML;
  });
});
