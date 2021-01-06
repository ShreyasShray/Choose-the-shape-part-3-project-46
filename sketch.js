var square, square_image;
var circle, circle_image;
var triangle, triangle_image;
var mainShape;
var squareEnemy, squareEnemyGroup;
var triangleEnemy, triangleEnemyGroup;
var circleEnemy, circleEnemyGroup;
var mainShapeState = "square";
var gamestate = "start";

function preload(){
  square_image = loadImage("rectangle.png");
  circle_image = loadImage("circle.png");
  triangle_image = loadImage("triangle.png");
}


function setup() {
  createCanvas(800,600);
  square = createSprite(140, 520, 40, 40);
  square.addImage(square_image);

  circle = createSprite(400, 520, 40, 40);
  circle.addImage(circle_image);

  triangle = createSprite(660, 520, 40, 40);
  triangle.addImage(triangle_image);

  mainShape = createSprite(400, 380, 40, 40);
  mainShape.addImage(square_image);
  squareEnemyGroup = new Group();
  triangleEnemyGroup = new Group();
  circleEnemyGroup = new Group();

}

function draw() {
  if(gamestate === "start"){
    background("grey");
    fill("black");
    stroke("black");
    textSize(24);
    text("Press 'space' to Start the game", 200, 100);

    textSize(40);
    text("Rules :", 40, 200);

    textSize(25);
    text("1. square can only destroy circle", 40, 250);
    text("2. circle can only destroy triangle", 40, 300);
    text("3. triangle can only destroy square", 40, 350);

    text("if the rules are not followed then the game will over", 40, 400);

    if(keyDown('space')){
      gamestate = "play";
    }
  }else if(gamestate === "play"){

    background("grey");
  
    push();
    strokeWeight(10);
    line(0, 440, 800, 440);
    pop();
  
    if(mousePressedOver(circle)){
      mainShapeState = "circle";
      mainShape.addImage(circle_image);
    }
  
    if(mousePressedOver(triangle)){
      mainShapeState = "triangle";
      mainShape.addImage(triangle_image);
    }
  
    if(mousePressedOver(square)){
      mainShapeState = "square";
      mainShape.addImage(square_image);
    }
  
    if(frameCount % 200 === 0){
      var select = Math.round(random(1, 3));
      switch(select){
        case 1: squareEnemy = createSprite(400, -100, 40, 40);
        squareEnemy.addImage(square_image);
        squareEnemy.velocityY = 4;
        squareEnemyGroup.add(squareEnemy);
        break;
  
        case 2: triangleEnemy = createSprite(400, -100, 40, 40);
        triangleEnemy.addImage(triangle_image);
        triangleEnemy.velocityY = 4;
        triangleEnemyGroup.add(triangleEnemy);
        break;
  
        case 3: circleEnemy = createSprite(400, -100, 40, 40);
        circleEnemy.addImage(circle_image);
        circleEnemy.velocityY = 4;
        circleEnemyGroup.add(circleEnemy);
        break;
      }
    }
  
    if(mainShapeState === "square" && mainShape.isTouching(circleEnemyGroup)){
      circleEnemyGroup.destroyEach();
    }
  
    if(mainShapeState === "triangle" && mainShape.isTouching(squareEnemyGroup)){
      squareEnemyGroup.destroyEach();
    }
  
    if(mainShapeState === "circle" && mainShape.isTouching(triangleEnemyGroup)){
      triangleEnemyGroup.destroyEach();
    }


    if(mainShapeState === "square" && mainShape.isTouching(squareEnemyGroup)){
      gamestate = "end";
    }
    if(mainShapeState === "square" && mainShape.isTouching(triangleEnemyGroup)){
      gamestate = "end";
    }


    if(mainShapeState === "triangle" && mainShape.isTouching(circleEnemyGroup)){
      gamestate = "end";
    }
    if(mainShapeState === "triangle" && mainShape.isTouching(triangleEnemyGroup)){
      gamestate = "end";
    }


    if(mainShapeState === "circle" && mainShape.isTouching(squareEnemyGroup)){
      gamestate = "end";
    }
    if(mainShapeState === "circle" && mainShape.isTouching(circleEnemyGroup)){
      gamestate = "end";
    }

    console.log(mainShapeState);
    
    drawSprites();
  }else if(gamestate === "end"){
    fill("black");
    stroke("white");
    textSize(100);
    text("Game Over", 100, 300);
  }
}