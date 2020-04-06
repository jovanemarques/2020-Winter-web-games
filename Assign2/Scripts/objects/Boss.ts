module objects
{
    export class Boss extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _horizontalSpeed: number;
        private _verticalPosition:number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "enemyUFO");
            this.x
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
           
        }

        // PUBLIC METHODS
        public Start(): void {
            this.type = enums.GameObjectType.BOSS;
            this._verticalPosition = 0; // locked to the bottom of the screen
            this._horizontalSpeed = 10;
            this.position = new objects.Vector2(config.Game.SCREEN_WIDTH * 0.5, this._verticalPosition);
        }

        public Update(): void {
           //this.position = new Vector2(this.stage.mouseX, this.stage.mouseY);
           this.rotation += 5;

           // fire bullets every 10 frames
           if(createjs.Ticker.getTicks() % 30 == 0)
           {
               let newMeteor:objects.Meteor;
                const meteorType = Math.round(util.Mathf.RandomRange(1, 2));
                if (meteorType === 1){
                    newMeteor = new objects.Meteor(config.Game.TEXTURE_ATLAS, "meteorBig", this.position);
                } else {
                    newMeteor = new objects.Meteor(config.Game.TEXTURE_ATLAS, "meteorSmall", this.position);
                }
                config.Game.CURRENT_SCENE.addChild(newMeteor); 
                config.Game.METEORS.push(newMeteor);
           }
        }

        public Reset(): void {
           
        }
    }
}