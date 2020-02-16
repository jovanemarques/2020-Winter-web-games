/** 
 * Author:      Jovane Marques - 300982100
 * Create at:   Feb 05th, 2020
 * Description: Button Component
 * 
 * Revisions:   Feb 05th, 2020 - Creation
*/
module objects {
  export class Button extends createjs.Bitmap {
    //constructor

    constructor(imagePath:string, x:number, y:number, isCentered:boolean){
      super(imagePath);

      this.cursor = "pointer"

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