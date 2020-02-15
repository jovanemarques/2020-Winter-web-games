module objects 
{
    export class Button extends GameObject
    {
        // constructor
        constructor(
            imagePath:Object = config.Game.ASSETS.getResult("placeholder"), 
            x:number = 0, y:number = 0, isCentered:boolean = true)
        {
            super(imagePath, x, y, isCentered);

            this.on("mouseover", this.HoverOver);
            this.on("mouseout", this.HoverOut);

            this.Start();
        }

        // PRIVATE LIFE CYCLE METHODS
        protected _checkBounds():void
        {

        }


        // PUBLIC Methods
        HoverOver():void
        {
            this.alpha = 0.7;
        }

        HoverOut():void
        {
            this.alpha = 1.0;
        }

        // PUBLIC LIFE CYCLE METHODS

        /**
         * Initialization happens here
         *
         * @memberof Button
         */
        public Start():void
        {

        }

        public Update():void
        {

        }

        public Reset():void
        {

        }



    }
}