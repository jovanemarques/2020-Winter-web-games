module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _dice1:objects.Button;
        private _dice2:objects.Button;
        private _rollBtn:objects.Button;
        private _dice1Number:number;
        private _dice2Number:number;
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

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            this._dice1 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 100, 150);
            this._dice2 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 350, 150);
            this._rollBtn = new objects.Button(config.Game.ASSETS.getResult("rollButton"), 250, 400);
            this._rollBtn.on('click', (e) => {
                this._dice1Number = Math.floor(util.Mathf.RandomRange(1, 6));
                this._dice1.image = this._diceArray[this._dice1Number] as any;
                console.log(this._dice1Number);
                this._dice2Number = Math.floor(util.Mathf.RandomRange(1, 6));
                this._dice2.image = this._diceArray[this._dice2Number] as any;
                console.log(this._dice2Number);
            });
            this.Main();
        }        
        
        public Update(): void 
        {

        }
        
        public Main(): void 
        {
            this.addChild(this._dice1);
            this.addChild(this._dice2);
            this.addChild(this._rollBtn);
        }

        
    }
}