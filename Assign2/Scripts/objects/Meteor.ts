module objects
{
    export class Meteor extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;
        private _horizontalSpeed?:number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR;
        constructor(first:createjs.SpriteSheet = config.Game.TEXTURE_ATLAS, second:string = "meteorBig", vector:Vector2 = new Vector2())
        // constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "meteorBig", vector, true);
            // const meteorType = Math.round(util.Mathf.RandomRange(1, 2));
            // if (meteorType === 1){
            //     super(config.Game.TEXTURE_ATLAS, "meteorBig", new Vector2(), true);
            // } else {
            //     super(config.Game.TEXTURE_ATLAS, "meteorSmall", new Vector2(), true);
            // }

            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void 
        {
            if(this.y >= config.Game.SCREEN_HEIGHT + this.height)
            {
                this.Reset();
            }
        }       
        
        private _move():void
        {
            this.position = Vector2.add(this.position, this.velocity);
            const rotatation = util.Mathf.RandomRange(-5, 5);
            if (rotatation >= 0){
                this.rotation += Math.round(rotatation);
            } else {
                this.rotation -= Math.round(rotatation);
            }
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.METEOR;
            this.Reset();
        }
        
        public Update(): void 
        {
            this._move();
            this._checkBounds();
        }
        
        public Reset(): void 
        {
            this._verticalSpeed = util.Mathf.RandomRange(5, 10);
            this._horizontalSpeed = util.Mathf.RandomRange(-2, 2);
            this.velocity = new Vector2(this._horizontalSpeed, this._verticalSpeed);
            let randomX = util.Mathf.RandomRange(this.halfWidth, config.Game.SCREEN_WIDTH - this.halfWidth);
            let randomY = util.Mathf.RandomRange(-this.height * 3, -this.height);
            this.position = new Vector2(randomX, randomY);
        }
        public Stop(): void 
        {
            this.velocity = new Vector2(0, 0);
            this.position = new Vector2(-1000, -1000);
        }

        
    }
}