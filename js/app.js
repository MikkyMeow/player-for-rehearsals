let audio = document.querySelector('.audio');
let addPoint = document.querySelector('.add-point');
let minusSecond = document.querySelector('.minus-second');
let pointList = document.querySelector('.point-list');
let breakpoints = [];

addPoint.addEventListener('click', function () {
  breakpoints.push(audio.currentTime);
  let li = document.createElement('li');
  li.setAttribute('class', 'point-item');
  li.innerHTML = audio.currentTime;
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