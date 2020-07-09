let audio = new Audio()
audio.src = 'audio/SMG - No Sleep Till Hell.mp3'

//audio controls
document.querySelector('.play').addEventListener('click', function() {
  audio.play()
})
document.querySelector('.pause').addEventListener('click', function() {
  audio.pause()
})
document.querySelector('.stop').addEventListener('click', function() {
  audio.pause()
  audio.currentTime = 0
})

//rewind controls
let rewindBtn = document.querySelectorAll('.rewind-control');

for(let i = 0; i < rewindBtn.length; i++) {
  rewindBtn[i].addEventListener('click', function() {
    let btnVar = rewindBtn[i].innerHTML.substring(0, rewindBtn[i].innerHTML.length - 1)
    audio.currentTime += parseInt(btnVar);
  })
}

//audio range
audio.addEventListener('loadedmetadata', function() {
  let currentSeconds = document.querySelector('.current-seconds')
  let duration = document.querySelector('.duration')
  let rangeControl = document.querySelector('.range-control')

  audio.addEventListener('timeupdate', function() {
    currentSeconds.innerHTML = convertTime(audio.currentTime)
    rangeControl.style.width = audio.currentTime / audio.duration * 100 + '%';
  })
  duration.innerHTML = convertTime(audio.duration)
  
})

//convert seconds to date
let convertTime = function(sec) {
  let date = new Date(null)
  date.setSeconds(Math.round(sec))
  return date.toISOString().substr(14, 5)
}
