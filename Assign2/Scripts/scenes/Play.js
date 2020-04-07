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
/**
 * Author:      Jovane Marques - 300982100
 * Create at:   Apr 04th, 2020
 * Description: Play Scene
 *
 * Revisions:   Apr 04th, 2020 - Creation
*/
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
            this._boss = new objects.Boss();
            // create the meteor array
            this._meteor = new Array(); // empty container
            // instantiating METEOR_NUM meteors
            for (var index = 0; index < config.Game.METEOR_NUM; index++) {
                this._meteor.push(new objects.Meteor());
            }
            config.Game.METEORS = this._meteor;
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
            var bulletPull = config.Game.BULLET_MANAGER.GetBulletPull();
            if (this._boss.isActive) {
                this._boss.Update();
            }
            this._bulletManager.Update();
            if (this._meteor.length > 0) {
                this._meteor.forEach(function (meteor, index) {
                    meteor.Update();
                    if (createjs.Ticker.getTicks() % 10 == 0) {
                        managers.Collision.squaredRadiusCheck(_this._ship, meteor);
                        bulletPull.forEach(function (bullet) {
                            bullet.Update();
                            if (bullet.isActive) {
                                if (managers.Collision.squaredRadiusCheck(bullet, meteor)) {
                                    if (meteor.currentAnimation == 'meteorBig') {
                                        _this.removeChild(meteor);
                                        meteor.gotoAndStop('meteorSmall');
                                        _this.addChild(meteor);
                                    }
                                    else {
                                        meteor.Stop();
                                        _this.removeChild(meteor);
                                        _this._meteor.splice(index, 1);
                                    }
                                }
                            }
                            else {
                            }
                        });
                    }
                });
            }
            else {
                if (!this._boss.isActive) {
                    this._boss.isActive = true;
                    this.addChild(this._boss);
                    this._space.VerticalSpeed = 10;
                }
            }
        };
        Play.prototype.Main = function () {
            this.addChild(this._space);
            this.addChild(this._ship);
            this._bulletManager.AddBulletsToScene(this);
            for (var _i = 0, _a = this._meteor; _i < _a.length; _i++) {
                var meteor = _a[_i];
                this.addChild(meteor);
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