
const app = document.getElementById('app');
const label = document.getElementById('label');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

let timer;
let startTime;

startButton.addEventListener('click', async () => {
  if (timer) {
    return;
  }

  startTime = new Date();

  await new Promise(resolve => {
    timer = setInterval(() => {
      resolve();
    }, 1000);
  });

  while (timer) {
    const currentTime = new Date();
    const elapsedTime = currentTime - startTime;

    label.textContent = formatTime(elapsedTime);

    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
  }
});

stopButton.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
});

resetButton.addEventListener('click', () => {
  startTime = null;
  label.textContent = '00:00:00';
});

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const formattedSeconds = seconds % 60;
  const formattedMinutes = minutes % 60;
  const formattedHours = hours % 60;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
