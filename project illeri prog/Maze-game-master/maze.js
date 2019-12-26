// Make canvas statements
const canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 400;

const c = canvas.getContext('2d');

let w=6
let l,r,u,d=0

// Object that checks if key is pressed
let keyPressed = {
	left: false,
	right: false,
	up: false,
	down: false
}

// Goal object
const Goal = {
	x: canvas.width -120,
	y: canvas.height - 110,
	width: 50,
	height: 52,
	draw: function(){
		c.beginPath();
		c.rect(this.x, this.y, this.width, this.height);
		c.fillStyle = "white";
		c.fill();
		c.stroke();
		c.closePath();
	}
}

// Ball object
function Ball(x, y, radius, dx, dy){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = "white";
		c.fill();
		c.stroke();
		c.closePath();
	}



	this.move = function(){

		// Conditions that checks if ball is greater or less than canvas width
		if(keyPressed.left){
			if((this.x - radius > 0) && (l !=1)  ){
				this.x -= this.dx;
			}
		}

		if(keyPressed.right){
			if((this.x + radius < canvas.width) && (r !=1)  ){
				this.x += this.dx;
			}
		}

		// Conditions that checks if ball is greater or less than canvas height
		if(keyPressed.up  ){
			if((this.y - radius > 0) && (u !=1)  ){
				this.y -= this.dy;
			}
		}

		if(keyPressed.down){
			
			if((this.y + radius < canvas.height) && (d !=1)  ){

				this.y += this.dy;

			}

		}


		this.draw();
	}
}

// Wall object
function Wall(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.draw = function(){
		c.beginPath();
		c.rect(this.x, this.y, this.width, this.height);
		c.fillStyle = "black";
		c.fill();
		c.closePath();
	}
}


// Create walls and save it in an array

//zidth 800
//height 400
//bin irtif3 700 et 200
let wallArray = [
new Wall(0, 100, canvas.width - 100, 5), //x,y,length,strike
new Wall(270, canvas.height - 200, 5, 125),
new Wall(350, 450, 5, 45),
new Wall(50, 0, 5, 45), //loula 3amoudiya
new Wall(120, 50, 5,50), //loula 3amoudiya  ( mnin tebda 3al ymin , 9adch teb3d 3ala s9af , somk , toul)
new Wall(180, 0, 5, 45), //loula 3amoudiya
new Wall(300, 50, 5,50),
new Wall(450, 50, 5,50),
new Wall(450, 50, 90, 5),
//new Wall(650, 50,500, 5),
new Wall(550, 50, 50, 5),
new Wall(700, 50,50, 5),
new Wall(650, 0, 5, 45), //loula 3amoudiya
new Wall(250, 200, 100, 5), // ofo9ya
new Wall(150, 200, canvas.width, 5),
new Wall(150, 200, 5, 125),

new Wall(200, 350, 5, 125),
new Wall(650, 350, 150, 5),
new Wall(650, 270, 5, 120),
new Wall(450, 400, 5, 90),
new Wall(350, 200, 5, 125),
new Wall(0, 350, 70, 5),
new Wall(60, 270, 90, 5),
new Wall(19, 400, 55, 5),
new Wall(0, 200,70, 5),
//
new Wall(258, 325, 25, 5),
/////
new Wall(425, 100, 5, 50),
new Wall(350,150, 5, 50),
new Wall(250, 100, 5, 50),

new Wall(150, 150, 5, 50),

new Wall(650, 100, 5, 50),
new Wall(600, 222, 25, 5),
//new Wall(520, 333, 5, 35),
new Wall(365, 444, 5, 40),
//new Wall(458, 125, 5, 29),
//
new Wall(450, 350, 5, 125),
new Wall(550, 420,5, 99),
new Wall(550, 200, 5, 125),
new Wall(450, 450, 5, 45),
new Wall(450, canvas.height - 125, 5, 125)

//
];




// Create the ball using the object 
let ball = new Ball(22,22, 15, 15, 7);


// Check function if ball touchs walls
function RectCircleColliding(circle,rect){
    let distX = Math.abs(circle.x - rect.x-rect.width/2);
    let distY = Math.abs(circle.y - rect.y-rect.height/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; } 
    if (distY <= (rect.height/2)) { return true; }

    let dx=distX-rect.width/2;
    let dy=distY-rect.height/2;
    return (dx*dx+dy*dy<=(circle.radius*circle.radius)); //true fqlse
}

function wallsCheck(){
    
  w=5
	for (var i = 0; i < wallArray.length; i++) {

		if(RectCircleColliding(ball, wallArray[i])){
			w=0
/*
			if(keyPressed.left) {w=0;}
		    else if(keyPressed.right){w=1;}
		    else if(keyPressed.up) {w=2; }
		    else if(keyPressed.down) {w=3; }
		    */


			if(keyPressed.left) {l=1; r=0;u=0;d=0}
		    else if(keyPressed.right){r=1; l=0;u=0;d=0;}
		    else if(keyPressed.up) {u=1; r=0; l=0;d=0;}
		    else if(keyPressed.down) {d=1; r=0; l=0;u=0;}

			
		}

	}


	return w
}

// Check function if ball touchs goal square
function goalCheck(){
	if(RectCircleColliding(ball, Goal)){
		alert("YOU WiN!");
		document.location.reload();
	}
}

function start(){
	requestAnimationFrame(start);
	c.clearRect(0, 0, innerWidth, innerHeight);
for (var i = 0; i < wallArray.length; i++) {
	wallArray[i].draw();


	

	Goal.draw();
}
	ball.move();
	wallsCheck();
	goalCheck();
}

// Event that check if keys are pressed
document.addEventListener('keydown', (e) => {
	if(e.keyCode === 37){
		keyPressed.left = true;
	}
	if(e.keyCode === 39){
		keyPressed.right = true;
	}
	if(e.keyCode === 38){
		keyPressed.up = true;
	}
	if(e.keyCode === 40){
		keyPressed.down = true;
	}
})

// Event that check if keys aren't pressed
document.addEventListener('keyup', (e) => {
	if(e.keyCode === 37){
		keyPressed.left = false;
	}
	if(e.keyCode === 39){
		keyPressed.right = false;
	}
	if(e.keyCode === 38){
		keyPressed.up = false;
	}
	if(e.keyCode === 40){
		keyPressed.down = false;
	}
});

start();
            var hm, time;
function twoDigits(t) {
    if (t>9) return ""+t;
    return "0"+t;
}
function setHourMin() {
    const d = new Date();
    hm = twoDigits(d.getHours())+":"
        +twoDigits(d.getMinutes());
    document.title = "Cpositionk "+hm; 
    //console.log(hm);
}
function count() {
    const d = new Date();
    let sec = twoDigits(d.getSeconds());
    if (sec == "00") setHourMin();
    cpositionk.innerText = hm+":"+sec;
    time = setTimeout(count, 1000);
}
  setHourMin(); count()