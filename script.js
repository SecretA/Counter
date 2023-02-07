const counter = document.getElementById("counter");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const reset = document.getElementById("reset");

let count = 0;

increase.addEventListener("click", function() {
  count++;
  counter.innerHTML = count;
});

// decrease.addEventListener("click", function() {
//   count--;
//   counter.innerHTML = count;
// });

reset.addEventListener("click", function() {
  count = 0;
  counter.innerHTML = count;
});