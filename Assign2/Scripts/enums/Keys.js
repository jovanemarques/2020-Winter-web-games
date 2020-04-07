"use strict";
/**
 * Author:      Jovane Marques - 300982100
 * Create at:   Apr 04th, 2020
 * Description: Key enums
 *
 * Revisions:   Apr 04th, 2020 - Creation
*/
var enums;
(function (enums) {
    var Keys;
    (function (Keys) {
        // Arrow Keys
        Keys[Keys["LEFT_ARROW"] = 37] = "LEFT_ARROW";
        Keys[Keys["UP_ARROW"] = 38] = "UP_ARROW";
        Keys[Keys["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
        Keys[Keys["DOWN_ARROW"] = 40] = "DOWN_ARROW";
        // WASD keys
        Keys[Keys["A"] = 65] = "A";
        Keys[Keys["D"] = 68] = "D";
        Keys[Keys["S"] = 83] = "S";
        Keys[Keys["W"] = 87] = "W";
        // Space Bar
        Keys[Keys["SPACE"] = 32] = "SPACE";
    })(Keys = enums.Keys || (enums.Keys = {}));
})(enums || (enums = {}));
//# sourceMappingURL=Keys.js.map