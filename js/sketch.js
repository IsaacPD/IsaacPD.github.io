var cnv;
var p1, p2;
var ball;

var timer = 0;
var mod = 10;

function setup() {
	cnv = createCanvas(select('#pong').width, 30);
	cnv.parent('#pong');
	p1 = new Paddle();
	p2 = new Paddle();
	p2.x = cnv.width - 10 - p2.width;
	p2.y = 8;
	ball = new Ball();
	centerCanvas();
}

function centerCanvas(){
	cnv.center();
}

function windowResized(){
	centerCanvas();
	cnv.width = select('#pong').width;
}

function keyPressed(){
	if (key == "w")
		p1.move(-1);
	else if (key == "s")
		p1.move(1);
}

function draw() {
	background('#e9ecef');
	if (timer % mod === 0)
		p2.move2();

	if (deviceOrientation === "portrait"){
		var dir = 0;
		if (rotationX > 10) dir = 1;
		else if (rotationX < - 10) dir = -1;
		p1.move(dir);
	} else {
		var dir = 0;
		if (rotationY > 10) dir = 1;
		else if (rotationY < -10) dir = -1;
		p1.move(dir);
	}

	p1.intersects();
	p2.intersects();
	p1.display();
	p2.display();
	ball.move();
	ball.display();
}

function Paddle() {
	this.y = 8;
	this.x = 10;
	this.width = 5;
	this.height = 10;

	this.move = function(dir){
		if (this.y + dir <= 0) return;
		else if (this.y + this.height + dir >= cnv.height) return;
		this.y += dir;
	 };
	this.move2 = function(){
		var dir = 0;
		var d = ball.y - this.y;
		if (d < 0) dir = -1;
		else if (d > 0) dir = 1;
		this.move(dir);
	};
	this.display = function(){
		fill(157,255,211);
		rect(this.x, this.y, this.width, this.height, 2);
	};
	this.intersects = function(){
	  if (ball.x > this.x && ball.x < this.x + this.width){
		  if (ball.y > this.y && ball.y < this.y + this.height) {
			  ball.dir *= -1;
			  ball.speed = random(0, 1);
		  }
	  }
	};
}

function Ball(){
	this.x = cnv.width / 2;
	this.y = cnv.height / 2;
	this.radius = 3;
	this.dir = -1;
	this.speed = 0.5;

	this.move = function () {
		this.x += this.dir;
		this.y += this.speed;
		if (this.y <= 0 || this.y >= cnv.height) {
			this.speed *= -1;
			this.y += 2 * this.speed;
		}
		if (this.x <= 0 || this.x >= cnv.width) {
			this.x = cnv.width / 2;
			this.dir *= -1;
		}
	};
	this.display = function () {
		ellipse(this.x, this.y, this.radius, this.radius);
	};
}
