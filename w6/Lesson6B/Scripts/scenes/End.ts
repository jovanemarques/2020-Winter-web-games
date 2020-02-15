module scenes
{
    export class End extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        endLabel:objects.Label;
        nextButton:objects.Button;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this.endLabel = new objects.Label();
            this.nextButton = new objects.Button();

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this.endLabel = new objects.Label("End Scene", "80px","Consolas", "#000000", 320, 200, true);
            this.nextButton = new objects.Button("./Assets/images/backButton.png", 320, 400, true);
           
            this.Main();
        }        
        
        public Update(): void 
        {
            
        }
        
        public Main(): void {
            
            this.addChild(this.endLabel);
    
            this.addChild(this.nextButton);
    
            this.nextButton.on("click", function() {
               config.Game.SCENE_STATE = scenes.State.PLAY;
            });
        }

        
    }
}