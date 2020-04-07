/** 
 * Author:      Jovane Marques - 300982100
 * Create at:   Apr 04th, 2020
 * Description: Info Scene
 * 
 * Revisions:   Apr 04th, 2020 - Creation
*/
module scenes
{
    export class Info extends objects.Scene
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
            this._welcomeLabel = new objects.Label(`Instructions:
    - Avoid the meteors to not lose lifes
    - Press [ESPACE] to shot
    - Hitting a big meteor will broke it into a small one
    - Hitting a small will destry it and give 100 points 
            `, "25px", "Consolas", "#FFFFFF", 320, 180, true);
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
                config.Game.SCENE = scenes.State.PLAY;
            });

        }

        public Clean(): void{
            this.removeAllChildren();
        }

        
    }
}