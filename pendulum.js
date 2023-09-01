class Pendulum {
  constructor(x1, y1, r) {
    this.length = r;
    this.angle = Math.PI / 36;
    this.angleV = 0.0;
    this.angleA = 0.01;
    this.x2 = 0;
    this.y2 = 0;
    this.x1 = x1;
    this.y1 = y1;
    this.mx = 0;
    this.my = 0;
    this.dragging = false;
  }

  update() {
    let gravity = 0.1;
    let force = gravity * Math.sin(this.angle);
    this.angleA = (-1 * force) / this.length;
    this.angleV += this.angleA;
    this.angle += this.angleV;

    if (this.angleV < Math.PI / 36) console.log("hello");

    this.angleV *= 0.995;
  }

  clicked(mx, my, playMusic) {
    this.mx = mx;
    this.my = my;
    var a = this.x2 - mx;
    var b = this.y2 + 60 - my;

    var d = Math.sqrt(a * a + b * b);
    //console.log(d);
    if (d < 40) {
      this.dragging = true;
      playMusic();
      //console.log("Hello");
    }
  }

  drag() {
    // mientras se sostiene el pendulo
    // calcular angulo entre
    // origen y mouse
    if (this.dragging) {
      //console.log("drag", this.dragging);
      let diffx = this.mx - this.x1;
      let diffy = this.my - this.y1;
      //console.log(diffy);
      this.angle = Math.atan2(diffx, diffy) - this.degrees_to_radians(5);
      //console.log(this.angle); // angulo relativo (vertical)
    }
  }

  degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  stopDragging(stopMusic) {
    this.angleV = 0; // velocidad es 0 al soltarlo
    this.dragging = false;
    stopMusic();
  }

  show(ctx, callback) {
    this.x2 = this.length * Math.sin(this.angle) + this.x1;
    this.y2 = this.length * Math.cos(this.angle) + this.y1;
    //console.log("show", this.angle);
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2 + 2, this.y2 - 10);
    ctx.lineWidth = 2.5;
    //ctx.arc(x1, y1, 50, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(67, 2, 3)";
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(this.x2 + 2, this.y2, 10, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(100, 20, 30)";
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "rgba(100, 10, 15)";
    ctx.fillRect(this.x2 - 10, this.y2 + 10, 25, 20);
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(this.x2, this.y2 + 60, 40, 0, 2 * Math.PI);
    ctx.lineWidth = 30;
    ctx.fillStyle = "rgba(224, 37, 38)";
    ctx.fill();
    ctx.closePath();
    //drawcircle(this.x2, this.y2, ctx);
    callback(this.x2, this.y2, ctx);
  }
}
