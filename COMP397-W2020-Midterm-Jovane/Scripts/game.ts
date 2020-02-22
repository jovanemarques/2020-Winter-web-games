//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let currentSceneState:scenes.State;
    let currentScene: objects.Scene;

    let assets: createjs.LoadQueue;

    let assetManifest = 
    [
        {id:"_startBonusButton", src:"./Assets/images/buttonBonus.png"},
        {id:"diceTable", src:"./Assets/images/table.png"},
        {id:"diceBlank", src:"./Assets/images/blank.png"},
        {id:"dice1", src:"./Assets/images/1.png"},
        {id:"dice2", src:"./Assets/images/2.png"},
        {id:"dice3", src:"./Assets/images/3.png"},
        {id:"dice4", src:"./Assets/images/4.png"},
        {id:"dice5", src:"./Assets/images/5.png"},
        {id:"dice6", src:"./Assets/images/6.png"},
        {id:"rollButton", src:"./Assets/images/rollButton.png"},
        {id:"button", src:"./Assets/images/button.png"},
        {id:"placeholder", src:"./Assets/images/placeholder.png"},
        {id:"startButton", src:"./Assets/images/startButton.png"},
        {id:"nextButton", src:"./Assets/images/nextButton.png"},
        {id:"backButton", src:"./Assets/images/backButton.png"},
    ];

    function Preload():void
    {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start():void
    {
        console.log(`%c Game Started!`, "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn 
     */
    function Update():void
    {
        if(currentSceneState != config.Game.SCENE)
        {
            Main();
        }

        currentScene.Update();
        


        stage.update();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Scene Switched...`, "color: green; font-size: 16px;");

        // clean up
        if(currentSceneState != scenes.State.NO_SCENE)
        {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }

        // switch to the new scene

        switch(config.Game.SCENE)
        {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start(); 
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play(); 
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End(); 
                break;
            case scenes.State.PLAY_BONUS:
                console.log("switch to Play Bonus Scene");
                currentScene = new scenes.PlayBonus(); 
                break;
        }

        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);

    }

    window.addEventListener('load', Preload);


})();