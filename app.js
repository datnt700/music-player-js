const trackBar = document.querySelector('.line-track');
const btnMain = document.querySelector('.btn.main');
const btnNext = document.querySelector('.btn.next');
const btnPrev = document.querySelector('.btn.prev');

const cover = document.querySelector('.image');
var myaudio = document.getElementsByTagName('audio')[0];
var mySecondAudio = document.getElementsByTagName('audio')[1];
var trackTime = document.querySelector('.tracktime');
const audio = document.getElementById('track');
const audioSecond = document.getElementById('track-2');
var playButton = document.querySelector('.start');
const nextButton = document.querySelector('.right');
var cur_time = myaudio.currentTime;
const audioPlayers = document.querySelectorAll('.audio-player');

let currentAudioIndex = 0;
let isPlaying = false;

const audioList = Array.from(audioPlayers);

// Khởi tạo âm thanh đầu tiên
let currentAudio = audioList[currentAudioIndex];

function playAudio(audio) {
  audioList.forEach((audioElement) => {
    if (audioElement !== audio) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  });
  if (audio.paused) {
    console.log('1', audio);

    audio.play();
    isPlaying = true;
    btnMain.querySelector('img').src = './assets/Stop.svg';
  } else {
    audio.pause();
    isPlaying = false;
    btnMain.querySelector('img').src = './assets/Play_fill.svg';
  }
  updateTrackTime(audio);
}

btnPrev.addEventListener('click', (event) => {
  event.preventDefault();
  if (currentAudioIndex > 0) {
    currentAudioIndex--;
    currentAudio = audioList[currentAudioIndex];
    playAudio(currentAudio);
    updateTrackInfo(currentAudio);
  }
});

btnNext.addEventListener('click', (event) => {
  event.preventDefault();
  if (currentAudioIndex < audioList.length - 1) {
    currentAudioIndex++;
    currentAudio = audioList[currentAudioIndex];
    playAudio(currentAudio);
    updateTrackInfo(currentAudio);
  }
});

btnMain.addEventListener('click', (event) => {
  event.preventDefault();
  playAudio(currentAudio);
});

function createTrackBar() {
  trackBar.style.flexBasis = '0%'; // Đặt giá trị ban đầu
  // Thêm sự kiện để thay đổi thời gian khi người dùng kéo thanh điều khiển
  trackBar.addEventListener('input', (event) => {
    const value = event.target.value;
    audioPlayers.forEach((audio) => {
      if (audio.dataset.name === 'audio1') {
        const duration = myaudio.duration;
        const newTime = (value / 100) * duration;
        myaudio.currentTime = newTime;
        updateTrackTime(myaudio);
      } else if (audio.dataset.name === 'audio2') {
        const duration = mySecondAudio.duration;
        const newTime = (value / 100) * duration;
        mySecondAudio.currentTime = newTime;
        updateTrackTime(mySecondAudio);
      }
    });
  });
}
updateTrackTime(track);

function updateTrackTime(track) {
  const currTimeDiv = document.querySelector('.time.current');
  const durationDiv = document.querySelector('.time.track');
  const progressPercent = (track.currentTime / track.duration) * 100;

  currTimeDiv.innerHTML = formatSecondsAsTime(track.currentTime);
  durationDiv.innerHTML = isNaN(track.duration)
    ? '00:00'
    : formatSecondsAsTime(track.duration);
  trackBar.style.flexBasis = `${progressPercent}%`;

  trackBar.addEventListener('input', (event) => {
    const value = event.target.value;
    const newTime = (value / 100) * track.duration;
    track.currentTime = newTime;
    updateTrackTime(track);
  });
}

function updateTrackInfo(audio) {
  const name = document.querySelector('.name');
  const author = document.querySelector('.author');
  if (audio.dataset.name === 'audio1') {
    name.innerHTML = 'Lost in the City Lights';
    author.innerHTML = 'Cosmo Sheldrake';
    cover.src = './assets/cover-1.png';
  } else if (audio.dataset.name === 'audio2') {
    name.innerHTML = 'Forest Lullaby';
    author.innerHTML = 'Lesfm';
    cover.src = './assets/cover-2.png';
  }
}

let count = 0;

// Cập nhật thời gian khi âm thanh thay đổi
audioList.forEach((audio) => {
  audio.addEventListener('timeupdate', () => {
    if (audio === currentAudio) {
      updateTrackTime(audio);
    }
  });
});

function formatSecondsAsTime(seconds) {
  // Chuyển đổi seconds thành số nguyên
  seconds = parseInt(seconds, 10);

  // Tính toán số phút và giây
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  // Định dạng phút và giây với số chữ số cố định
  const minutesStr = (minutes < 10 ? '0' : '') + minutes;
  const secsStr = (secs < 10 ? '0' : '') + secs;

  return `${minutesStr}:${secsStr}`;
}
