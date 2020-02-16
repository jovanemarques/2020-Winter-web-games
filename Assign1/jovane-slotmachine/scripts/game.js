"use strict";
(function () {
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var reel_1;
    var reel_2;
    var reel_3;
    var results = [];
    var winnings = 0;
    var playerBet = 10;
    var playerMoney = 1000;
    var jackpot = 5000;
    var winNumber = 0;
    var lossNumber = 0;
    var label_winnings;
    var label_credits;
    var label_bet;
    var reelsVelocity = 30;
    var spinReels = [false, false, false];
    var spinReelsTimeInMilliseconds = 1000;
    var theme = 0;
    var themes = [
        {
            name: 'theme2',
            machine: './assets/images/slot2-640.png',
            spin: {
                pos: { x: 497, y: 386 },
                image: './assets/images/spin.png'
            },
            reels: {
                img: './assets/images/reel-all.png',
                pos_x_reels: [98, 270, 435],
                pos_y_items: [230, 10, -132, -259, -396, -536, -668, -810, -940]
            },
        },
    ];
    function Start() {
        console.log("%c Slot Machine Started", "color: green; font-size:15px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Main();
    }
    function sleep(time) {
        return new Promise(function (resolve) { return setTimeout(resolve, time); });
    }
    function Update() {
        stage.update();
        label_winnings.text = winNumber.toString();
        label_credits.text = playerMoney.toString();
        label_bet.text = playerBet.toString();
        if (spinReels[0]) {
            reel_1.y += reelsVelocity;
        }
        if (spinReels[1]) {
            reel_2.y += reelsVelocity;
        }
        if (spinReels[2]) {
            reel_3.y += reelsVelocity;
        }
        if (reel_1.y > themes[theme].reels.pos_y_items[0]) {
            reel_1.y = themes[theme].reels.pos_y_items[8];
        }
        if (reel_2.y > themes[theme].reels.pos_y_items[0]) {
            reel_2.y = themes[theme].reels.pos_y_items[8];
        }
        if (reel_3.y > themes[theme].reels.pos_y_items[0]) {
            reel_3.y = themes[theme].reels.pos_y_items[8];
        }
    }
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function Reels() {
        var outCome = [0, 0, 0];
        var betLine = [];
        results = themes[theme].reels.pos_y_items.map(function (e) { return 0; });
        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = generateRandomNumber(1, 65);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27):
                    betLine[spin] = 0;
                    results[0]++;
                    break;
                case checkRange(outCome[spin], 28, 37):
                    betLine[spin] = 1;
                    results[1]++;
                    break;
                case checkRange(outCome[spin], 38, 46):
                    betLine[spin] = 2;
                    results[2]++;
                    break;
                case checkRange(outCome[spin], 47, 54):
                    betLine[spin] = 3;
                    results[3]++;
                    break;
                case checkRange(outCome[spin], 55, 59):
                    betLine[spin] = 4;
                    results[4]++;
                    break;
                case checkRange(outCome[spin], 60, 62):
                    betLine[spin] = 5;
                    results[5]++;
                    break;
                case checkRange(outCome[spin], 63, 64):
                    betLine[spin] = 6;
                    results[6]++;
                    break;
                case checkRange(outCome[spin], 65, 65):
                    betLine[spin] = 7;
                    results[7]++;
                    break;
            }
        }
        return betLine;
    }
    function Main() {
        console.log("%c Main Started", "color: green; font-size:16px;");
        reel_1 = new createjs.Bitmap(themes[theme].reels.img);
        reel_1.x = themes[theme].reels.pos_x_reels[0];
        reel_1.y = themes[theme].reels.pos_y_items[0];
        stage.addChild(reel_1);
        reel_2 = new createjs.Bitmap(themes[theme].reels.img);
        reel_2.x = themes[theme].reels.pos_x_reels[1];
        reel_2.y = themes[theme].reels.pos_y_items[0];
        stage.addChild(reel_2);
        reel_3 = new createjs.Bitmap(themes[theme].reels.img);
        reel_3.x = themes[theme].reels.pos_x_reels[2];
        reel_3.y = themes[theme].reels.pos_y_items[0];
        stage.addChild(reel_3);
        var bg = new createjs.Bitmap(themes[theme].machine);
        stage.addChild(bg);
        var btn_spin = new createjs.Bitmap(themes[theme].spin.image);
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
        btn_spin.on("click", function () {
            spinReels = [true, true, true];
            reel_1.y = generateRandomNumber(themes[theme].reels.pos_y_items[8], themes[theme].reels.pos_y_items[0]);
            reel_2.y = generateRandomNumber(themes[theme].reels.pos_y_items[8], themes[theme].reels.pos_y_items[0]);
            reel_3.y = generateRandomNumber(themes[theme].reels.pos_y_items[8], themes[theme].reels.pos_y_items[0]);
            var spinResult = Reels();
            sleep(spinReelsTimeInMilliseconds).then(function () {
                spinReels[0] = false;
                reel_1.y = themes[theme].reels.pos_y_items[spinResult[0]];
                sleep(spinReelsTimeInMilliseconds).then(function () {
                    spinReels[1] = false;
                    reel_2.y = themes[theme].reels.pos_y_items[spinResult[1]];
                    sleep(spinReelsTimeInMilliseconds).then(function () {
                        spinReels[2] = false;
                        reel_3.y = themes[theme].reels.pos_y_items[spinResult[2]];
                        determineWinnings();
                    });
                });
            });
        });
    }
    function determineWinnings() {
        if (results[0] === 0) {
            if (results[1] === 3) {
                winnings = playerBet * 10;
            }
            else if (results[2] === 3) {
                winnings = playerBet * 20;
            }
            else if (results[3] === 3) {
                winnings = playerBet * 30;
            }
            else if (results[4] === 3) {
                winnings = playerBet * 40;
            }
            else if (results[5] === 3) {
                winnings = playerBet * 50;
            }
            else if (results[6] === 3) {
                winnings = playerBet * 75;
            }
            else if (results[7] === 3) {
                winnings = playerBet * 100;
            }
            else if (results[1] === 2) {
                winnings = playerBet * 2;
            }
            else if (results[2] === 2) {
                winnings = playerBet * 2;
            }
            else if (results[3] === 2) {
                winnings = playerBet * 3;
            }
            else if (results[4] === 2) {
                winnings = playerBet * 4;
            }
            else if (results[5] === 2) {
                winnings = playerBet * 5;
            }
            else if (results[6] === 2) {
                winnings = playerBet * 10;
            }
            else if (results[7] === 2) {
                winnings = playerBet * 20;
            }
            else if (results[7] === 1) {
                winnings = playerBet * 5;
            }
            else {
                winnings = playerBet * 1;
            }
            winNumber++;
            showWinMessage(winnings);
        }
        else {
            lossNumber++;
            showLossMessage();
        }
    }
    function showWinMessage(winnings) {
        playerMoney += winnings;
        resetFruitTally();
        checkJackPot();
        console.log('You Won: $' + winnings);
    }
    function checkJackPot() {
        var jackPotTry = generateRandomNumber(1, 51);
        var jackPotWin = generateRandomNumber(1, 51);
        if (jackPotTry == jackPotWin) {
            console.log("You Won the $" + jackpot + " Jackpot!!");
            playerMoney += jackpot;
            jackpot = 1000;
        }
    }
    function showLossMessage() {
        playerMoney -= playerBet;
        resetFruitTally();
        console.log('You Lost!');
    }
    function resetFruitTally() {
        results.forEach(function (r) { return r = 0; });
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map