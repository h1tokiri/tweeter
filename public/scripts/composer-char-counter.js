$(document).ready(function() {
// code here
  console.log("Composer char counter script loaded!");

  // register an event listener for the textarea
  $("#tweet-text").on("input", function () {
    // get the current input length
    const inputLength = $(this).val().length;

    //calculate the remaining characters
    const remainingChars = 140 - inputLength;

    //update the counter value
    const counter = $(this).closest(".new-tweet").find(".counter");
    counter.text(remainingChars);

    //add a class to make the counter red if invalid, or remove it if valid
    if (remainingChars < 0) {
      counter.addClass("invalid");
    } else {
      counter.removeClass("invalid");
    }
  });
});