"use strict";
(function () {
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var reel_1;
    var reel_2;
    var reel_3;
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
        var results = themes[theme].reels.images.map(function (e) { return { item: e, total: 0 }; });
        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 65):
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
        });
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map