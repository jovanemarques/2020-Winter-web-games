"use strict";
(function () {
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var reel_1;
    var reel_2;
    var reel_3;
    var reel_4;
    var reel_5;
    var results = [];
    var winnings = 0;
    var playerBet = 100;
    var playerMoney = 1000;
    var jackpot = 5000;
    var winNumber = 0;
    var lossNumber = 0;
    var label_winnings;
    var label_jackpot;
    var label_credits;
    var label_bet;
    var reelsVelocity = 30;
    var spinReels = [false, false, false, false, false];
    var spinReelsTimeInMilliseconds = 500;
    var btn_spin;
    var btn_bet_add10;
    var btn_bet_subtract10;
    var btn_reset;
    var theme = 0;
    var themes = [
        {
            name: 'theme-dont-starve',
            machine1: './assets/images/ds-bg1.png',
            machine2: './assets/images/ds-bg2.png',
            spin: {
                pos: { x: 600, y: 520 },
                image: './assets/images/ds-spin-on.png',
            },
            bet: {
                add_10: {
                    pos: { x: 10, y: 520 },
                    image: './assets/images/ds-bet-add10.png'
                },
                subtract_10: {
                    pos: { x: 205, y: 520 },
                    image: './assets/images/ds-bet-subtract10.png'
                },
            },
            reset: {
                pos: { x: 405, y: 520 },
                image: './assets/images/ds-reset.png'
            },
            reels: {
                img: './assets/images/ds-reels.png',
                pos_x_reels: [140, 260, 380, 500, 620],
                pos_y_items: [185, 85, -20, -130, -235, -335, -435, -535]
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
        label_winnings.text = 'Wins : ' + winNumber.toString();
        label_jackpot.text = 'Jackpot : $' + jackpot.toString();
        label_credits.text = 'Money : $' + playerMoney.toString();
        label_bet.text = 'Bet : $' + playerBet.toString();
        if (spinReels[0]) {
            reel_1.y += reelsVelocity;
        }
        if (spinReels[1]) {
            reel_2.y += reelsVelocity;
        }
        if (spinReels[2]) {
            reel_3.y += reelsVelocity;
        }
        if (spinReels[3]) {
            reel_4.y += reelsVelocity;
        }
        if (spinReels[4]) {
            reel_5.y += reelsVelocity;
        }
        if (reel_1.y > themes[theme].reels.pos_y_items[0]) {
            reel_1.y = themes[theme].reels.pos_y_items[7];
        }
        if (reel_2.y > themes[theme].reels.pos_y_items[0]) {
            reel_2.y = themes[theme].reels.pos_y_items[7];
        }
        if (reel_3.y > themes[theme].reels.pos_y_items[0]) {
            reel_3.y = themes[theme].reels.pos_y_items[7];
        }
        if (reel_4.y > themes[theme].reels.pos_y_items[0]) {
            reel_4.y = themes[theme].reels.pos_y_items[7];
        }
        if (reel_5.y > themes[theme].reels.pos_y_items[0]) {
            reel_5.y = themes[theme].reels.pos_y_items[7];
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
        var outCome = [0, 0, 0, 0, 0];
        var betLine = [];
        results = themes[theme].reels.pos_y_items.map(function (e) { return 0; });
        for (var spin = 0; spin < 5; spin++) {
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
        if (!createjs.Sound.initializeDefaultPlugins()) {
            console.log('cannot play sound in this browser');
            return;
        }
        var audioPath = "./assets/sounds/";
        var sounds = [
            { id: "Music", src: "Dont Starve OST - Dont Starve Theme.mp3" },
        ];
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.addEventListener("fileload", function (event) {
            createjs.Sound.play(event.src);
        });
        createjs.Sound.registerSounds(sounds, audioPath);
        var bg_back = new createjs.Bitmap(themes[theme].machine1);
        stage.addChild(bg_back);
        reel_1 = new createjs.Bitmap(themes[theme].reels.img);
        reel_1.x = themes[theme].reels.pos_x_reels[0];
        reel_1.y = themes[theme].reels.pos_y_items[1];
        stage.addChild(reel_1);
        reel_2 = new createjs.Bitmap(themes[theme].reels.img);
        reel_2.x = themes[theme].reels.pos_x_reels[1];
        reel_2.y = themes[theme].reels.pos_y_items[1];
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
        var bg_front = new createjs.Bitmap(themes[theme].machine2);
        stage.addChild(bg_front);
        btn_spin = new objects.Button(themes[theme].spin.image, themes[theme].spin.pos.x, themes[theme].spin.pos.y, false);
        stage.addChild(btn_spin);
        btn_bet_add10 = new objects.Button(themes[theme].bet.add_10.image, themes[theme].bet.add_10.pos.x, themes[theme].bet.add_10.pos.y, false);
        stage.addChild(btn_bet_add10);
        btn_bet_add10.on("click", function () {
            playerBet += 10;
        });
        btn_bet_subtract10 = new objects.Button(themes[theme].bet.subtract_10.image, themes[theme].bet.subtract_10.pos.x, themes[theme].bet.subtract_10.pos.y, false);
        stage.addChild(btn_bet_subtract10);
        btn_bet_subtract10.on("click", function () {
            playerBet -= 10;
        });
        btn_reset = new objects.Button(themes[theme].reset.image, themes[theme].reset.pos.x, themes[theme].reset.pos.y, false);
        stage.addChild(btn_reset);
        btn_reset.on("click", function () {
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
        btn_spin.on("click", function () {
            createjs.WebAudioPlugin.context.resume();
            if (playerMoney > playerBet) {
                if (!spinReels[0] && !spinReels[1] && !spinReels[2] && !spinReels[3] && !spinReels[4]) {
                    spinReels = [true, true, true, true, true];
                    reel_1.y = generateRandomNumber(themes[theme].reels.pos_y_items[7], themes[theme].reels.pos_y_items[0]);
                    reel_2.y = generateRandomNumber(themes[theme].reels.pos_y_items[7], themes[theme].reels.pos_y_items[0]);
                    reel_3.y = generateRandomNumber(themes[theme].reels.pos_y_items[7], themes[theme].reels.pos_y_items[0]);
                    reel_4.y = generateRandomNumber(themes[theme].reels.pos_y_items[7], themes[theme].reels.pos_y_items[0]);
                    reel_5.y = generateRandomNumber(themes[theme].reels.pos_y_items[7], themes[theme].reels.pos_y_items[0]);
                    var spinResult_1 = Reels();
                    sleep(spinReelsTimeInMilliseconds).then(function () {
                        spinReels[0] = false;
                        reel_1.y = themes[theme].reels.pos_y_items[spinResult_1[0]];
                        sleep(spinReelsTimeInMilliseconds).then(function () {
                            spinReels[1] = false;
                            reel_2.y = themes[theme].reels.pos_y_items[spinResult_1[1]];
                            sleep(spinReelsTimeInMilliseconds).then(function () {
                                spinReels[2] = false;
                                reel_3.y = themes[theme].reels.pos_y_items[spinResult_1[2]];
                                sleep(spinReelsTimeInMilliseconds).then(function () {
                                    spinReels[3] = false;
                                    reel_4.y = themes[theme].reels.pos_y_items[spinResult_1[3]];
                                    sleep(spinReelsTimeInMilliseconds).then(function () {
                                        spinReels[4] = false;
                                        reel_5.y = themes[theme].reels.pos_y_items[spinResult_1[4]];
                                        determineWinnings();
                                    });
                                });
                            });
                        });
                    });
                }
                else {
                    console.log('The reels are running already.');
                }
            }
            else {
                console.log('Player do not have money to play.');
            }
        });
    }
    function determineWinnings() {
        if (results[0] < 2) {
            if (results[1] === 5) {
                winnings = playerBet * 210;
            }
            else if (results[2] === 5) {
                winnings = playerBet * 220;
            }
            else if (results[3] === 5) {
                winnings = playerBet * 230;
            }
            else if (results[4] === 5) {
                winnings = playerBet * 240;
            }
            else if (results[5] === 5) {
                winnings = playerBet * 250;
            }
            else if (results[6] === 5) {
                winnings = playerBet * 375;
            }
            else if (results[7] === 5) {
                winnings = playerBet * 500;
            }
            else if (results[1] === 4) {
                winnings = playerBet * 110;
            }
            else if (results[2] === 4) {
                winnings = playerBet * 120;
            }
            else if (results[3] === 4) {
                winnings = playerBet * 130;
            }
            else if (results[4] === 4) {
                winnings = playerBet * 140;
            }
            else if (results[5] === 4) {
                winnings = playerBet * 150;
            }
            else if (results[6] === 4) {
                winnings = playerBet * 175;
            }
            else if (results[7] === 4) {
                winnings = playerBet * 200;
            }
            else if (results[1] === 3) {
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