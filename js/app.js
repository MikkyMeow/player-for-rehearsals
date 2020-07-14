let audio = document.querySelector('.audio')

// //audio controls
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

//select track
let trackSrc = document.querySelectorAll('.track-name')
let currentTrack = document.querySelector('.current')
let trackDuration = document.querySelectorAll('.track-duration')
let tracksArray = [];
let trackCount;

if (localStorage.length === 0) {
  fillTracksArray();
} else {
  tracksArray = JSON.parse(localStorage.getItem('tracks'))
}

for (let i = 0; i < trackSrc.length; i++) {

  trackSrc[i].addEventListener('click', function() {
    if(trackSrc[i].innerHTML !== currentTrack.innerHTML) {
      removeBreakpointsList();
    }
    
    for (let j = 0; j < tracksArray[i].points.length; j++) {
      if(trackSrc[i].innerHTML === currentTrack.innerHTML) {
        return;
      } else {
        let li = document.createElement('li')
        li.setAttribute('class', 'point-item')
        li.setAttribute('data-time', tracksArray[i].points[j])
        li.innerHTML = convertTime(tracksArray[i].points[j])
        pointList.append(li)
      }
    }

    audio.src = tracksArray[i].track
    trackCount = i
    currentTrack.innerHTML = trackSrc[i].innerHTML
    addPoint.removeAttribute('disabled')
    audio.play()
  })
}

function fillTracksArray() {
  for (let i = 0; i < trackSrc.length; i++) {
    tracksArray[i] = {
      track: trackSrc[i].dataset.src,
      points: []
    }
  }
}

function removeBreakpointsList() {
  while (pointList.firstChild) {
    pointList.removeChild(pointList.firstChild)
  }
}

//change lists between .window-menu items
let menuBtn = document.querySelectorAll('.menu-btn')
let infoList = document.querySelectorAll('.list')

for(let i = 0; i < menuBtn.length; i++) {
  menuBtn[i].addEventListener('click', function() {
    for(let i = 0; i < menuBtn.length; i++) {
      menuBtn[i].classList.remove('active')
      infoList[i].classList.remove('active')
    }
    menuBtn[i].classList.add('active')
    infoList[i].classList.add('active')
  })
}

//adding breakpoints
let addPoint = document.querySelector('.add-point')
let pointList = document.querySelector('.point-list')


addPoint.addEventListener('click', function() {
  tracksArray[trackCount].points.push(audio.currentTime)
  
  let serialArr = JSON.stringify(tracksArray);
  localStorage.setItem('tracks', serialArr);
    
  let li = document.createElement('li')
  li.setAttribute('class', 'point-item')
  li.setAttribute('data-time', audio.currentTime)
  li.innerHTML = convertTime(audio.currentTime)
  pointList.append(li)
})

pointList.addEventListener('mouseover', function() {
  let pointItem = document.querySelectorAll('.point-item');
  for (let i = 0; i < pointItem.length; i++) {
    pointItem[i].addEventListener('click', function() {
      audio.currentTime = pointItem[i].dataset.time;
    });
  }
}); 

//localStorage clean
let lsClean = document.querySelector('.localstorage-clean')

lsClean.addEventListener('click', function() {
  localStorage.clear();
  fillTracksArray();
  removeBreakpointsList();
  alert('Локальное хранилище очищено.')
})

//speed controls
let speedControl = document.querySelectorAll('.speed-control')
let showInfo = document.querySelector('.speed-info')

speedControl[0].addEventListener('click', function() {
  audio.playbackRate -= .05;
  showInfo.innerHTML = audio.playbackRate.toFixed(2) + 'x';
})

speedControl[1].addEventListener('click', function() {
  audio.playbackRate = 1;
  showInfo.innerHTML = audio.playbackRate.toFixed(2) + 'x';
})

speedControl[2].addEventListener('click', function() {
  audio.playbackRate += .05;
  showInfo.innerHTML = audio.playbackRate.toFixed(2) + 'x';
})

//controls btn
let controlsBtn = document.querySelectorAll('.controls-btn')
let controlLists = document.querySelectorAll('.controls-block')

for (let i = 0; i < controlsBtn.length; i++) {
  controlsBtn[i].addEventListener('click', function() {
    controlLists[i].classList.toggle('active')
  })
}
