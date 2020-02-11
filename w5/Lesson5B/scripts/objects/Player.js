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
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        Player.prototype._checkBounds = function () {
        };
        Player.prototype.Start = function () {
        };
        Player.prototype.Update = function () {
            this.position = new objects.Vector2(config.Game.STAGE.mouseX, config.Game.STAGE.mouseY);
        };
        Player.prototype.Reset = function () {
        };
        return Player;
    }(objects.GameObjects));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map