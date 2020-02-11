// IIFE - Immediatly Invoked Function Expression
// what this means is an IIFE is like an
// Anonymous Self-Executing Function

(function () {
  let canvas = document.getElementsByTagName('canvas')[0];
  let stage: createjs.Stage;
  let startLabel: objects.Label;
  //let goodByeLabel: objects.Label;
  //let clickMeButton:createjs.Bitmap;
  let startButton:objects.Button;
  //let dy = 2;
  let player:objects.Player;

  /**
   * This method initializes the CreateJS (EaselJS) Library
   * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
   */
  function Start(): void {
    console.log("%c Game Started", "color: blue; font-size:20px; font-weight: bold;");
    stage = new createjs.Stage(canvas);
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on('tick', Update);
    stage.enableMouseOver(20);
    Main();
  }

  /**
   * This function is triggered every frame (16ms)
   * The stage is then erased and redrawn
   */
  function Update(): void {
    //startLabel.rotation += 5;
    // goodByeLabel.rotation -= 5;
    //goodByeLabel.y += dy;
    //checkBounds();
    player.Update();

    let topLeftPlayer = new objects.Vector2(player.position.x, player.position.y);
    let topLeftButton = new objects.Vector2(startButton.position.x - startButton.halfWidth, startButton.position.y - startButton.halfHeight);

    //AABB Collision detection - retangle
    // if(topLeftPlayer.x < topLeftButton.x + startButton.width &&
    //   topLeftPlayer.x + player.width > topLeftButton.x && 
    //   topLeftPlayer.y < topLeftButton.y + startButton.height &&
    //   topLeftPlayer.y + player.height > topLeftButton.y){
    //     if(!startButton.isColliding){
    //       console.log('Collision!');
    //       startButton.isColliding = true;
    //     }
    // } else {
    //   startButton.isColliding = false;
    //   console.log('Collision FALSE!');
    // }

    // squared radius collision check
    let radii = startButton.halfHeight + startButton.halfHeight;
    if(objects.Vector2.sqrDistance(player.position, startButton.position) < (radii * radii)){
      if(!startButton.isColliding){
        console.log('Collision!');
        startButton.isColliding = true;
      } else {
        startButton.isColliding = false;
        console.log('Collision FALSE!');
      }
    }

    stage.update();
  }

  function checkBounds():void{
    // check the bottom border
    // if(goodByeLabel.y >= 480 - goodByeLabel.getMeasuredHeight() * 0.5){
    //   dy = -2;
    // }
    // // check the top border
    // if(goodByeLabel.y <= goodByeLabel.getMeasuredHeight() * 0.5){
    //   dy = 2;
    // }
  }

  /**
   * This function is the main function of the game
   *
   */
  function Main(): void {
    console.log("%c Main Started", "color: green; font-size:16px;");
    startLabel = new objects.Label("The Game", "80px", "Consolas", "#000000", 320, 180, true);
    stage.addChild(startLabel);

    startButton = new objects.Button('../assets/images/startButton.png', 320, 400, true);
    stage.addChild(startButton);
    
    startButton.on("click", function(){
      startLabel.text = "Click Me!";
    });
    
    //startButton.position.x = 100;
    
    console.log(startButton.position);
    
    // let vector1 = new objects.Vector2(100, 200);
    // console.log(vector1.toString());
    // let vector2 = new objects.Vector2(300, 500);
    player = new objects.Player();
    stage.addChild(player);
  }

  window.addEventListener("load", Start); // after loading
})();