/** 
 * Author:      Jovane Marques - 300982100
 * Create at:   Apr 04th, 2020
 * Description: Ship object
 * 
 * Revisions:   Apr 04th, 2020 - Creation
*/
module objects
{
    export class Ship extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalPosition:number;
        private _engineSound : createjs.AbstractSoundInstance;
        private _fireSound : createjs.AbstractSoundInstance;
        private _bulletSpawn: objects.Vector2;
        private _horizontalSpeed: number;
        
        // PUBLIC PROPERTIES
        public get engineSound() : createjs.AbstractSoundInstance 
        {
            return this._engineSound;
        }

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "player-animated", 0, 0, true);
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
            // left boundary
            if(this.position.x <= this.halfWidth)
            {
                this.position = new Vector2(this.halfWidth, this.position.y);
            }

            // right boundary

            if(this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth)
            {
                this.position = new Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, this.position.y);
            }
        }        

        private _move(): void
        {
            //let newPositionX = util.Mathf.Lerp(this.position.x, this.stage.mouseX, 0.05);
            if((config.Game.KEYBOARD_MANAGER.MoveLeft) || (config.Game.KEYBOARD_MANAGER.MoveRight))
            {
                let newPositionX = (config.Game.KEYBOARD_MANAGER.MoveRight) ? 
                this._moveRight() : this._moveLeft();

                this.position = new Vector2(newPositionX, this._verticalPosition);
            } else {
                this.gotoAndPlay('player-animated');
            }
            
            this._bulletSpawn = new Vector2(this.position.x, this.position.y - this.halfHeight);
        }

        private _moveLeft() : number{
            this.gotoAndStop('playerLeft');
            return this.position.x - this._horizontalSpeed;
        }

        private _moveRight() : number{
            this.gotoAndStop('playerRight');
            return this.position.x + this._horizontalSpeed;
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.SHIP;
            this._verticalPosition = 430; // locked to the bottom of the screen
            this._engineSound = createjs.Sound.play("theme");
            this._engineSound.loop = -1; // loop forever
            this._engineSound.volume = 0.3; // 30% volume
            this._horizontalSpeed = 10;
            this.position = new objects.Vector2(config.Game.SCREEN_WIDTH * 0.5, this._verticalPosition);
        }

        public Update(): void 
        {
            this._move();
            this._checkBounds();

            // fire bullets every 10 frames
            if(createjs.Ticker.getTicks() % 30 == 0)
            {
                if(config.Game.KEYBOARD_MANAGER.Fire)
                {
                    this._fireSound = createjs.Sound.play("pew");
                    this._fireSound.volume = 0.3; // 30% volume
                    this.FireBullets();
                }
            }
            
        }

        public Reset(): void 
        {

        }

        public FireBullets(): void
        {
            let bullet = config.Game.BULLET_MANAGER.GetBullet();
            bullet.position = this._bulletSpawn;
        }
    }

}
