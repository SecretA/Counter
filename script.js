const counter = document.getElementById("counter");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const reset = document.getElementById("reset");

let count = 0;

increase.addEventListener("click", function (e) {
  e.preventDefault();
  count++;
  counter.innerHTML = count;
});

// decrease.addEventListener("click", function() {
//   count--;
//   counter.innerHTML = count;
// });

reset.addEventListener("click", function (e) {
  e.preventDefault();
  if (confirm("Are you sure you want to reset counter?") == true) {
    count = 0;
    counter.innerHTML = count;
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log('Service Worker registered successfully:', registration.scope);
    }, function(err) {
      console.log('Service Worker registration failed:', err);
    });
  });
}