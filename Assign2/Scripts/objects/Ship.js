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
    var Ship = /** @class */ (function (_super) {
        __extends(Ship, _super);
        // CONSTRUCTOR
        function Ship() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "player", 0, 0, true) || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Ship.prototype, "engineSound", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._engineSound;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Ship.prototype._checkBounds = function () {
            // left boundary
            if (this.position.x <= this.halfWidth) {
                this.position = new objects.Vector2(this.halfWidth, this.position.y);
            }
            // right boundary
            if (this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth) {
                this.position = new objects.Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, this.position.y);
            }
        };
        Ship.prototype._move = function () {
            //let newPositionX = util.Mathf.Lerp(this.position.x, this.stage.mouseX, 0.05);
            if ((config.Game.KEYBOARD_MANAGER.MoveLeft) || (config.Game.KEYBOARD_MANAGER.MoveRight)) {
                var newPositionX = (config.Game.KEYBOARD_MANAGER.MoveRight) ?
                    this._moveRight() : this._moveLeft();
                this.position = new objects.Vector2(newPositionX, this._verticalPosition);
            }
            else {
                this.gotoAndStop('player');
            }
            this._bulletSpawn = new objects.Vector2(this.position.x, this.position.y - this.halfHeight);
        };
        Ship.prototype._moveLeft = function () {
            this.gotoAndStop('playerLeft');
            return this.position.x - this._horizontalSpeed;
        };
        Ship.prototype._moveRight = function () {
            this.gotoAndStop('playerRight');
            return this.position.x + this._horizontalSpeed;
        };
        // PUBLIC METHODS
        Ship.prototype.Start = function () {
            this.type = enums.GameObjectType.SHIP;
            this._verticalPosition = 430; // locked to the bottom of the screen
            this._engineSound = createjs.Sound.play("theme");
            this._engineSound.loop = -1; // loop forever
            this._engineSound.volume = 0.3; // 30% volume
            this._horizontalSpeed = 10;
            this.position = new objects.Vector2(config.Game.SCREEN_WIDTH * 0.5, this._verticalPosition);
        };
        Ship.prototype.Update = function () {
            this._move();
            this._checkBounds();
            // fire bullets every 10 frames
            if (createjs.Ticker.getTicks() % 10 == 0) {
                if (config.Game.KEYBOARD_MANAGER.Fire) {
                    this._fireSound = createjs.Sound.play("pew");
                    this._fireSound.volume = 0.3; // 30% volume
                    this.FireBullets();
                }
            }
        };
        Ship.prototype.Reset = function () {
        };
        Ship.prototype.FireBullets = function () {
            var bullet = config.Game.BULLET_MANAGER.GetBullet();
            bullet.position = this._bulletSpawn;
        };
        return Ship;
    }(objects.GameObject));
    objects.Ship = Ship;
})(objects || (objects = {}));
//# sourceMappingURL=Ship.js.map