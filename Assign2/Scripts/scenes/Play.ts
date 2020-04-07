/** 
 * Author:      Jovane Marques - 300982100
 * Create at:   Apr 04th, 2020
 * Description: Play Scene
 * 
 * Revisions:   Apr 04th, 2020 - Creation
*/
module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _space?: objects.Space;
        private _ship?: objects.Ship;
        private _boss?: objects.Boss;

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
            this._boss = new objects.Boss();
            
            // create the meteor array
            this._meteor = new Array<objects.Meteor>(); // empty container

            // instantiating METEOR_NUM meteors
            for (let index = 0; index < config.Game.METEOR_NUM; index++) 
            {
                this._meteor.push(new objects.Meteor());
            }
            config.Game.METEORS = this._meteor;
            
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

            const bulletPull = config.Game.BULLET_MANAGER.GetBulletPull();

            if (this._boss.isActive){
                this._boss.Update();
            }

            this._bulletManager.Update();

            if (this._meteor.length > 0){
                this._meteor.forEach((meteor, index) => {
                    meteor.Update();
                     if(createjs.Ticker.getTicks() % 10 == 0){
                         managers.Collision.squaredRadiusCheck(this._ship, meteor);
                    
                         bulletPull.forEach(bullet => {
                             bullet.Update();
                             if (bullet.isActive){
                                 if (managers.Collision.squaredRadiusCheck(bullet, meteor)){
                                     if (meteor.currentAnimation == 'meteorBig'){
                                         this.removeChild(meteor);
                                         meteor.gotoAndStop('meteorSmall');
                                         this.addChild(meteor);
                                     } else {
                                         meteor.Stop();
                                         this.removeChild(meteor);
                                         this._meteor.splice(index, 1);
                                     }
                                 } 
                             } else {
                             }
                         });
                     }
                 });
            } else {
                if (!this._boss.isActive){
                    this._boss.isActive = true;
                    this.addChild(this._boss);
                    this._space.VerticalSpeed = 10;
                }
            }
            
        }
        
        public Main(): void 
        {
            this.addChild(this._space);

            this.addChild(this._ship);

            this._bulletManager.AddBulletsToScene(this);

            for (const meteor of this._meteor) {
                this.addChild(meteor);
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