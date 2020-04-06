"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Boss = /** @class */ (function (_super) {
        __extends(Boss, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Boss() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "enemyUFO") || this;
            _this.x;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Boss.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        Boss.prototype.Start = function () {
            this.type = enums.GameObjectType.BOSS;
            this._verticalPosition = 0; // locked to the bottom of the screen
            this._horizontalSpeed = 10;
            this.position = new objects.Vector2(config.Game.SCREEN_WIDTH * 0.5, this._verticalPosition);
        };
        Boss.prototype.Update = function () {
            //this.position = new Vector2(this.stage.mouseX, this.stage.mouseY);
            this.rotation += 5;
            // fire bullets every 10 frames
            if (createjs.Ticker.getTicks() % 30 == 0) {
                var newMeteor = void 0;
                var meteorType = Math.round(util.Mathf.RandomRange(1, 2));
                if (meteorType === 1) {
                    newMeteor = new objects.Meteor(config.Game.TEXTURE_ATLAS, "meteorBig", this.position);
                }
                else {
                    newMeteor = new objects.Meteor(config.Game.TEXTURE_ATLAS, "meteorSmall", this.position);
                }
                config.Game.CURRENT_SCENE.addChild(newMeteor);
                config.Game.METEORS.push(newMeteor);
            }
        };
        Boss.prototype.Reset = function () {
        };
        return Boss;
    }(objects.GameObject));
    objects.Boss = Boss;
})(objects || (objects = {}));
//# sourceMappingURL=Boss.js.map