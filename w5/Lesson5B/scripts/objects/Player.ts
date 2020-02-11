module objects{
  export class Player extends GameObjects{

    constructor(){
      super();

      this.Start();
    }

    protected _checkBounds(): void {
      
    }    
    public Start(): void {
      
    }
    public Update(): void {
      this.position = new Vector2(config.Game.STAGE.mouseX, config.Game.STAGE.mouseY);
    }
    public Reset(): void {
      
    }
  }
}