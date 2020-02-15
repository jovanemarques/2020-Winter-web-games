module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _startLabel:objects.Label;
        private _startButton:objects.Button;
        private _ocean:objects.Ocean;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this._startLabel = new objects.Label();
            this._startButton = new objects.Button();
            this._ocean = new objects.Ocean();

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this._startLabel = new objects.Label("The Game", "80px","Consolas", "#FFFF00", 320, 200, true);
            this._startButton = new objects.Button("./Assets/images/startButton.png", 320, 400, true);
            this._ocean = new objects.Ocean();
           
            this.Main();
        }        
        
        public Update(): void 
        {
            this._ocean.Update();
        }
        
        public Main(): void {
            
            this.addChild(this._ocean);

            this.addChild(this._startLabel);
    
            this.addChild(this._startButton);
    
            this._startButton.on("click", function() {
               config.Game.SCENE_STATE = scenes.State.PLAY;
            });
        }

        
    }
}