var firebase; 

var ball;

var position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var databasePosition = database.ref('ball/position');
    databasePosition.on("value", readPosition, showError );
}

function readPosition(data){
    position = data.val();
    console.log(position);
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("DB error");
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+3);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x' : position.x + x, 
        'y' : position.y + y
    });
}
