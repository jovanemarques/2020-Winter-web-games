"use strict";
(function () {
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var startLabel;
    var startButton;
    var player;
    function Start() {
        console.log("%c Game Started", "color: blue; font-size:20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Main();
    }
    function Update() {
        player.Update();
        var topLeftPlayer = new objects.Vector2(player.position.x, player.position.y);
        var topLeftButton = new objects.Vector2(startButton.position.x - startButton.halfWidth, startButton.position.y - startButton.halfHeight);
        var radii = startButton.halfHeight + startButton.halfHeight;
        if (objects.Vector2.sqrDistance(player.position, startButton.position) < (radii * radii)) {
            if (!startButton.isColliding) {
                console.log('Collision!');
                startButton.isColliding = true;
            }
            else {
                startButton.isColliding = false;
                console.log('Collision FALSE!');
            }
        }
        stage.update();
    }
    function checkBounds() {
    }
    function Main() {
        console.log("%c Main Started", "color: green; font-size:16px;");
        startLabel = new objects.Label("The Game", "80px", "Consolas", "#000000", 320, 180, true);
        stage.addChild(startLabel);
        startButton = new objects.Button('../assets/images/startButton.png', 320, 400, true);
        stage.addChild(startButton);
        startButton.on("click", function () {
            startLabel.text = "Click Me!";
        });
        console.log(startButton.position);
        player = new objects.Player();
        stage.addChild(player);
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map