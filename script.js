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
    navigator.serviceWorker.register('https://secreta.github.io/Counter/service-worker.js').then(function(registration) {
      console.log('Service Worker registered successfully:', registration.scope);
    }, function(err) {
      console.log('Service Worker registration failed:', err);
    });
  });
}


let wakeLock = null;

// Function that attempts to request a screen wake lock.
const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request();
    wakeLock.addEventListener('release', () => {
      console.log('Screen Wake Lock released:', wakeLock.released);
    });
    console.log('Screen Wake Lock released:', wakeLock.released);
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
};

// Request a screen wake lock…
requestWakeLock();

const handleVisibilityChange = async () => {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    await requestWakeLock();
  }
};

document.addEventListener('visibilitychange', handleVisibilityChange);