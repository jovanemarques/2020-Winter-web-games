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
      this.position = new Vector2(this.stage.mouseX, this.stage.mouseY);
    }
    public Reset(): void {
      
    }
  }
}