module objects
{
    export class Space extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.SPACE_ATLAS, "space");

            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void 
        {
            if(this.y >= 0)
            {
                this.Reset();
            }
        }      

        public set VerticalSpeed(v : number) {
            this._verticalSpeed = v;
            this.velocity = new Vector2(0, this._verticalSpeed);
        }
        
        
        private _move():void
        {
            this.position = Vector2.add(this.position, this.velocity);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.SPACE;
            this._verticalSpeed = 5; // 5 px per frame
            this.velocity = new Vector2(0, this._verticalSpeed);
            this.Reset();
        }
        
        public Update(): void 
        {
            this._move();
            this._checkBounds();
        }
        
        public Reset(): void 
        {
            this.position = new Vector2(0, -762);
        }

        
    }
}