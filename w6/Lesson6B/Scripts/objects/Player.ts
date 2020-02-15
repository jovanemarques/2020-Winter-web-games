module objects
{
    export class Player extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.ASSETS.getResult('placeholder'), 0, 0, true);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            
        }      

        // PUBLIC METHODS
        public Start(): void {
            
        }

        public Update(): void {
            let mouseX = config.Game.STAGE.mouseX;
            let mouseY = config.Game.STAGE.mouseY;

           this.position = new Vector2(mouseX, mouseY);
        }

        public Reset(): void {
            
        }
    }
}