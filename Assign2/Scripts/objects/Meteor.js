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
    var Meteor = /** @class */ (function (_super) {
        __extends(Meteor, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR;
        function Meteor() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "meteorBig", new objects.Vector2(), true) || this;
            // const meteorType = Math.round(util.Mathf.RandomRange(1, 2));
            // if (meteorType === 1){
            //     super(config.Game.TEXTURE_ATLAS, "meteorBig", new Vector2(), true);
            // } else {
            //     super(config.Game.TEXTURE_ATLAS, "meteorSmall", new Vector2(), true);
            // }
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Meteor.prototype._checkBounds = function () {
            if (this.y >= config.Game.SCREEN_HEIGHT + this.height) {
                this.Reset();
            }
        };
        Meteor.prototype._move = function () {
            this.position = objects.Vector2.add(this.position, this.velocity);
            var rotatation = util.Mathf.RandomRange(-5, 5);
            if (rotatation >= 0) {
                this.rotation += Math.round(rotatation);
            }
            else {
                this.rotation -= Math.round(rotatation);
            }
        };
        // PUBLIC METHODS
        Meteor.prototype.Start = function () {
            this.type = enums.GameObjectType.METEOR;
            this.Reset();
        };
        Meteor.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        Meteor.prototype.Reset = function () {
            this._verticalSpeed = util.Mathf.RandomRange(5, 10);
            this._horizontalSpeed = util.Mathf.RandomRange(-2, 2);
            this.velocity = new objects.Vector2(this._horizontalSpeed, this._verticalSpeed);
            var randomX = util.Mathf.RandomRange(this.halfWidth, config.Game.SCREEN_WIDTH - this.halfWidth);
            var randomY = util.Mathf.RandomRange(-this.height * 3, -this.height);
            this.position = new objects.Vector2(randomX, randomY);
        };
        Meteor.prototype.Stop = function () {
            this.velocity = new objects.Vector2(0, 0);
            this.position = new objects.Vector2(-1000, -1000);
        };
        return Meteor;
    }(objects.GameObject));
    objects.Meteor = Meteor;
})(objects || (objects = {}));
//# sourceMappingURL=Meteor.js.map