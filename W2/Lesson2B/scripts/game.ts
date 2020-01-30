// IIFE - Immediatly Invoked Function Expression
// what this means is an IIFE is like an
// Anonymous Self-Executing Function

(function () {
  let canvas = document.getElementsByTagName('canvas')[0];
  let stage: createjs.Stage;
  let helloLabel: objects.Label;
  let goodByeLabel: objects.Label;
  let dy = 2;

  /**
   * This method initializes the CreateJS (EaselJS) Library
   * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
   */
  function Start(): void {
    console.log("%c Game Started", "color: blue; font-size:20px; font-weight: bold;");
    stage = new createjs.Stage(canvas);
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on('tick', Update);
    Main();
  }

  /**
   * This function is triggered every frame (16ms)
   * The stage is then erased and redrawn
   */
  function Update(): void {
    helloLabel.rotation += 5;
    // goodByeLabel.rotation -= 5;
    goodByeLabel.y += dy;
    checkBounds();
    stage.update();
  }

  function checkBounds():void{
    // check the bottom border
    if(goodByeLabel.y >= 480 - goodByeLabel.getMeasuredHeight() * 0.5){
      dy = -2;
    }
    // check the top border
    if(goodByeLabel.y <= goodByeLabel.getMeasuredHeight() * 0.5){
      dy = 2;
    }
  }

  function Main(): void {
    console.log("%c Main Started", "color: green; font-size:16px;");
    helloLabel = new objects.Label("Hello World", "40px", "Consolas", "#000000", 320, 240, true);
    // helloLabel.regX = helloLabel.getBounds().width * 0.5;
    // helloLabel.regY = helloLabel.getMeasuredLineHeight() * 0.5;
    // helloLabel.x = 320;
    // helloLabel.y = 240;
    stage.addChild(helloLabel);

    goodByeLabel = new objects.Label("Good Bye", "30px", "Arial", "#FF0000", 320, 300, true);
    stage.addChild(goodByeLabel);
  }

  window.addEventListener("load", Start);
})();