const buttons = [...document.querySelectorAll('.hotspot')];
const tracks = [...document.querySelectorAll('.music-page audio')];
const status = document.querySelector('.player-status');
const statusText = document.querySelector('.status-text');
const musicPage = document.querySelector('.music-page');
const markerCopy = document.querySelector('.marker-copy');
const markerTrigger = document.querySelector('.marker-trigger');
const markerPaths = [...document.querySelectorAll('.marker-line')];
const guideModal = document.querySelector('.guide-modal');
const guideClose = document.querySelector('.guide-close');
let activeIndex = -1;
let guideShown = false;
let highlightInView = false;
let playRequest = 0;

function prepareMarkerPaths() {
  markerPaths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.setProperty('--path-length', `${length}px`);
    path.style.strokeDasharray = `${length} ${length}`;
  });
}

function playMarkerReveal() {
  markerCopy.classList.remove('resetting');
  markerCopy.classList.remove('active');
  void markerCopy.offsetWidth;
  markerCopy.classList.add('active');
}

function resetMarkerReveal() {
  markerCopy.classList.add('resetting');
  markerCopy.classList.remove('active');
  requestAnimationFrame(() => markerCopy.classList.remove('resetting'));
}

function closeGuide() {
  guideModal.classList.remove('is-visible');
  document.body.classList.remove('modal-open');
  window.setTimeout(() => {
    guideModal.hidden = true;
    if (highlightInView) playMarkerReveal();
  }, 420);
}

function openGuide() {
  if (guideShown) return;
  guideShown = true;
  guideModal.hidden = false;
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      guideModal.classList.add('is-visible');
      guideClose.focus({ preventScroll: true });
    });
  });
}

const menuObserver = new IntersectionObserver((entries, observer) => {
  if (entries.some((entry) => entry.isIntersecting)) {
    openGuide();
    observer.disconnect();
  }
}, { threshold: 0.28 });

menuObserver.observe(musicPage);

const highlightObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    highlightInView = entry.isIntersecting && entry.intersectionRatio >= 0.5;

    if (!highlightInView) {
      resetMarkerReveal();
      return;
    }

    if (guideModal.hidden) playMarkerReveal();
  });
}, { threshold: [0, 0.5] });

highlightObserver.observe(markerTrigger);
prepareMarkerPaths();
guideClose.addEventListener('click', closeGuide);
guideModal.addEventListener('click', (event) => {
  if (event.target === guideModal) closeGuide();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !guideModal.hidden) closeGuide();
});

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
  if (activeIndex === index && reset) activeIndex = -1;
}

async function play(index) {
  const request = ++playRequest;
  tracks.forEach((_, trackIndex) => {
    if (trackIndex !== index) stop(trackIndex, true);
  });
  const audio = tracks[index];
  if (audio.ended) audio.currentTime = 0;
  activeIndex = index;
  audio.volume = 1;
  try {
    await audio.play();
    if (request !== playRequest) {
      stop(index, true);
      return;
    }
    setButton(index, true);
    statusText.textContent = buttons[index].dataset.title;
    status.hidden = false;
  } catch {
    setButton(index, false);
  }
}

buttons.forEach((button, index) => {
  button.addEventListener('pointerdown', () => {
    button.classList.remove('is-pressing');
    requestAnimationFrame(() => button.classList.add('is-pressing'));
    window.setTimeout(() => button.classList.remove('is-pressing'), 850);
  });

  button.addEventListener('click', () => {
    if (tracks[index].paused) play(index);
    else {
      playRequest += 1;
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

window.addEventListener('pagehide', () => {
  playRequest += 1;
  tracks.forEach((_, index) => stop(index, true));
});
