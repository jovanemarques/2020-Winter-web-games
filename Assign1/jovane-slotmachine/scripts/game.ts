
(function () {
  let canvas = document.getElementsByTagName('canvas')[0];
  let stage: createjs.Stage;
  //TODO: remove hard coded reel number
  let reel_1: createjs.Bitmap;
  let reel_2: createjs.Bitmap;
  let reel_3: createjs.Bitmap;
  let results: { item: string; total: number; }[] = [];
  let winnings: number = 0;
  let playerBet: number = 10;
  let playerMoney: number = 1000;
  let jackpot: number = 5000;
  let winNumber: number = 0;
  let lossNumber: number = 0;
  let theme = 1;
  let label_winnings:createjs.Text;
  let label_credits:createjs.Text;
  let label_bet:createjs.Text;

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
          './assets/images/reel-blank.png', 
          './assets/images/reel-bar.png', 
          './assets/images/reel-cherry.png', 
          './assets/images/reel-dollar.png',
          './assets/images/reel-star.png',
          //'./assets/images/reel-diamond.png',
          './assets/images/reel-watermelon.png',
          './assets/images/reel-lemon.png',
          './assets/images/reel-7.png',
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
          './assets/images/reel-blank.png', 
          './assets/images/reel-bar.png', 
          './assets/images/reel-cherry.png', 
          './assets/images/reel-dollar.png',
          './assets/images/reel-star.png',
          //'./assets/images/reel-diamond.png',
          './assets/images/reel-watermelon.png',
          './assets/images/reel-lemon.png',
          './assets/images/reel-7.png',
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
          './assets/images/reel-blank.png', 
          './assets/images/reel-bar.png', 
          './assets/images/reel-cherry.png', 
          './assets/images/reel-dollar.png',
          './assets/images/reel-star.png',
          //'./assets/images/reel-diamond.png',
          './assets/images/reel-watermelon.png',
          './assets/images/reel-lemon.png',
          './assets/images/reel-7.png',
        ]
      }
    }
  ];
  
 
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
    label_winnings.text = winNumber.toString();
    label_credits.text = playerMoney.toString(); 
    label_bet.text = playerBet.toString(); 
  }

  /**
   * 
   * @param value 
   * @param lowerBounds 
   * @param upperBounds 
   */
  function checkRange(value:number, lowerBounds:number, upperBounds:number) {
    if (value >= lowerBounds && value <= upperBounds)
    {
      return value;
    }
    else {
      return !value;
    }
  }

  /**
   * 
   */
  function Reels(): Array<number> {
    let outCome: Array<number> = [0, 0, 0];
    let betLine:Array<number> = [];
    //TODO: check if it right to use objects like this in typescript
    results = themes[theme].reels.images.map(e => {return {item:e, total:0}});
    //TODO: convert to an array of reels to be easy to enter more reels
    for (let spin:number = 0; spin < 3; spin++) {
      outCome[spin] = Math.floor((Math.random() * 65) + 1);
      switch (outCome[spin]) {
        case checkRange(outCome[spin], 1, 27):  // 41.5% probability
          betLine[spin] = 0//themes[theme].reels.images[0];
          results[0].total++;
          break;
        case checkRange(outCome[spin], 28, 37): // 15.4% probability
          betLine[spin] = 1;
          results[1].total++;
          break;
        case checkRange(outCome[spin], 38, 46): // 13.8% probability
          betLine[spin] = 2;
          results[2].total++;
          break;
        case checkRange(outCome[spin], 47, 54): // 12.3% probability
            betLine[spin] = 3;
            results[3].total++;
            break;
        case checkRange(outCome[spin], 55, 59): //  7.7% probability
            betLine[spin] = 4;
            results[4].total++;
            break;
        case checkRange(outCome[spin], 60, 62): //  4.6% probability
            betLine[spin] = 5;
            results[5].total++;
            break;
        case checkRange(outCome[spin], 63, 64): //  3.1% probability
            betLine[spin] = 6;
            results[6].total++;
            break;
        case checkRange(outCome[spin], 65, 65): //  1.5% probability
            betLine[spin] = 7;
            results[7].total++;
            break;
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

    label_credits = new createjs.Text(playerMoney.toString());
    label_credits.font = "15px 'Press Start 2P'";
    label_credits.textAlign = "center";
    label_credits.x = 149;
    label_credits.y = 354;
    label_credits.color = 'red';
    stage.addChild(label_credits);

    label_winnings = new createjs.Text("0");
    label_winnings.font = "15px 'Press Start 2P'";
    label_winnings.textAlign = "center";
    label_winnings.x = 537; 
    label_winnings.y = 354;
    label_winnings.color = 'red';
    stage.addChild(label_winnings);

    label_bet = new createjs.Text(playerBet.toString());
    label_bet.font = "15px 'Press Start 2P'";
    label_bet.textAlign = "center";
    label_bet.x = 410; 
    label_bet.y = 354;
    label_bet.color = 'red';
    stage.addChild(label_bet);

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

      determineWinnings();
    });
  }

  /**
   * This function calculates the player's winnings, if any
   */ 
  function determineWinnings():void
  {
    if (results[0].total === 0)
    {
        if (results[1].total === 3){ 
          winnings = playerBet * 10;
        }
        else if (results[2].total === 3){
            winnings = playerBet * 20;
        }
        else if (results[3].total === 3){
            winnings = playerBet * 30;
        }
        else if (results[4].total === 3){
            winnings = playerBet * 40;
        }
        else if (results[5].total === 3){
            winnings = playerBet * 50;
        }
        else if (results[6].total === 3){
            winnings = playerBet * 75;
        }
        else if (results[7].total === 3){
            winnings = playerBet * 100;
        }
        else if (results[1].total === 2){
            winnings = playerBet * 2;
        }
        else if (results[2].total === 2){
            winnings = playerBet * 2;
        }
        else if (results[3].total === 2){
            winnings = playerBet * 3;
        }
        else if (results[4].total === 2){
            winnings = playerBet * 4;
        }
        else if (results[5].total === 2){
            winnings = playerBet * 5;
        }
        else if (results[6].total === 2){
            winnings = playerBet * 10;
        }
        else if (results[7].total === 2){
            winnings = playerBet * 20;
        }
        else if (results[7].total === 1){
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage(winnings);
    }
    else
    {
        lossNumber++;
        showLossMessage();
    }
  }

  /**
   * Utility function to show a win message and increase player money
   * @param winnings 
   */
  function showWinMessage(winnings:number):void {
    playerMoney += winnings;
    resetFruitTally();
    checkJackPot();
    //TODO: change the msg to a label
    console.log('You Won: $' + winnings);
  }

  /**
   * Check to see if the player won the jackpot
   */
  function checkJackPot() {
    /* compare two random values */
    let jackPotTry:number = Math.floor(Math.random() * 51 + 1);
    let jackPotWin:number = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        //TODO: change the msg to a label
        console.log("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
  }

  /**
   * Utility function to show a loss message and reduce player money
   */
  function showLossMessage():void {
    playerMoney -= playerBet;
    resetFruitTally();
    //TODO: change the msg to a label
    console.log('You Lost!');
  }

  /**
   * 
   */
  function resetFruitTally():void {
    results.forEach(r => r.total = 0);
}

  window.addEventListener("load", Start);
})();