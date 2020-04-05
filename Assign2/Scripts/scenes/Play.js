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
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            this._space = new objects.Space();
            this._ship = new objects.Ship();
            this._island = new objects.Island();
            // create the cloud array
            this._meteor = new Array(); // empty container
            // instantiating CLOUD_NUM clouds
            for (var index = 0; index < config.Game.CLOUD_NUM; index++) {
                this._meteor.push(new objects.Meteor());
            }
            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;
            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;
            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            this._space.Update();
            this._ship.Update();
            this._bulletManager.Update();
            this._island.Update();
            managers.Collision.AABBCheck(this._ship, this._island);
            this._meteor.forEach(function (cloud) {
                cloud.Update();
                managers.Collision.squaredRadiusCheck(_this._ship, cloud);
            });
        };
        Play.prototype.Main = function () {
            this.addChild(this._space);
            this.addChild(this._island);
            this.addChild(this._ship);
            this._bulletManager.AddBulletsToScene(this);
            for (var _i = 0, _a = this._meteor; _i < _a.length; _i++) {
                var cloud = _a[_i];
                this.addChild(cloud);
            }
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        };
        Play.prototype.Clean = function () {
            this._ship.engineSound.stop();
            this.removeAllChildren();
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map