module objects {
  export class Button extends GameObjects {
    //constructor

    constructor(imagePath:string = './assets/images/placeholder.png', x:number = 0, y:number = 0, isCentered:boolean = true){
      super(imagePath, x, y, isCentered);

      this.on("mouseover", this.hoverOver);
      this.on("mouseout", this.hoverOut);

      this.Start();
    }

    hoverOver():void{
      this.alpha = 0.7;
    }
    hoverOut():void{
      this.alpha = 1;
    }
    //PRIVATE LIFE CYCLE METHODS
    protected _checkBounds():void{

    }
    //PUBLIC LIFE CYCLE METHODS
    /**
     * Initialization happens here
     */
    public Start():void{

    }
    public Update():void{

    }
    public Reset():void{

    }    
  }
}