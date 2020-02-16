/** 
 * Author:      Jovane Marques - 300982100
 * Create at:   Jan 20th, 2020
 * Description: Main file of the Slot Machine Game
 * 
 * Revisions:   Jan 20th, 2020 - Creation
*/
(function () {
  let canvas = document.getElementsByTagName('canvas')[0];
  let stage: createjs.Stage;
  let reel_1: createjs.Bitmap;
  let reel_2: createjs.Bitmap;
  let reel_3: createjs.Bitmap;
  let reel_4: createjs.Bitmap;
  let reel_5: createjs.Bitmap;
  let results:number[] = [];
  let winnings: number = 0;
  let playerBet: number = 100;
  let playerMoney: number = 1000;
  let jackpot: number = 5000;
  let winNumber: number = 0;
  let lossNumber: number = 0;
  let label_winnings:createjs.Text;
  let label_jackpot:createjs.Text;
  let label_credits:createjs.Text;
  let label_bet:createjs.Text;
  let reelsVelocity:number = 30;
  let spinReels:boolean[] = [false, false, false, false, false];
  let spinReelsTimeInMilliseconds:number = 500;
  let btn_spin:objects.Button;
  let btn_bet_add10:objects.Button;
  let btn_bet_subtract10:objects.Button;
  let btn_reset:objects.Button;
  
  let theme = 0;
  let themes = [
    // {
    //   name:'theme2',
    //   machine:'./assets/images/slot2-640.png', 
    //   spin:{
    //     pos:{x:497, y:386},
    //     image:'./assets/images/spin.png'
    //   },
    //   reels:{
    //       img:'./assets/images/reel-all.png',
    //       pos_x_reels:[98, 270, 435],
    //       pos_y_items:[230, 10, -132, -259, -396, -536, -668, -810, -940]
    //     },
    // },
    {
        name:'theme-dont-starve',
        //double layers to put the reels on the middle
        machine1:'./assets/images/ds-bg1.png', 
        machine2:'./assets/images/ds-bg2.png', 
        spin:{
          pos:{x:600, y:520},
          image:'./assets/images/ds-spin-on.png',
        },
        bet:{
            add_10:{
                pos:{x:10, y:520},
                image:'./assets/images/ds-bet-add10.png'
            },
            subtract_10:{
                pos:{x:205, y:520},
                image:'./assets/images/ds-bet-subtract10.png'
            },
        },
        reset:{
            pos:{x:405, y:520},
            image:'./assets/images/ds-reset.png'
        },
        reels:{
            img:'./assets/images/ds-reels.png', // machine
            pos_x_reels:[140, 260, 380, 500, 620], //reels
            pos_y_items:[185, 85, -20, -130, -235, -335, -435, -535] // items
        },
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
    label_winnings.text = 'Wins : ' + winNumber.toString();
    label_jackpot.text = 'Jackpot : $' + jackpot.toString();
    label_credits.text = 'Money : $' + playerMoney.toString(); 
    label_bet.text = 'Bet : $' + playerBet.toString(); 
    //check if reels need to move 
    if (spinReels[0]){
        reel_1.y += reelsVelocity;
    }
    if (spinReels[1]){
        reel_2.y += reelsVelocity;
    }
    if (spinReels[2]){
        reel_3.y += reelsVelocity;
    }
    if (spinReels[3]){
        reel_4.y += reelsVelocity;
    }
    if (spinReels[4]){
        reel_5.y += reelsVelocity;
    }
    //check if reels hit the end and reset it
    if (reel_1.y > themes[theme].reels.pos_y_items[0]){
        reel_1.y = themes[theme].reels.pos_y_items[7];
    }
    if (reel_2.y > themes[theme].reels.pos_y_items[0]){
        reel_2.y = themes[theme].reels.pos_y_items[7];
    }
    if (reel_3.y > themes[theme].reels.pos_y_items[0]){
        reel_3.y = themes[theme].reels.pos_y_items[7];
    }
    if (reel_4.y > themes[theme].reels.pos_y_items[0]){
        reel_4.y = themes[theme].reels.pos_y_items[7];
    }
    if (reel_5.y > themes[theme].reels.pos_y_items[0]){
        reel_5.y = themes[theme].reels.pos_y_items[7];
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
    let outCome: Array<number> = [0, 0, 0, 0, 0];
    let betLine:Array<number> = [];
    //results = themes[theme].reels2.pos_y_items.map(e => {return {item:e, total:0}});
    results = themes[theme].reels.pos_y_items.map(e => {return 0});
    for (let spin:number = 0; spin < 5; spin++) {
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

    // if initializeDefaultPlugins returns false, we cannot play sound in this browser
    if (!createjs.Sound.initializeDefaultPlugins()) { 
        console.log('cannot play sound in this browser');
        return;
    }

    var audioPath = "./assets/sounds/";
    var sounds = [
        {id:"Music", src:"Dont Starve OST - Dont Starve Theme.mp3"},
    ];
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.addEventListener("fileload", (event:createjs.AbstractSoundInstance) => {
        createjs.Sound.play(event.src);
    });
    createjs.Sound.registerSounds(sounds, audioPath);

    //bf first layer
    let bg_back = new createjs.Bitmap(themes[theme].machine1);
    stage.addChild(bg_back);

    reel_1 = new createjs.Bitmap(themes[theme].reels.img);
    reel_1.x = themes[theme].reels.pos_x_reels[0];
    reel_1.y = themes[theme].reels.pos_y_items[1];// second item aligned to the 2 line
    stage.addChild(reel_1);

    reel_2 = new createjs.Bitmap(themes[theme].reels.img);
    reel_2.x = themes[theme].reels.pos_x_reels[1];
    reel_2.y = themes[theme].reels.pos_y_items[1];
    //pos_y_items:[185, 85, -20, -145, -255, -345, -445, -545] // items
    //reel_2.y = -535; //185, 85, -20, -130, -235, -335, -435, -535
    stage.addChild(reel_2);

    reel_3 = new createjs.Bitmap(themes[theme].reels.img);
    reel_3.x = themes[theme].reels.pos_x_reels[2];
    reel_3.y = themes[theme].reels.pos_y_items[1];
    stage.addChild(reel_3);

    reel_4 = new createjs.Bitmap(themes[theme].reels.img);
    reel_4.x = themes[theme].reels.pos_x_reels[3];
    reel_4.y = themes[theme].reels.pos_y_items[1];
    stage.addChild(reel_4);

    reel_5 = new createjs.Bitmap(themes[theme].reels.img);
    reel_5.x = themes[theme].reels.pos_x_reels[4];
    reel_5.y = themes[theme].reels.pos_y_items[1];
    stage.addChild(reel_5);
    
    //bg second layer
    let bg_front = new createjs.Bitmap(themes[theme].machine2);
    stage.addChild(bg_front);
    
    btn_spin = new objects.Button(themes[theme].spin.image, themes[theme].spin.pos.x, themes[theme].spin.pos.y, false);
    stage.addChild(btn_spin);

    btn_bet_add10 = new objects.Button(themes[theme].bet.add_10.image, themes[theme].bet.add_10.pos.x, themes[theme].bet.add_10.pos.y, false);
    stage.addChild(btn_bet_add10);

    btn_bet_add10.on("click", function(){
        playerBet += 10;
    });

    btn_bet_subtract10 = new objects.Button(themes[theme].bet.subtract_10.image, themes[theme].bet.subtract_10.pos.x, themes[theme].bet.subtract_10.pos.y, false);
    stage.addChild(btn_bet_subtract10);

    btn_bet_subtract10.on("click", function(){
        playerBet -= 10;
    });

    btn_reset = new objects.Button(themes[theme].reset.image, themes[theme].reset.pos.x, themes[theme].reset.pos.y, false);
    stage.addChild(btn_reset);

    btn_reset.on("click", function(){
        winnings = 0;
        playerBet = 100;
        playerMoney = 1000;
        jackpot = 5000;
        winNumber = 0;
        lossNumber = 0;
        reel_1.y = themes[theme].reels.pos_y_items[1];
        reel_2.y = themes[theme].reels.pos_y_items[1];
        reel_3.y = themes[theme].reels.pos_y_items[1];
        reel_4.y = themes[theme].reels.pos_y_items[1];
        reel_5.y = themes[theme].reels.pos_y_items[1];
    });

    label_credits = new objects.Label(playerMoney.toString(), void 0, void 0, void 0, 20, 20, false);
    stage.addChild(label_credits);

    label_winnings = new objects.Label(playerMoney.toString(), void 0, void 0, void 0, 20, 60, false);
    stage.addChild(label_winnings);

    label_jackpot = new objects.Label(playerMoney.toString(), void 0, void 0, void 0, 20, 100, false);
    stage.addChild(label_jackpot);

    label_bet = new objects.Label(playerMoney.toString(), void 0, void 0, void 0, 20, 150, false);
    stage.addChild(label_bet);

    btn_spin.on("click", function(){
        createjs.WebAudioPlugin.context.resume();//chrome does not allow the auto play
        if (playerMoney > playerBet){ //verify if player have money to play
            if (!spinReels[0] && !spinReels[1] && !spinReels[2] && !spinReels[3] && !spinReels[4]){ //allowing one click per spin
                spinReels = [true, true, true, true, true];
                // positioning the reels in random places to be async
                reel_1.y = generateRandomNumber(themes[theme].reels.pos_y_items[7], themes[theme].reels.pos_y_items[0]);
                reel_2.y = generateRandomNumber(themes[theme].reels.pos_y_items[7], themes[theme].reels.pos_y_items[0]);
                reel_3.y = generateRandomNumber(themes[theme].reels.pos_y_items[7], themes[theme].reels.pos_y_items[0]);
                reel_4.y = generateRandomNumber(themes[theme].reels.pos_y_items[7], themes[theme].reels.pos_y_items[0]);
                reel_5.y = generateRandomNumber(themes[theme].reels.pos_y_items[7], themes[theme].reels.pos_y_items[0]);
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
                            sleep(spinReelsTimeInMilliseconds).then(() => {
                                spinReels[3] = false;
                                reel_4.y = themes[theme].reels.pos_y_items[spinResult[3]];
                                sleep(spinReelsTimeInMilliseconds).then(() => {
                                    spinReels[4] = false;
                                    reel_5.y = themes[theme].reels.pos_y_items[spinResult[4]];
                                    determineWinnings();
                                });
                            });
                        });
                    });
                });
            } else {
                console.log('The reels are running already.'); //TODO: change to a label msg
            }
        } else {
            console.log('Player do not have money to play.'); //TODO: change to a label msg
            
        }
    });
  }

  /**
   * This function calculates the player's winnings, if any
   */ 
  function determineWinnings():void
  {
    if (results[0] < 2) // allowing one item zero because w/ 5 reels it bacomes umbalanced 
    {
        if (results[1] === 5){ 
            winnings = playerBet * 210;
        }
        else if (results[2] === 5){
            winnings = playerBet * 220;
        }
        else if (results[3] === 5){
            winnings = playerBet * 230;
        }
        else if (results[4] === 5){
            winnings = playerBet * 240;
        }
        else if (results[5] === 5){
            winnings = playerBet * 250;
        }
        else if (results[6] === 5){
            winnings = playerBet * 375;
        }
        else if (results[7] === 5){
            winnings = playerBet * 500;
        }
        else if (results[1] === 4){ 
            winnings = playerBet * 110;
        }
        else if (results[2] === 4){
            winnings = playerBet * 120;
        }
        else if (results[3] === 4){
            winnings = playerBet * 130;
        }
        else if (results[4] === 4){
            winnings = playerBet * 140;
        }
        else if (results[5] === 4){
            winnings = playerBet * 150;
        }
        else if (results[6] === 4){
            winnings = playerBet * 175;
        }
        else if (results[7] === 4){
            winnings = playerBet * 200;
        }
        else if (results[1] === 3){ 
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