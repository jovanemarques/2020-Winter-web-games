/**
 * Source File: Play.ts
 * Author: Tom Tsiliopoulos / Jovane Marques
 * Date: Feb 22, 2020
 * Description: Play Scene of a dice game
 */
module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _diceTable:createjs.Bitmap;
        private _dice1:objects.Button;
        private _dice1Label:objects.Label;
        private _dice2:objects.Button;
        private _dice2Label:objects.Label;
        private _rollBtn:objects.Button;
        private _dice1Number:number;
        private _dice2Number:number;
        private _moveDices:boolean = false;
        private _diceArray:Object[] = [
            config.Game.ASSETS.getResult("diceBlank"), 
            config.Game.ASSETS.getResult("dice1"), 
            config.Game.ASSETS.getResult("dice2"), 
            config.Game.ASSETS.getResult("dice3"), 
            config.Game.ASSETS.getResult("dice4"), 
            config.Game.ASSETS.getResult("dice5"), 
            config.Game.ASSETS.getResult("dice6"), 
        ];

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS
        /**
         * Method to wait a period of time before doing some actions
         *
         * @private
         * @param {number} time
         * @returns
         * @memberof Play
         */
        private sleep (time:number) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }

        // PUBLIC METHODS

        /**
         * initialize and instatiate
         *
         * @memberof Play
         */
        public Start(): void 
        {
            this._diceTable = new createjs.Bitmap(config.Game.ASSETS.getResult("diceTable"));
            this._dice1 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 100, 120);
            this._dice1Label = new objects.Label("0", "50px", void 0, "#FFFFFF", 190, 330);
            this._dice2 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 350, 120);
            this._dice2Label = new objects.Label("0", "50px", void 0, "#FFFFFF", 440, 330);
            this._rollBtn = new objects.Button(config.Game.ASSETS.getResult("rollButton"), 250, 400);
            this._rollBtn.on('click', (e) => {
                if (!this._moveDices){
                    // move dices on
                    this._moveDices = true;
                    this.sleep(1000).then(() => {
                        this._dice1Number = Math.floor(util.Mathf.RandomRange(1, 6));
                        this._dice1.image = this._diceArray[this._dice1Number] as any;
                        this._dice1Label.text = this._dice1Number.toString();
                        console.log(this._dice1Number);

                        this._dice2Number = Math.floor(util.Mathf.RandomRange(1, 6));
                        this._dice2.image = this._diceArray[this._dice2Number] as any;
                        this._dice2Label.text = this._dice2Number.toString();
                        console.log(this._dice2Number);

                        // move dices off
                        this._moveDices = false;
                    });
                }
            });
            this.Main();
        }        
        /**
         * This method update the objects according to the FPS
         *
         * @memberof Play
         */
        public Update(): void 
        {
            if (this._moveDices){
                //set a random dice 
                let dice1 = Math.floor(util.Mathf.RandomRange(1, 6));
                this._dice1.image = this._diceArray[dice1] as any;
                let dice2 = Math.floor(util.Mathf.RandomRange(1, 6));
                this._dice2.image = this._diceArray[dice2] as any;
            }
        }
        /**
         * Main function of the Scene
         *
         * @memberof Play
         */
        public Main(): void 
        {
            this.addChild(this._diceTable);
            this.addChild(this._dice1);
            this.addChild(this._dice1Label);
            this.addChild(this._dice2);
            this.addChild(this._dice2Label);
            this.addChild(this._rollBtn);
        }

        
    }
}