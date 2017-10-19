(function(){

	function Stage() {
		this.actors = [];
		this.opacity = 1;
	}

	Stage.prototype = {

		init: function(width, height, color, canvas) {
			this.canvas = canvas;
			this.canvas.width = this.width = width;
			this.canvas.height = this.height = height;
			this.color = color;
			this.context = this.canvas.getContext("2d");
		},

		add: function(actor) {
			this.actors.push(actor);
		},

		render: function() {
			var max = this.actors.length;
			this.clear();

			// draw each actor
			for (var i = 0; i < max; i++) {
				if(this.running){
					this.actors[i].calc();
				}
				this.actors[i].draw(this.context);
			}

			this.drawMiddleLine();
		},

		clear: function() {
			this.context.fillStyle = this.color;
			this.context.fillRect(0, 0, this.width, this.height);
			this.context.fill();
		},

		drawMiddleLine: function() {
			this.context.lineWidth = 3;
			this.context.strokeStyle = "rgb(255, 255, 255)";
			this.context.beginPath();
			this.context.moveTo(this.width/2,10);
			this.context.lineTo(this.width/2,this.height-10);
			this.context.closePath();
			this.context.stroke();
		},

		start: function() {
			this.running = true;
		},

		stop: function() {
			this.running = false;
		},

		hit: function() {
			var oldColor = this.color;
			var stage = this;
			stage.color = "rgba(255, 0, 0, .3)";
			setTimeout(function(){ stage.color = oldColor; },50);
		}

	};

	function Ball() {
		this.vx = 15 * Math.random(); // velocity x
		this.vy = 15 * Math.random(); // velocity y
	}

	Ball.prototype = {

		init: function(x, y, radius, color) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.color = color;
		},

		calc: function() {
			this.x = this.x + this.vx;
			this.y = this.y + this.vy;
		},

		draw: function(context) {
			context.beginPath();
			context.fillStyle = this.color;
			context.arc(this.x, this.y, 20, 0, Math.PI * 2, true);
			context.fill();
		}
	};

	function Paddle() {
		this.x = 0;
		this.y = 0;
		this.input = { 'up': false, 'down': false };
	}

	Paddle.prototype = {

		init: function(x, y, width, height, color) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.color = color;
		},

		calc: function() {
			if(this.input.up) {
				this.y += 10;
			} else if(this.input.down) {
				this.y -= 10;
			}
		},

		draw: function(context) {
			context.fillStyle = this.color;
			context.fillRect(this.x-(this.width/2),this.y-(this.height/2),this.width,this.height);
			context.fill();
		}

	};

	// Spielfläche erstellen
	var canvas = document.getElementById('myCanvas');
	var stage = new Stage();
		stage.init(800, 600, "rgba(0, 0, 0, .3)", canvas);

	// Ball hinzufügen
	var ball = new Ball();
		ball.init(400, 200, 20, 'white');
		stage.add(ball);

	// Schläger hinzufügen
	var paddleLeft = new Paddle();
		paddleLeft.init(0, 200, 20, 100, 'white');
		stage.add(paddleLeft);

	var paddleRight = new Paddle();
		paddleRight.init(800, 200, 20, 100, 'white');
		stage.add(paddleRight);

	// Tastureingabe verwenden
	function onKeyDown(evt) {
		evt.preventDefault();
		if (evt.keyCode === 40) paddleRight.input.up = true;
		else if (evt.keyCode === 38) paddleRight.input.down = true;
		else if (evt.keyCode === 83) paddleLeft.input.up = true;
		else if (evt.keyCode === 87) paddleLeft.input.down = true;
	}

	function onKeyUp(evt) {
		evt.preventDefault();
		if (evt.keyCode === 40) paddleRight.input.up = false;
		else if (evt.keyCode === 38) paddleRight.input.down = false;
		else if (evt.keyCode === 83) paddleLeft.input.up = false;
		else if (evt.keyCode === 87) paddleLeft.input.down = false;
	}

	$(document).keydown(onKeyDown);
	$(document).keyup(onKeyUp);

	// Kollisionslogik
	function paddleHitTest(stage, ball, paddle) {

		if( ball.y > paddle.y - (paddle.height/2) &&
			ball.y < paddle.y + (paddle.height/2)) {
			ball.vy = 3 * ((ball.y-(paddle.y+(paddle.height/2)))/paddle.height);
		} else {
			stage.hit();
		}

	}

	function wallHitTest(stage, ball, paddleLeft, paddleRight) {

		// horizontal wall hit
		if (ball.x - ball.radius < 0) {
			paddleHitTest(stage, ball, paddleLeft);
			ball.x = ball.radius;
			ball.vx = ball.vx * -1;

		} else if (ball.x + ball.radius > stage.width) {
			paddleHitTest(stage, ball, paddleRight);
			ball.x = stage.width - ball.radius;
			ball.vx = ball.vx * -1;
		}

		// vertical wall hit
		if (ball.y + ball.radius > stage.height) {
			ball.y = stage.height - ball.radius;
			ball.vy = ball.vy * -1;
		} else if (ball.y - ball.radius < 0) {
			ball.y = ball.radius;
			ball.vy = ball.vy * -1;
		}

	}

	// Animation starten
	function tick() {
		stage.render();
		wallHitTest(stage, ball, paddleLeft, paddleRight);
	}

	window.setInterval(tick, 1000 / 60);

	stage.start();

}());