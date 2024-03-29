/** 
 * Author:      Jovane Marques - 300982100
 * Create at:   Apr 04th, 2020
 * Description: Start Scene
 * 
 * Revisions:   Apr 04th, 2020 - Creation
*/
module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _welcomeLabel: objects.Label;
        private _startButton: objects.Button;
        private _space: objects.Space;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Start(): void 
        {
             //instantiate a new Text object
            this._welcomeLabel = new objects.Label("Space Battle", "80px", "Consolas", "#FFFFFF", 320, 180, true);
            // buttons
             this._startButton = new objects.Button("player", 320, 430, true);

             this._space = new objects.Space();
            this.Main();
        }        
        
        public Update(): void 
        {
           this._space.Update();
        }
        
        public Main(): void 
        {
            this.addChild(this._space);
       
            this.addChild(this._welcomeLabel);

        
            this.addChild(this._startButton);

            this._startButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.INFO;
            });

        }

        public Clean(): void{
            this.removeAllChildren();
        }

        
    }
}