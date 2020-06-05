// https://www.webredone.com/
const canvas = document.querySelector('.graph'),
      ctx = canvas.getContext('2d'),
      inputPoints = document.getElementById('points'),
      inputSpeed  = document.getElementById('speed'),
      resetMultip = document.getElementById('reset'),
      plusTen = document.getElementById('plusTen'),
      plusOne = document.getElementById('plusOne'),
      rangeLabels = document.querySelectorAll('.slideContainer h4');

rangeLabels.forEach((label) => {
  const word = [...label.textContent];
  label.innerHTML = '';
  word.forEach((letter) => {
    const spannedLetter = document.createElement('span');
    spannedLetter.textContent = letter;
    label.appendChild(spannedLetter);
  });
});

const mValue = value => {
  document.getElementById('mValue').textContent = value;
}

const dist = (x1, y1, x2, y2) => {
  let xDist = x2 - x1;
  let yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

const map = (value, minA, maxA, minB, maxB) => {
  return (1 - (value - minA) / (maxA - minA)) * minB + (value - minA) / (maxA - minA) * maxB;
}

let size = {
  s: 8,
  w: 60,
  h: 60,
  o: 1
};

size.sw = size.w * size.s;
size.sh = size.h * size.s;

size.mw = Math.floor(size.sw / 2);
size.mh = Math.floor(size.sh / 2);

size.lw = size.sw - size.s;
size.lh = size.sh - size.s;

canvas.width  = size.sw;
canvas.height = size.sh;

let pi2 = Math.PI * 2;
let m = 1;
let drawGraph = function drawGraph() {
  let root = document.documentElement;
  let n = inputPoints.value;
  
  m >= 999 ? m = 0 : m += +inputSpeed.value;
 
  let r = Math.floor((size.w - 2 * size.o) * size.s * .5);

  rect({ x: 0, y: 0, w: size.sw, h: size.sh }, '#222');
  circle({ x: size.mw, y: size.mh, r: r }, '#333');

  let x, y, e, ex, ey, start, end, lineL, a, h;
  for (let i = 0; i < n; i++) {
    x = Math.sin(pi2 / n * i - pi2 * .25) * r;
    y = Math.sin(pi2 / n * i) * r; 
    e = m * i;
    ex = Math.sin(pi2 / n * e - pi2 * .25) * r;
    ey = Math.sin(pi2 / n * e) * r;
    let Xw  = size.mw + x;
    let Yh  = size.mh + y;
    let eXw = size.mw + ex;
    let eYh = size.mh + ey;
    start = { x: Xw, y: Yh };
    end = { x: eXw, y: eYh };
    lineL = dist( Xw, Yh, eXw, eYh );
    a = map(lineL, 0, 400, 1, 0.25);
    a = (a > 1 ? 1 : a).toFixed(2);
    h = m * 100 % 360;
    circle({ x: Xw, y: Yh, r: 2 }, '#fff');
    line(start, end, `hsla(${h}, 100%, 85%, ${a})`);
  }
  
  let parsM = parseFloat(Math.round(m * 100) / 100).toFixed(2);
  mValue(parsM);
  Hsl = ( + m * 100 % 360 );
  root.style.setProperty('--Hsl', Hsl);
  
  requestAnimationFrame(drawGraph);
};

const rect = (r, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(r.x, r.y, r.w, r.h);
};

const line = (s, e, color) => {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(s.x, s.y);
  ctx.lineTo(e.x, e.y);
  ctx.stroke();
};

const circle = (c, color) => {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.r, 0, pi2);
  ctx.stroke();
};

const patterns = value => {
  m = value;
  inputSpeed.value  = 0;
  inputPoints.value = 200;
};

window.addEventListener('load', drawGraph);

document.querySelectorAll('.controlBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const btnValue = btn.getAttribute('data-value');
    btnValue == 0 ? m = 0 : m += +btnValue;
  });
});