"use strict";
(function () {
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var helloLabel;
    var goodByeLabel;
    var clickMeButton;
    var dy = 2;
    function Start() {
        console.log("%c Game Started", "color: blue; font-size:20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Main();
    }
    function Update() {
        helloLabel.rotation += 5;
        goodByeLabel.y += dy;
        checkBounds();
        stage.update();
    }
    function checkBounds() {
        if (goodByeLabel.y >= 480 - goodByeLabel.getMeasuredHeight() * 0.5) {
            dy = -2;
        }
        if (goodByeLabel.y <= goodByeLabel.getMeasuredHeight() * 0.5) {
            dy = 2;
        }
    }
    function Main() {
        console.log("%c Main Started", "color: green; font-size:16px;");
        helloLabel = new objects.Label("Hello World", "40px", "Consolas", "#000000", 320, 240, true);
        stage.addChild(helloLabel);
        goodByeLabel = new objects.Label("Good Bye", "30px", "Arial", "#FF0000", 320, 300, true);
        stage.addChild(goodByeLabel);
        clickMeButton = new objects.Button('../assets/images/button.png', 320, 400, true);
        stage.addChild(clickMeButton);
        clickMeButton.on("click", function () {
            helloLabel.text = "Click Me!";
        });
        clickMeButton.on("mouseover", function () {
            clickMeButton.alpha = 0.7;
        });
        clickMeButton.on("mousoute", function () {
            clickMeButton.alpha = 1.0;
        });
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map