"use strict";
/**
 * Author:      Jovane Marques - 300982100
 * Create at:   Apr 04th, 2020
 * Description: GameObjects enums
 *
 * Revisions:   Apr 04th, 2020 - Creation
*/
var enums;
(function (enums) {
    var GameObjectType;
    (function (GameObjectType) {
        GameObjectType[GameObjectType["SHIP"] = 0] = "SHIP";
        GameObjectType[GameObjectType["METEOR"] = 1] = "METEOR";
        GameObjectType[GameObjectType["SPACE"] = 2] = "SPACE";
        GameObjectType[GameObjectType["BUTTON"] = 3] = "BUTTON";
        GameObjectType[GameObjectType["PLAYER"] = 4] = "PLAYER";
        GameObjectType[GameObjectType["BOSS"] = 5] = "BOSS";
        GameObjectType[GameObjectType["BULLET"] = 6] = "BULLET";
        GameObjectType[GameObjectType["UNDEFINED"] = 7] = "UNDEFINED";
        GameObjectType[GameObjectType["NUM_OF_TYPES"] = 8] = "NUM_OF_TYPES";
    })(GameObjectType = enums.GameObjectType || (enums.GameObjectType = {}));
})(enums || (enums = {}));
//# sourceMappingURL=GameObjectType.js.map