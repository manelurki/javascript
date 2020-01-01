// Make canvas statements
const canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 450;

const c = canvas.getContext('2d');

let w=5
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
	x: canvas.width -100,
	y: canvas.height - 70,
	width: 50,
	height: 52,
	draw: function(){
		c.beginPath();
		c.rect(this.x, this.y, this.width, this.height);
		c.fillStyle = "#ffff99";
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
		c.fillStyle = "#ffff99";
		c.fill();
		c.stroke();
		c.closePath();
	}




////
	this.move = function(){
		//x y raduis dx dy
		//let ball = new Ball(22,22, 20, 20, 7);

		// Conditions that checks if ball is greater or less than canvas width
		if(keyPressed.left){
			if((this.x - radius > 0) ){
				this.x -= this.dx-10;
			}
		}

		if(keyPressed.right){
			if((this.x + radius < canvas.width) ){
				this.x += this.dx-10;
			}
		}

		// Conditions that checks if ball is greater or less than canvas height
		if(keyPressed.up  ){
			if((this.y - radius > 0)){
				this.y -= this.dy-5;
			}
		}

		if(keyPressed.down){
			
			if(this.y + radius < canvas.height ){

				this.y += this.dy-5;

			}

		}



		this.draw();
	}
}//


var btnR = document.getElementById("up");

var menel = 0

btnR.onclick = function(){
ball.y=ball.y-8
    keyPressed.up=true

    menel=1
}

function up(){


if (menel==1) { keyPressed.up=false; menel =0;}

}
/////
var btn1 = document.getElementById("left");

var me = 0

btn1.onclick = function(){
    keyPressed.left=true
    ball.x=ball.x-12
    me=1
}

function left(){


if (me==1) { keyPressed.left=false; me =0;}

}


var btn = document.getElementById("right");

var men = 0

btn.onclick = function(){
    keyPressed.right=true
    ball.x=ball.x+15
    men=1;
}

function right(){


if (men==1) { keyPressed.right=false; men=0;}

}
////////////
///////////////
var btn5 = document.getElementById("down");

var mene = 0

btn5.onclick = function(){
    keyPressed.down=true
ball.y=ball.y+10
    mene=1;
}

function down(){


if (mene==1) { keyPressed.down=false; mene=0;}

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
let ball = new Ball(22,22, 7, 15, 7);


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
    
   
	for (var i = 0; i < wallArray.length; i++) {

		if(RectCircleColliding(ball, wallArray[i])){
			document.location.reload();
			alert("YOU LOST!");
	}

	}



}

// Check function if ball touchs goal square
function goalCheck(){
	if(RectCircleColliding(ball, Goal)){
		
		document.location.reload();
		alert("YOU WiN!");
		
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
	 down()
	 up()
	left()
right()
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





  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

          display.textContent = "Game ends in " + minutes + ":" + seconds;

        if (--timer < -1) {
            timer = duration;
            alert( "game over")
             window.location.reload();
        }
    }, 1000);
}




    var oneMinutes = 60 * 1,
        display = document.querySelector('#time');
    startTimer(oneMinutes, display);

