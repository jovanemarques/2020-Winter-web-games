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
            [0, 0, 151, 118, 0, 0, 0],
            [151, 0, 91, 91, 0, 0, 0],
            [151, 91, 90, 77, 0, 0, 0],
            [0, 118, 136, 111, 0, 0, 0],
            [136, 118, 9, 33, 0, 0, 0],
            [136, 151, 9, 33, 0, 0, 0],
            [145, 168, 99, 93, 0, 0, 0],
            [0, 229, 99, 93, 0, 0, 0],
            [99, 229, 44, 42, 0, 0, 0],
            [143, 261, 99, 75, 0, 0, 0],
            [99, 271, 35, 27, 0, 0, 0],
            [0, 322, 99, 75, 0, 0, 0],
            [0, 397, 98, 50, 0, 0, 0],
            [99, 336, 90, 77, 0, 0, 0],
            [189, 336, 56, 54, 0, 0, 0],
            [189, 390, 56, 54, 0, 0, 0]
        ],
        "animations": {
            "shield": { "frames": [0] },
            "enemyUFO": { "frames": [1] },
            "playerLeft": { "frames": [2] },
            "meteorBig": { "frames": [3] },
            "laserGreen": { "frames": [4] },
            "laserRed": { "frames": [5] },
            "player-animated": { "frames": [6, 7], speed: 0.5 },
            "meteorSmall": { "frames": [8] },
            "player": { "frames": [9] },
            "life": { "frames": [10] },
            "playerDamaged": { "frames": [11] },
            "enemyShip": { "frames": [12] },
            "playerRight": { "frames": [13] },
            "laserGreenShot": { "frames": [14] },
            "laserRedShot": { "frames": [15] }
        },
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