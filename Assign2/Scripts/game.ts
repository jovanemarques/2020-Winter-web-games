//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let currentSceneState:scenes.State;
    let currentScene: objects.Scene;

    let assets: createjs.LoadQueue;

    let textureAtlas: createjs.SpriteSheet;
    let spaceAtlas: createjs.SpriteSheet;

    let assetManifest = 
    [
        {id:"space", src:"./Assets/images/space.png"},
        {id:"atlas-exported", src:"./Assets/sprites/atlas-exported.png"},
        {id:"theme", src:"./Assets/audio/theme.ogg"},
        {id:"pew", src:"./Assets/audio/pew.ogg"},
        {id:"poin", src:"./Assets/audio/poin.ogg"},
        {id:"game-over", src:"./Assets/audio/game-over.ogg"},
        {id:"boom", src:"./Assets/audio/boom.ogg"},
    ];

    let spriteDataNew =
    {
        "images": {},
        "frames": [
            [0, 0, 35, 27, 0, 0, 0],
            [35, 0, 9, 33, 0, 0, 0],
            [44, 0, 9, 33, 0, 0, 0],
            [53, 0, 44, 42, 0, 0, 0],
            [97, 0, 98, 50, 0, 0, 0],
            [195, 0, 56, 54, 0, 0, 0],
            [0, 42, 56, 54, 0, 0, 0],
            [56, 50, 99, 75, 0, 0, 0],
            [155, 54, 99, 75, 0, 0, 0],
            [0, 125, 90, 77, 0, 0, 0],
            [90, 129, 90, 77, 0, 0, 0],
            [0, 206, 91, 91, 0, 0, 0],
            [91, 206, 136, 111, 0, 0, 0],
            [0, 317, 151, 118, 0, 0, 0]
        ],
        "animations": {
            "life": { "frames": [0] },
            "laserGreen": { "frames": [1] },
            "laserRed": { "frames": [2] },
            "meteorSmall": { "frames": [3] },
            "enemyShip": { "frames": [4] },
            "laserGreenShot": { "frames": [5] },
            "laserRedShot": { "frames": [6] },
            "player": { "frames": [7] },
            "playerDamaged": { "frames": [8] },
            "playerLeft": { "frames": [9] },
            "playerRight": { "frames": [10] },
            "enemyUFO": { "frames": [11] },
            "meteorBig": { "frames": [12] },
            "shield": { "frames": [13] }
        }
    };

    let spaceData = 
    {
        "images": {},
        "frames": [
            [0, 0, 1010, 2286, 0, 0, 0],
        ],
        "animations": {
            "space": { "frames": [0] },
        }
    }


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

        spriteDataNew.images = [assets.getResult("atlas-exported")];
        textureAtlas = new createjs.SpriteSheet(spriteDataNew);
        config.Game.TEXTURE_ATLAS = textureAtlas;

        spaceData.images = [assets.getResult("space")];
        spaceAtlas = new createjs.SpriteSheet(spaceData);
        config.Game.SPACE_ATLAS = spaceAtlas;
        
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
            currentScene.Clean();
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
        }
        currentSceneState = config.Game.SCENE;
        config.Game.CURRENT_SCENE = currentScene;
        stage.addChild(currentScene);

    }

    window.addEventListener('load', Preload);


})();