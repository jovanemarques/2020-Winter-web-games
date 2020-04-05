module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _space?: objects.Space;
        private _ship?: objects.Ship;
        private _island?: objects.Island;

        private _meteor: Array<objects.Meteor>;

        private _scoreBoard: managers.ScoreBoard;
        private _bulletManager: managers.Bullet;
        private _keyboardManager: managers.Keyboard;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            
            this._space = new objects.Space();
            this._ship = new objects.Ship();
            this._island = new objects.Island();
            
            // create the cloud array
            this._meteor = new Array<objects.Meteor>(); // empty container

            // instantiating CLOUD_NUM clouds
            for (let index = 0; index < config.Game.CLOUD_NUM; index++) 
            {
                this._meteor.push(new objects.Meteor());
            }
            
            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;

            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;

            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;

             this.Main();
        }        
        
        public Update(): void 
        {
           this._space.Update();

           this._ship.Update();

          this._bulletManager.Update();

           this._island.Update();

           managers.Collision.AABBCheck(this._ship, this._island);

           this._meteor.forEach(cloud => {
               cloud.Update();
               managers.Collision.squaredRadiusCheck(this._ship, cloud);
           });
        }
        
        public Main(): void 
        {
            this.addChild(this._space);

            this.addChild(this._island);

            this.addChild(this._ship);

            this._bulletManager.AddBulletsToScene(this);

            for (const cloud of this._meteor) {
                this.addChild(cloud);
            }

            this.addChild(this._scoreBoard.LivesLabel);

            this.addChild(this._scoreBoard.ScoreLabel);
        }

        public Clean(): void
        {
            this._ship.engineSound.stop();
            this.removeAllChildren();
        }


    }

        
}