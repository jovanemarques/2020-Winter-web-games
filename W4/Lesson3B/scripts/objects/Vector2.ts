module objects{
  export class Vector2{
    // PRIVATE INSTANCE MEMBERS
    private _x:number = 0;
    private _y:number = 0;
    private _magnitude:number = 0;
    private _sqrMagnitude:number = 0;
    private _displayObject?:createjs.DisplayObject;

    // PUBLIC PROPERTIES
    get x():number{
      return this._x;
    }
    set x(newX:number){
      this._x = newX;
      this.sqrMagnitude = this._computeSqrMagnitude();
      this.magnitude = this._computeMagnitude();

      if (this._displayObject != undefined){
        this._displayObject.x = this._x;
      }
    }
    get y():number{
      return this._y;
    }
    set y(newY:number){
      this._y = newY;
      this.sqrMagnitude = this._computeSqrMagnitude();
      this.magnitude = this._computeMagnitude();

      if (this._displayObject != undefined){
        this._displayObject.y = this._y;
      }
    }
    get magnitude():number{
      return this._magnitude;
    }
    set magnitude(newMagnitude:number){
      this._magnitude = newMagnitude;
    }
    get sqrMagnitude():number{
      return this._sqrMagnitude;
    }
    set sqrMagnitude(newSqrMagnitude:number){
      this._sqrMagnitude = newSqrMagnitude;
    }
    /**
     * Computes the current vector direction w/o change it
     *
     * @readonly
     * @type {Vector2}
     * @memberof Vector2
     */
    get normalized():Vector2{
      let vector2 = new Vector2(this.x, this.y);
      vector2.normalize();
      return vector2;
    }

    //CONSTRUCTOR
    constructor(x:number = 0, y:number = 0, displayObject?: createjs.DisplayObject){
      this.x = x;
      this.y = y;
      //this._displaObject = displayObject ? displayObject : undefined;
      if (displayObject != undefined){
        this._displayObject = displayObject;
      }

      // this.sqrMagnitude = this.x * this.x + this.y * this.y;
      // this.magnitude = Math.sqrt(this.sqrMagnitude);
      this.magnitude = this._computeMagnitude();
      this.sqrMagnitude = this._computeSqrMagnitude();
    }

    //PRIVATE METHODS
    private _computeSqrMagnitude(): number {
      return (this._x * this._x) + (this._y * this._y);
    }
    
    private _computeMagnitude(): number {
      return Math.sqrt(this._computeSqrMagnitude());
    }

    //PUBLIC METHODS
    public add(rhs:Vector2){//rhs - right hand side
      this.x += rhs.x;
      this.y += rhs.y;
    }
    public subtract(rhs:Vector2){
      this.x -= rhs.x;
      this.y -= rhs.y;
    }
    public scale(scalar:number){
      this.x *= scalar;
      this.y *= scalar;
    }
    public normalize(){
      let magnitude = this.magnitude;
      if (magnitude > 9.99999974737875E-06){
        this.x = this.x / magnitude;
        this.y = this.y / magnitude;
      } else {
        this.x = 0;
        this.y = 0;
      }
    }
    public toString():string{
      return '{' + this.x + ', ' + this.y + '}';
    }

    //PUBLIC STATIC METHODS
    public static zero():Vector2{
      return new Vector2(0, 0);
    }
    public static one():Vector2{
      return new Vector2(1, 1);
    }
    public static up():Vector2{
      return new Vector2(0, -1);
    }
    public static down():Vector2{
      return new Vector2(0, 1);
    }
    public static left():Vector2{
      return new Vector2(-1, 0);
    }
    public static right():Vector2{
      return new Vector2(1, 0);
    }
    public static dot(lhs:Vector2, rhs:Vector2):number{
      return lhs.x * rhs.x + lhs.y * rhs.y;
    }
    /**
     * This returns the Pythogorean distance between P1 and P2
     *
     * @static
     * @param {Vector2} P1
     * @param {Vector2} P2
     * @returns {number}
     * @memberof Vector2
     */
    public static distance(P1:Vector2, P2:Vector2):number{
      let diffXs = (P2.x - P1.x);
      let diffYs = (P2.y - P1.y);
      return Math.sqrt(diffXs * diffXs + diffYs * diffYs);
    }
    /**
     * Returns the square distance between p1 and p2
     *
     * @static
     * @param {Vector2} P1
     * @param {Vector2} P2
     * @returns {number}
     * @memberof Vector2
     */
    public static sqrDistance(P1:Vector2, P2:Vector2):number{
      let diffXs = (P2.x - P1.x);
      let diffYs = (P2.y - P1.y);
      return (diffXs * diffXs + diffYs * diffYs);
    }
  }
}