(function () {
  let canvas = document.getElementsByTagName('canvas')[0];
  let stage: createjs.Stage;
  let reel_1: createjs.Bitmap;
  let reel_2: createjs.Bitmap;
  let reel_3: createjs.Bitmap;
  let themes = [
    {
      name:'theme1',
      machine:'./assets/images/machine.png',
      spin:{
        pos:{x:98, y:145},
        image:'./assets/images/spin.png'
      },
      reels:{
        pos_reel_1:{x:142.5, y:85},
        pos_reel_2:{x:267,   y:85},
        pos_reel_3:{x:388,   y:85},
        images:[
          './assets/images/reel-bar.png', 
          './assets/images/reel-cherry.png', 
          './assets/images/reel-7.png',
          './assets/images/reel-dollar.png',
          './assets/images/reel-star.png',
          './assets/images/reel-diamond.png',
          './assets/images/reel-watermelon.png',
          './assets/images/reel-lemon.png'
        ]
      }
    },
    {
      name:'theme2',
      machine:'./assets/images/slot2-640.png',
      spin:{
        pos:{x:497, y:386},
        image:'./assets/images/spin.png'
      },
      reels:{
        pos_reel_1:{x:98, y:145},
        pos_reel_2:{x:270,y:145},
        pos_reel_3:{x:435,y:145},
        images:[
          './assets/images/reel-bar.png', 
          './assets/images/reel-cherry.png', 
          './assets/images/reel-7.png',
          './assets/images/reel-dollar.png',
          './assets/images/reel-star.png',
          './assets/images/reel-diamond.png',
          './assets/images/reel-watermelon.png',
          './assets/images/reel-lemon.png'
        ]
      }
    },
    {
      name:'theme3',
      machine:'./assets/images/slot4.png',
      spin:{
        pos:{x:98, y:145},
        image:'./assets/images/spin.png'
      },
      reels:{
        pos_reel_1:{x:142.5, y:85},
        pos_reel_2:{x:267,   y:85},
        pos_reel_3:{x:388,   y:85},
        images:[ 
          './assets/images/reel-bar.png', 
          './assets/images/reel-cherry.png', 
          './assets/images/reel-7.png',
          './assets/images/reel-dollar.png',
          './assets/images/reel-star.png',
          './assets/images/reel-diamond.png',
          './assets/images/reel-watermelon.png',
          './assets/images/reel-lemon.png'
        ]
      }
    }
  ];
  let theme = 1;
  
 
  /**
   * This method initializes the CreateJS (EaselJS) Library
   * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
   */
  function Start(): void {
    console.log("%c Slot Machine Started", "color: green; font-size:15px; font-weight: bold;");
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
    stage.update();
  }

  function checkRange(value:number, lowerBounds:number, upperBounds:number) {
    if (value >= lowerBounds && value <= upperBounds)
    {
      return value;
    }
    else {
      return !value;
    }
  }

  function Reels(): Array<number> {
    let outCome: Array<number> = [0, 0, 0];
    let betLine:Array<number> = [];
    //TODO: check if it right to use objects like this in typescript
    let results = themes[theme].reels.images.map(e => {return {item:e, total:0}});
    //TODO: convert to an array of reels to be easy to enter more reels
    for (let spin:number = 0; spin < 3; spin++) {
      outCome[spin] = Math.floor((Math.random() * 65) + 1);
      switch (outCome[spin]) {
          case checkRange(outCome[spin], 1, 65):  // 41.5% probability
              betLine[spin] = 7//themes[theme].reels.images[0];
              results[7].total++;
              break;
          // case checkRange(outCome[spin], 1, 27):  // 41.5% probability
          //     betLine[spin] = themes[theme].reels.images[0];
          //     results[];
          //     break;
          // case checkRange(outCome[spin], 28, 37): // 15.4% probability
          //     betLine[spin] = "Grapes";
          //     grapes++;
          //     break;
          // case checkRange(outCome[spin], 38, 46): // 13.8% probability
          //     betLine[spin] = "Banana";
          //     bananas++;
          //     break;
          // case checkRange(outCome[spin], 47, 54): // 12.3% probability
          //     betLine[spin] = "Orange";
          //     oranges++;
          //     break;
          // case checkRange(outCome[spin], 55, 59): //  7.7% probability
          //     betLine[spin] = "Cherry";
          //     cherries++;
          //     break;
          // case checkRange(outCome[spin], 60, 62): //  4.6% probability
          //     betLine[spin] = "Bar";
          //     bars++;
          //     break;
          // case checkRange(outCome[spin], 63, 64): //  3.1% probability
          //     betLine[spin] = "Bell";
          //     bells++;
          //     break;
          // case checkRange(outCome[spin], 65, 65): //  1.5% probability
          //     betLine[spin] = "Seven";
          //     sevens++;
          //     break;
      }
    }
    return betLine;
  }
  /**
   * This function is the main function of the game
   *
   */
  function Main(): void {
    console.log("%c Main Started", "color: green; font-size:16px;");
    
    reel_1 = new createjs.Bitmap(themes[theme].reels.images[0]);
    reel_1.x = themes[theme].reels.pos_reel_1.x;
    reel_1.y = themes[theme].reels.pos_reel_1.y;
    stage.addChild(reel_1);

    reel_2 = new createjs.Bitmap(themes[theme].reels.images[1]);
    reel_2.x = themes[theme].reels.pos_reel_2.x;
    reel_2.y = themes[theme].reels.pos_reel_2.y;
    stage.addChild(reel_2);

    reel_3 = new createjs.Bitmap(themes[theme].reels.images[3]);
    reel_3.x = themes[theme].reels.pos_reel_3.x;
    reel_3.y = themes[theme].reels.pos_reel_3.y;
    stage.addChild(reel_3);
    
    let bg = new createjs.Bitmap(themes[theme].machine);
    stage.addChild(bg);
    
    let btn_spin = new createjs.Bitmap(themes[theme].spin.image);
    btn_spin.x = themes[theme].spin.pos.x;
    btn_spin.y = themes[theme].spin.pos.y;
    btn_spin.cursor = "pointer";
    stage.addChild(btn_spin);

    btn_spin.on("click", function(){
      let spinResult:Array<number> = Reels();
      //TODO: change to allow multi reels and reduce repetition
      stage.removeChild(reel_1);
      reel_1 = new createjs.Bitmap(themes[theme].reels.images[spinResult[0]]);
      reel_1.x = themes[theme].reels.pos_reel_1.x;
      reel_1.y = themes[theme].reels.pos_reel_1.y;
      stage.addChild(reel_1);

      stage.removeChild(reel_2);
      reel_2 = new createjs.Bitmap(themes[theme].reels.images[spinResult[1]]);
      reel_2.x = themes[theme].reels.pos_reel_2.x;
      reel_2.y = themes[theme].reels.pos_reel_2.y;
      stage.addChild(reel_2);

      stage.removeChild(reel_3);
      reel_3 = new createjs.Bitmap(themes[theme].reels.images[spinResult[2]]);
      reel_3.x = themes[theme].reels.pos_reel_3.x;
      reel_3.y = themes[theme].reels.pos_reel_3.y;
      stage.addChild(reel_3);
    });
  }

  

  window.addEventListener("load", Start);
})();