module scenes {
    export class Start extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private startLabel: objects.Label;
        private startButton:objects.Button;
        private player:objects.Player;

        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor(){
            super();
            // initializations
            this.startLabel = new objects.Label();
            this.startButton = new objects.Button();
            this.player = new objects.Player();
        }
        //PUBLIC METHODS
        public Start(): void {
            this.startLabel = new objects.Label("The Game", "80px", "Consolas", "#000000", 320, 180, true);
            this.startButton = new objects.Button('../assets/images/startButton.png', 320, 400, true);

            this.Main();
        } 

        public Update(): void {
            this.player.Update();
            managers.Collision.AABBCheck(this.player, this.startButton);
        }

        public Main(): void {
            
            this.addChild(this.startLabel);
            this.addChild(this.startButton);
            
            //startButton.position.x = 100;
            
            console.log(this.startButton.position);
            
            // let vector1 = new objects.Vector2(100, 200);
            // console.log(vector1.toString());
            // let vector2 = new objects.Vector2(300, 500);
            this.player = new objects.Player();
            config.Game.STAGE.addChild(this.player);
        }


    }
}