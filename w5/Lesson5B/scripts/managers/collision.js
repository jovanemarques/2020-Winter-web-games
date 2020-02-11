"use strict";
var managers;
(function (managers) {
    var Collision = (function () {
        function Collision() {
        }
        Collision.squareRadiusCheck = function (object1, object2) {
            var sqrDistance = objects.Vector2.sqrDistance(object1.position, object2.position);
            var radii = object1.halfHeight + object2.halfHeight;
            if (sqrDistance < (radii * radii)) {
                if (!object2.isColliding) {
                    console.log('Collision squareRadiusCheck!');
                    object2.isColliding = true;
                }
            }
            else {
                object2.isColliding = false;
            }
        };
        Collision.AABBCheck = function (obj1, obj2) {
            var obj1Offset = new objects.Vector2(0, 0);
            var obj2Offset = new objects.Vector2(0, 0);
            if (obj1.isCentered) {
                obj1Offset.x = obj1.halfWidth;
                obj1Offset.y = obj1.halfHeight;
            }
            if (obj2.isCentered) {
                obj2Offset.x = obj2.halfWidth;
                obj2Offset.y = obj2.halfHeight;
            }
            var obj1TopLeft = objects.Vector2.subtract(obj1.position, obj1Offset);
            var obj2TopLeft = objects.Vector2.subtract(obj2.position, obj2Offset);
            if (obj1TopLeft.x < obj2TopLeft.x + obj2.width &&
                obj1TopLeft.x + obj1.width > obj2TopLeft.x &&
                obj1TopLeft.y < obj2TopLeft.y + obj2.height &&
                obj1TopLeft.y + obj1.height > obj2TopLeft.y) {
                if (!obj2.isColliding) {
                    console.log('Collision AABBCheck!');
                    obj2.isColliding = true;
                }
            }
            else {
                obj2.isColliding = false;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map