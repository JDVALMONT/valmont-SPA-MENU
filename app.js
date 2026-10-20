const buttons = [...document.querySelectorAll('.hotspot')];
const tracks = [...document.querySelectorAll('.music-page audio')];
const status = document.querySelector('.player-status');
const statusText = document.querySelector('.status-text');
let activeIndex = -1;

function setButton(index, playing) {
  const button = buttons[index];
  button.setAttribute('aria-pressed', String(playing));
  const ritual = button.getAttribute('aria-label').replace(/ 음악 .+$/, '');
  button.setAttribute('aria-label', `${ritual} 음악 ${playing ? '일시정지' : '재생'}`);
}

function stop(index, reset = false) {
  if (index < 0) return;
  const audio = tracks[index];
  audio.pause();
  if (reset) audio.currentTime = 0;
  setButton(index, false);
}

async function play(index) {
  if (activeIndex >= 0 && activeIndex !== index) stop(activeIndex, true);
  const audio = tracks[index];
  if (audio.ended) audio.currentTime = 0;
  activeIndex = index;
  audio.volume = 1;
  try {
    await audio.play();
    setButton(index, true);
    statusText.textContent = buttons[index].dataset.title;
    status.hidden = false;
  } catch {
    setButton(index, false);
  }
}

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (tracks[index].paused) play(index);
    else {
      stop(index);
      status.hidden = true;
    }
  });

  tracks[index].addEventListener('ended', () => {
    tracks[index].currentTime = 0;
    setButton(index, false);
    if (activeIndex === index) {
      activeIndex = -1;
      status.hidden = true;
    }
  });
});
