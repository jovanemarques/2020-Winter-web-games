/**
 * Source File: PlayBonus.ts
 * Author: Tom Tsiliopoulos / Jovane Marques
 * Date: Feb 22, 2020
 * Description: Play the Bonus Scene of a dice game
 */
module scenes
{
    export class PlayBonus extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _diceTable:createjs.Bitmap;

        private _dice1:objects.Button;
        private _dice1Label:objects.Label;

        private _dice2:objects.Button;
        private _dice2Label:objects.Label;
        
        private _dice3:objects.Button;
        private _dice3Label:objects.Label;

        private _dice4:objects.Button;
        private _dice4Label:objects.Label;

        private _dice5:objects.Button;
        private _dice5Label:objects.Label;
        
        private _resultLabel:objects.Label;

        private _rollBtn:objects.Button;
        private _dice1Number:number;
        private _dice2Number:number;
        private _dice3Number:number;
        private _dice4Number:number;
        private _dice5Number:number;
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

            this._dice1 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 40, 120);
            this._dice1.scaleX = 0.5;
            this._dice1.scaleY = 0.5;
            this._dice1Label = new objects.Label("0", "50px", void 0, "#FFFFFF", 40, 230);

            this._dice2 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 160, 120);
            this._dice2.scaleX = 0.5;
            this._dice2.scaleY = 0.5;
            this._dice2Label = new objects.Label("0", "50px", void 0, "#FFFFFF", 160, 230);
            
            this._dice3 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 280, 120);
            this._dice3.scaleX = 0.5;
            this._dice3.scaleY = 0.5;
            this._dice3Label = new objects.Label("0", "50px", void 0, "#FFFFFF", 280, 220);
            
            this._dice4 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 410, 120);
            this._dice4.scaleX = 0.5;
            this._dice4.scaleY = 0.5;
            this._dice4Label = new objects.Label("0", "50px", void 0, "#FFFFFF", 410, 230);

            this._dice5 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 520, 120);
            this._dice5.scaleX = 0.5;
            this._dice5.scaleY = 0.5;
            this._dice5Label = new objects.Label("0", "50px", void 0, "#FFFFFF", 520, 230);
            
            this._resultLabel = new objects.Label("Result: 0", "50px", void 0, "#FFFFFF", 310, 330);

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

                        this._dice3Number = Math.floor(util.Mathf.RandomRange(1, 6));
                        this._dice3.image = this._diceArray[this._dice3Number] as any;
                        this._dice3Label.text = this._dice3Number.toString();
                        console.log(this._dice3Number);

                        this._dice4Number = Math.floor(util.Mathf.RandomRange(1, 6));
                        this._dice4.image = this._diceArray[this._dice4Number] as any;
                        this._dice4Label.text = this._dice4Number.toString();
                        console.log(this._dice4Number);

                        this._dice5Number = Math.floor(util.Mathf.RandomRange(1, 6));
                        this._dice5.image = this._diceArray[this._dice5Number] as any;
                        this._dice5Label.text = this._dice5Number.toString();
                        console.log(this._dice5Number);

                        // move dices off
                        this._moveDices = false;

                        let min = Math.min(this._dice1Number, this._dice2Number, this._dice3Number, this._dice4Number, this._dice5Number);

                        this._resultLabel.text = 'Result: ' + (this._dice1Number + this._dice2Number + this._dice3Number + this._dice4Number + this._dice5Number - min); 
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
                let dice3 = Math.floor(util.Mathf.RandomRange(1, 6));
                this._dice3.image = this._diceArray[dice3] as any;
                let dice4 = Math.floor(util.Mathf.RandomRange(1, 6));
                this._dice4.image = this._diceArray[dice4] as any;
                let dice5 = Math.floor(util.Mathf.RandomRange(1, 6));
                this._dice5.image = this._diceArray[dice5] as any;
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

            this.addChild(this._dice3);
            this.addChild(this._dice3Label);

            this.addChild(this._dice4);
            this.addChild(this._dice4Label);

            this.addChild(this._dice5);
            this.addChild(this._dice5Label);
            
            this.addChild(this._resultLabel);

            this.addChild(this._rollBtn);
        }

        
    }
}