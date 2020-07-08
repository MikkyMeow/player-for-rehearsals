let addPoint = document.querySelector('.add-point');
let minusSecond = document.querySelector('.minus-second');
let pointList = document.querySelector('.point-list');
let playBtn = document.querySelector('.play');
let pauseBtn = document.querySelector('.pause');
let stopBtn = document.querySelector('.stop');
let selectTrack = document.querySelector('.select-track');
let tracks = document.querySelectorAll('.track-item');
let trackList = document.querySelector('.track-list');
let currentTrack = document.querySelector('.current');


let audio = new Audio();

playBtn.addEventListener('click', function() {
  audio.play();
});

pauseBtn.addEventListener('click', function() {
  audio.pause();
});

stopBtn.addEventListener('click', function() {
  audio.pause();
  audio.currentTime = 0;
});

addPoint.addEventListener('click', function () {
  let li = document.createElement('li');
  li.setAttribute('class', 'point-item');
  li.innerHTML = audio.currentTime.toFixed(2);
  pointList.append(li);
});

minusSecond.addEventListener('click', function() {
  audio.currentTime -= 1;
})

pointList.addEventListener('mouseover', function() {
  let pointItem = document.querySelectorAll('.point-item');
  for (let i = 0; i < pointItem.length; i++) {
    pointItem[i].addEventListener('click', function() {
      audio.currentTime = pointItem[i].innerHTML;
    });
  }
});

selectTrack.addEventListener('click', function() {
    trackList.classList.add('active');
});

trackList.addEventListener('mouseover', function() {
  for (let i = 0; i < tracks.length; i++) {
    tracks[i].addEventListener('click', function() {
      audio.src = 'audio/' + tracks[i].innerHTML + '.mp3';
      trackList.classList.remove('active');
      currentTrack.innerHTML = tracks[i].innerHTML;
    });
  }
});
