const width = 400;
const height = 300;
const radius = 25;
var canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
var context = canvas.getContext("2d");
var Point = function(x,y) {
	this.x = x;
	this.y = y;
}
Point.prototype = {
	add:function(other) {
		this.x += other.x;
		this.y += other.y;
	}
}

var Ball = function(x,y) {
	this.pos = new Point(x,y);
	this.vel = new Point(15,0);
	this.acc = new Point(+Math.random(),+Math.random());
}

Ball.prototype = {
	update:function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.bounce();
	}
	,
	show:function() {
		context.beginPath();
		context.arc(this.pos.x, this.pos.y, radius, 0, Math.PI*2);
		context.fill();
	}
	,
	bounce:function() {
		if ((this.pos.x - radius) <= 0 && this.vel.x <= 0 || (this.pos.x + radius) >= width && this.vel.x >= 0) {
			this.vel.x = -this.vel.x;
			this.acc.x = -(this.acc.x + (0.5 * Math.random()));
			this.acc.x /= 4;
			context.fillStyle = "rgb(" +Math.floor((Math.random() * 255))+"," +Math.floor((Math.random() * 255)) +"," +Math.floor((Math.random() * 255))+")";
		}
		if ((this.pos.y - radius) <= 0 && this.vel.y <= 0 || (this.pos.y + radius) >= height && this.vel.y >= 0) {
			this.vel.y = -this.vel.y;
			this.acc.y = -(this.acc.y + (0.5 * Math.random()));
			this.acc.y /= 4;
			context.fillStyle = "rgb(" +Math.floor((Math.random() * 255))+"," +Math.floor((Math.random() * 255)) +"," +Math.floor((Math.random() * 255))+")";

		}
	}
}

var ball = new Ball(width/2, height/2);
setInterval(loop, 30);
//document.body.style.backgroundColor = "#000";
function loop() {
	context.clearRect(0,0,width, height);
	ball.update();
	ball.show();
}	

