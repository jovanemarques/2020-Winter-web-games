module managers{
    export class Collision{
        public static squareRadiusCheck(object1:objects.GameObjects, object2:objects.GameObjects){
            // squared radius collision check
            let sqrDistance = objects.Vector2.sqrDistance(object1.position, object2.position);
            let radii = object1.halfHeight + object2.halfHeight;
            if(sqrDistance < (radii * radii)){
                if(!object2.isColliding){
                    console.log('Collision squareRadiusCheck!'); 
                    object2.isColliding = true;
                }
            } else {
                object2.isColliding = false;
                //console.log('Collision FALSE!');
            }
            
        }
        /**
         * AABB Collision detection - retangle
         *
         * @static
         * @param {objects.GameObjects} obj1
         * @param {objects.GameObjects} obj2
         * @memberof Collision
         */
        public static AABBCheck(obj1:objects.GameObjects, obj2:objects.GameObjects){
            let obj1Offset = new objects.Vector2(0, 0);
            let obj2Offset = new objects.Vector2(0, 0);
            
            if (obj1.isCentered){
                obj1Offset.x = obj1.halfWidth;
                obj1Offset.y = obj1.halfHeight;
            }
            if (obj2.isCentered){
                obj2Offset.x = obj2.halfWidth;
                obj2Offset.y = obj2.halfHeight;
            }
            let obj1TopLeft = objects.Vector2.subtract(obj1.position, obj1Offset);
            let obj2TopLeft = objects.Vector2.subtract(obj2.position, obj2Offset);

            if(obj1TopLeft.x < obj2TopLeft.x + obj2.width &&
                obj1TopLeft.x + obj1.width > obj2TopLeft.x && 
                obj1TopLeft.y < obj2TopLeft.y + obj2.height &&
                obj1TopLeft.y + obj1.height > obj2TopLeft.y){
                if(!obj2.isColliding){
                  console.log('Collision AABBCheck!');
                  obj2.isColliding = true;
                }
            } else {
                obj2.isColliding = false;
                //console.log('Collision FALSE!');
            }
        }
    }
}