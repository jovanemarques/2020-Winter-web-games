
(function () {
  let canvas = document.getElementsByTagName('canvas')[0];
  let stage: createjs.Stage;
  let reel_1: createjs.Bitmap;
  let reel_2: createjs.Bitmap;
  let reel_3: createjs.Bitmap;
  let results:number[] = [];
  let winnings: number = 0;
  let playerBet: number = 10;
  let playerMoney: number = 1000;
  let jackpot: number = 5000;
  let winNumber: number = 0;
  let lossNumber: number = 0;
  let label_winnings:createjs.Text;
  let label_credits:createjs.Text;
  let label_bet:createjs.Text;
  let reelsVelocity:number = 30;
  let spinReels:boolean[] = [false, false, false];
  let spinReelsTimeInMilliseconds:number = 1000;
  
  let theme = 0;
  let themes = [
    {
      name:'theme2',
      machine:'./assets/images/slot2-640.png', 
      spin:{
        pos:{x:497, y:386},
        image:'./assets/images/spin.png'
      },
      reels:{
          img:'./assets/images/reel-all.png',
          pos_x_reels:[98, 270, 435],
          pos_y_items:[230, 10, -132, -259, -396, -536, -668, -810, -940]
        },
    // blank = 230 | dollar = 10 | star = -132 | diamond = -259
    // watermelon = -396 | lemon = -536 | cherry = -668 | bar = -810
    // seven = -940
    },
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

    function sleep (time:number) {
        return new Promise((resolve) => setTimeout(resolve, time));
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
    // check if reels need to move 
    if (spinReels[0]){
        reel_1.y += reelsVelocity;
    }
    if (spinReels[1]){
        reel_2.y += reelsVelocity;
    }
    if (spinReels[2]){
        reel_3.y += reelsVelocity;
    }
    //check if reels hit the end and reset it
    if (reel_1.y > themes[theme].reels.pos_y_items[0]){
        reel_1.y = themes[theme].reels.pos_y_items[8];
    }
    if (reel_2.y > themes[theme].reels.pos_y_items[0]){
        reel_2.y = themes[theme].reels.pos_y_items[8];
    }
    if (reel_3.y > themes[theme].reels.pos_y_items[0]){
        reel_3.y = themes[theme].reels.pos_y_items[8];
    }
  }

  /**
   * It checks if a number is in a range
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
   * Generates random numbers from min to max
   *
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  function generateRandomNumber(min:number, max:number):number{
    //return Math.floor((Math.random() * max) + min);
    // new random calc to deal with negatives
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Calculate the Reels' spin
   *
   * @returns {Array<number>}
   */
  function Reels(): Array<number> {
    let outCome: Array<number> = [0, 0, 0];
    let betLine:Array<number> = [];
    //results = themes[theme].reels2.pos_y_items.map(e => {return {item:e, total:0}});
    results = themes[theme].reels.pos_y_items.map(e => {return 0});
    for (let spin:number = 0; spin < 3; spin++) {
      outCome[spin] = generateRandomNumber(1, 65);
      switch (outCome[spin]) {
        case checkRange(outCome[spin], 1, 27):  // 41.5% probability
          betLine[spin] = 0
          results[0]++;
          break;
        case checkRange(outCome[spin], 28, 37): // 15.4% probability
          betLine[spin] = 1;
          results[1]++;
          break;
        case checkRange(outCome[spin], 38, 46): // 13.8% probability
          betLine[spin] = 2;
          results[2]++;
          break;
        case checkRange(outCome[spin], 47, 54): // 12.3% probability
            betLine[spin] = 3;
            results[3]++;
            break;
        case checkRange(outCome[spin], 55, 59): //  7.7% probability
            betLine[spin] = 4;
            results[4]++;
            break;
        case checkRange(outCome[spin], 60, 62): //  4.6% probability
            betLine[spin] = 5;
            results[5]++;
            break;
        case checkRange(outCome[spin], 63, 64): //  3.1% probability
            betLine[spin] = 6;
            results[6]++;
            break;
        case checkRange(outCome[spin], 65, 65): //  1.5% probability
            betLine[spin] = 7;
            results[7]++;
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
    
    reel_1 = new createjs.Bitmap(themes[theme].reels.img);
    reel_1.x = themes[theme].reels.pos_x_reels[0];
    reel_1.y = themes[theme].reels.pos_y_items[0];
    //reel_1.y = -940;
    stage.addChild(reel_1);

    reel_2 = new createjs.Bitmap(themes[theme].reels.img);
    reel_2.x = themes[theme].reels.pos_x_reels[1];
    reel_2.y = themes[theme].reels.pos_y_items[0];
    stage.addChild(reel_2);

    reel_3 = new createjs.Bitmap(themes[theme].reels.img);
    reel_3.x = themes[theme].reels.pos_x_reels[2];
    reel_3.y = themes[theme].reels.pos_y_items[0];
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
        spinReels = [true, true, true];
        // positioning the reels in random places to be async
        reel_1.y = generateRandomNumber(themes[theme].reels.pos_y_items[8], themes[theme].reels.pos_y_items[0]);
        reel_2.y = generateRandomNumber(themes[theme].reels.pos_y_items[8], themes[theme].reels.pos_y_items[0]);
        reel_3.y = generateRandomNumber(themes[theme].reels.pos_y_items[8], themes[theme].reels.pos_y_items[0]);
        let spinResult:Array<number> = Reels();
        //the reels stops one by one
        sleep(spinReelsTimeInMilliseconds).then(() => {
            spinReels[0] = false;
            reel_1.y = themes[theme].reels.pos_y_items[spinResult[0]];
            sleep(spinReelsTimeInMilliseconds).then(() => {
                spinReels[1] = false;
                reel_2.y = themes[theme].reels.pos_y_items[spinResult[1]];
                sleep(spinReelsTimeInMilliseconds).then(() => {
                    spinReels[2] = false;
                    reel_3.y = themes[theme].reels.pos_y_items[spinResult[2]];
                    determineWinnings();
                });
            });
        });
    });
  }

  /**
   * This function calculates the player's winnings, if any
   */ 
  function determineWinnings():void
  {
    if (results[0] === 0)
    {
        if (results[1] === 3){ 
          winnings = playerBet * 10;
        }
        else if (results[2] === 3){
            winnings = playerBet * 20;
        }
        else if (results[3] === 3){
            winnings = playerBet * 30;
        }
        else if (results[4] === 3){
            winnings = playerBet * 40;
        }
        else if (results[5] === 3){
            winnings = playerBet * 50;
        }
        else if (results[6] === 3){
            winnings = playerBet * 75;
        }
        else if (results[7] === 3){
            winnings = playerBet * 100;
        }
        else if (results[1] === 2){
            winnings = playerBet * 2;
        }
        else if (results[2] === 2){
            winnings = playerBet * 2;
        }
        else if (results[3] === 2){
            winnings = playerBet * 3;
        }
        else if (results[4] === 2){
            winnings = playerBet * 4;
        }
        else if (results[5] === 2){
            winnings = playerBet * 5;
        }
        else if (results[6] === 2){
            winnings = playerBet * 10;
        }
        else if (results[7] === 2){
            winnings = playerBet * 20;
        }
        else if (results[7] === 1){
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
    let jackPotTry:number = generateRandomNumber(1, 51);
    let jackPotWin:number = generateRandomNumber(1, 51);
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
    results.forEach(r => r = 0);
}

  window.addEventListener("load", Start);
})();