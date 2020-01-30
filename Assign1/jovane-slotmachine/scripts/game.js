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
    var themes = [
        {
            name: 'theme1',
            machine: './assets/images/machine.png',
            spin: {
                pos: { x: 98, y: 145 },
                image: './assets/images/spin.png'
            },
            reels: {
                pos_reel_1: { x: 142.5, y: 85 },
                pos_reel_2: { x: 267, y: 85 },
                pos_reel_3: { x: 388, y: 85 },
                images: [
                    './assets/images/reel-blank.png',
                    './assets/images/reel-bar.png',
                    './assets/images/reel-cherry.png',
                    './assets/images/reel-dollar.png',
                    './assets/images/reel-star.png',
                    './assets/images/reel-watermelon.png',
                    './assets/images/reel-lemon.png',
                    './assets/images/reel-7.png',
                ]
            }
        },
        {
            name: 'theme2',
            machine: './assets/images/slot2-640.png',
            spin: {
                pos: { x: 497, y: 386 },
                image: './assets/images/spin.png'
            },
            reels: {
                pos_reel_1: { x: 98, y: 145 },
                pos_reel_2: { x: 270, y: 145 },
                pos_reel_3: { x: 435, y: 145 },
                images: [
                    './assets/images/reel-blank.png',
                    './assets/images/reel-bar.png',
                    './assets/images/reel-cherry.png',
                    './assets/images/reel-dollar.png',
                    './assets/images/reel-star.png',
                    './assets/images/reel-watermelon.png',
                    './assets/images/reel-lemon.png',
                    './assets/images/reel-7.png',
                ]
            }
        },
        {
            name: 'theme3',
            machine: './assets/images/slot4.png',
            spin: {
                pos: { x: 98, y: 145 },
                image: './assets/images/spin.png'
            },
            reels: {
                pos_reel_1: { x: 142.5, y: 85 },
                pos_reel_2: { x: 267, y: 85 },
                pos_reel_3: { x: 388, y: 85 },
                images: [
                    './assets/images/reel-blank.png',
                    './assets/images/reel-bar.png',
                    './assets/images/reel-cherry.png',
                    './assets/images/reel-dollar.png',
                    './assets/images/reel-star.png',
                    './assets/images/reel-watermelon.png',
                    './assets/images/reel-lemon.png',
                    './assets/images/reel-7.png',
                ]
            }
        }
    ];
    var theme = 1;
    function Start() {
        console.log("%c Slot Machine Started", "color: green; font-size:15px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Main();
    }
    function Update() {
        stage.update();
    }
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    function Reels() {
        var outCome = [0, 0, 0];
        var betLine = [];
        results = themes[theme].reels.images.map(function (e) { return { item: e, total: 0 }; });
        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27):
                    betLine[spin] = 0;
                    results[0].total++;
                    break;
                case checkRange(outCome[spin], 28, 37):
                    betLine[spin] = 1;
                    results[1].total++;
                    break;
                case checkRange(outCome[spin], 38, 46):
                    betLine[spin] = 2;
                    results[2].total++;
                    break;
                case checkRange(outCome[spin], 47, 54):
                    betLine[spin] = 3;
                    results[3].total++;
                    break;
                case checkRange(outCome[spin], 55, 59):
                    betLine[spin] = 4;
                    results[4].total++;
                    break;
                case checkRange(outCome[spin], 60, 62):
                    betLine[spin] = 5;
                    results[5].total++;
                    break;
                case checkRange(outCome[spin], 63, 64):
                    betLine[spin] = 6;
                    results[6].total++;
                    break;
                case checkRange(outCome[spin], 65, 65):
                    betLine[spin] = 7;
                    results[7].total++;
                    break;
            }
        }
        return betLine;
    }
    function Main() {
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
        var bg = new createjs.Bitmap(themes[theme].machine);
        stage.addChild(bg);
        var btn_spin = new createjs.Bitmap(themes[theme].spin.image);
        btn_spin.x = themes[theme].spin.pos.x;
        btn_spin.y = themes[theme].spin.pos.y;
        btn_spin.cursor = "pointer";
        stage.addChild(btn_spin);
        btn_spin.on("click", function () {
            var spinResult = Reels();
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
    function determineWinnings() {
        if (results[0].total === 0) {
            if (results[1].total === 3) {
                winnings = playerBet * 10;
            }
            else if (results[2].total === 3) {
                winnings = playerBet * 20;
            }
            else if (results[3].total === 3) {
                winnings = playerBet * 30;
            }
            else if (results[4].total === 3) {
                winnings = playerBet * 40;
            }
            else if (results[5].total === 3) {
                winnings = playerBet * 50;
            }
            else if (results[6].total === 3) {
                winnings = playerBet * 75;
            }
            else if (results[7].total === 3) {
                winnings = playerBet * 100;
            }
            else if (results[1].total === 2) {
                winnings = playerBet * 2;
            }
            else if (results[2].total === 2) {
                winnings = playerBet * 2;
            }
            else if (results[3].total === 2) {
                winnings = playerBet * 3;
            }
            else if (results[4].total === 2) {
                winnings = playerBet * 4;
            }
            else if (results[5].total === 2) {
                winnings = playerBet * 5;
            }
            else if (results[6].total === 2) {
                winnings = playerBet * 10;
            }
            else if (results[7].total === 2) {
                winnings = playerBet * 20;
            }
            else if (results[7].total === 1) {
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
        alert('You Won: $' + winnings);
    }
    function checkJackPot() {
        var jackPotTry = Math.floor(Math.random() * 51 + 1);
        var jackPotWin = Math.floor(Math.random() * 51 + 1);
        if (jackPotTry == jackPotWin) {
            alert("You Won the $" + jackpot + " Jackpot!!");
            playerMoney += jackpot;
            jackpot = 1000;
        }
    }
    function showLossMessage() {
        playerMoney -= playerBet;
        resetFruitTally();
        alert('You Lost!');
    }
    function resetFruitTally() {
        results.forEach(function (r) { return r.total = 0; });
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map