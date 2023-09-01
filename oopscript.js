function main() {
  const canvas = document.querySelector(".myCanvas");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);
  const ctx = canvas.getContext("2d");
  for (let i = 10; i <= width; i += 150) {
    objs[i] = new Pendulum(i, 0, Math.floor(Math.random() * 100) + 50);
  }

  document.body.addEventListener("mousedown", onMouseDown);

  function onMouseUp(event) {
    for (let i = 10; i <= width; i += 150) {
      objs[i].stopDragging(stopMusic);
    }

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(event) {
    for (let i = 10; i <= width; i += 150) {
      objs[i].clicked(event.clientX, event.clientY, playMusic);
    }
  }

  function onMouseDown(event) {
    document.body.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);

    // move the ball on mousemove
  }

  function playMusic() {
    music.play();
  }

  function stopMusic() {
    music.pause();
    music.currentTime = 0;
  }

  animate(ctx, width, height);
}
for (let i = 10; i <= window.innerWidth; i += 150) {
  var objs = new Array();
}
var music = new Audio("christmas.mp3");

function drawcircle(x2, y2, ctx) {
  ctx.beginPath();
  ctx.arc(x2, y2 + 60, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(252, 172, 0)";
  ctx.fill();
  ctx.closePath();
}

function drawTriangle(x2, y2, ctx) {
  let height = y2 * Math.cos(Math.PI / 6);

  ctx.beginPath();
  ctx.moveTo(x2 - 10, y2 + 50);
  ctx.lineTo(x2 + 10, y2 + 50);
  ctx.lineTo(x2, y2 + 40);

  ctx.moveTo(x2 - 10, y2 + 60);
  ctx.lineTo(x2 + 10, y2 + 60);
  ctx.lineTo(x2, y2 + 50);

  ctx.moveTo(x2 - 10, y2 + 70);
  ctx.lineTo(x2 + 10, y2 + 70);
  ctx.lineTo(x2, y2 + 60);

  ctx.closePath();

  // the outline
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#7CA621";
  ctx.stroke();

  // the fill color
  ctx.fillStyle = "#7CA621";
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = "#420000";
  ctx.fill();
  ctx.fillRect(x2 - 3, y2 + 71, 6, 12);
}

function drawCharacter(x2, y2, ctx, chr) {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = "bold 48px Arial";
  ctx.fillText(chr, x2 - 20, length + 80);
  ctx.closePath();
}

function animate(ctx, width, height) {
  for (let i = 10; i <= width; i += 150) {
    objs[i].update();
    objs[i].drag();
    if (i % 4 === 0) objs[i].show(ctx, drawcircle);
    else objs[i].show(ctx, drawTriangle);
  }

  //drawBauble(150, 0, angle);

  requestAnimationFrame(function () {
    //angle += 0.01;
    ctx.clearRect(0, 0, width, height);
    animate(ctx, width, height);
  });
}

window.onload = main;
