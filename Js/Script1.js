// vars
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var gap = 90;
var score = 0;


var fly = new Audio();
var scoreAudio = new Audio();


var xPos = 50;
var yPos = 150;
var grav = 1.5;
var pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
}
fly.src ="Audio/gimn_sssr.mp3"

bird.src = "Img/sv1.png";
bg.src = "Img/ukr_bg.png";
fg.src = "Img/put1.png";
pipeUp.src = "Img/flappy_bird_pipeUp.png";
pipeBottom.src = "Img/flappy_bird_pipeBottom.png";


//func
function draw() {
    fly.play();


    context.drawImage(bg, 0, 0);
    for (i = 0; i < pipe.length; i++) {
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;
        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)||
             yPos + bird.height >= canvas.height - fg.height) {
            setTimeout(location.reload(), 5000);
        }
        if (pipe[i].x == 5) {
            score+=5;
        }
    }
    

    context.drawImage(fg, 0, canvas.height - fg.height);
    context.drawImage(bird, xPos, yPos);

    yPos += grav;
    context.fillStyle = "#FFFFFF";
    context.font = "24px Verdana";
    context.fillText("Like:" + score,20, canvas.height - 20);
    requestAnimationFrame(draw);
}
function moveUp() {
    yPos -= 25;
}


//fin
document.addEventListener("keydown", moveUp);
pipeBottom.onload = draw;
