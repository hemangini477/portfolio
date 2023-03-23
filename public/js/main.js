$(document).ready(function () {
  var textLooper = setInterval(function () {
    textChange();
  }, 5000);
});

function textChange() {
  $("span").text("Hemangini Patel");
  $("span")
    .delay(2000)
    .fadeOut(1000, function () {
      $(this).text("Web Developer");
    })
    .fadeIn(1000);
}
