"use strict";
(function () {
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var startScene;
    var currentSceneState;
    var currentScene;
    function Start() {
        console.log("%c Game Started", "color: blue; font-size:20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        config.Game.STAGE = stage;
        startScene = new scenes.Start();
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        currentSceneState = scenes.State.NO_SCENE;
        Main();
    }
    function Update() {
        stage.update();
        startScene.Update();
    }
    function checkBounds() {
    }
    function Main() {
        console.log("%c Main Started", "color: green; font-size:16px;");
        stage.addChild(startScene);
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map