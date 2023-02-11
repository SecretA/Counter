const counter = document.getElementById("counter");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const reset = document.getElementById("reset");

const KEY_COUNT = "KEY_COUNT";

let count = localStorage.getItem(KEY_COUNT);
if (count == null) count = 0;
setCount(count);

increase.addEventListener("click", function (e) {
  e.preventDefault();
  setCount(count + 1);
});

// decrease.addEventListener("click", function() {
//   count--;
//   counter.innerHTML = count;
// });

reset.addEventListener("click", function (e) {
  e.preventDefault();
  if (confirm("Are you sure you want to reset counter?") == true) {
    count = 0;
    setCount(0);
  }
});

function setCount(newCount) {
  count = newCount;
  counter.innerHTML = count;
  localStorage.setItem(KEY_COUNT, count);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
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