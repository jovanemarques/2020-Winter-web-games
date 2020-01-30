module objects {
  export class Button extends createjs.Bitmap {
    //constructor

    constructor(imagePath:string, x:number, y:number, isCentered:boolean){
      super(imagePath);
      if(isCentered){
        this.regX = 75;
        this.regY = 250;
      }

      this.x = x;
      this.y = y;

      this.on("mouseover", this.hoverOver);
      this.on("mouseout", this.hoverOut);
    }

    hoverOver():void{
      this.alpha = 0.7;
    }
    hoverOut():void{
      this.alpha = 1;
    }
    
  }
}