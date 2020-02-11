// IIFE - Immediatly Invoked Function Expression
// what this means is an IIFE is like an
// Anonymous Self-Executing Function

(function () {
  let canvas = document.getElementsByTagName('canvas')[0];
  let stage: createjs.Stage;
  let startScene:scenes.Start;
  let currentSceneState:scenes.State;
  let currentScene:scenes.Scene;

  /**
   * This method initializes the CreateJS (EaselJS) Library
   * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
   */
  function Start(): void {
    console.log("%c Game Started", "color: blue; font-size:20px; font-weight: bold;");
    stage = new createjs.Stage(canvas);
    config.Game.STAGE = stage;// create a reference to the global stage
    startScene = new scenes.Start();
    
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on('tick', Update);
    stage.enableMouseOver(20);

    currentSceneState = scenes.State.NO_SCENE;

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
    

    // let topLeftPlayer = new objects.Vector2(player.position.x, player.position.y);
    // let topLeftButton = new objects.Vector2(startButton.position.x - startButton.halfWidth, startButton.position.y - startButton.halfHeight);
    
    stage.update();
    startScene.Update();
    //managers.Collision.squareRadiusCheck(player, startButton);
    
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
    
    stage.addChild(startScene);
    
  }

  window.addEventListener("load", Start); // after loading
})();