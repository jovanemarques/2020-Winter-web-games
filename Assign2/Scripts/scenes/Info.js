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
 * Description: Info Scene
 *
 * Revisions:   Apr 04th, 2020 - Creation
*/
var scenes;
(function (scenes) {
    var Info = /** @class */ (function (_super) {
        __extends(Info, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Info() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Info.prototype.Start = function () {
            //instantiate a new Text object
            this._welcomeLabel = new objects.Label("Instructions:\n    - Avoid the meteors to not lose lifes\n    - Press [ESPACE] to shot\n    - Hitting a big meteor will broke it into a small one\n    - Hitting a small will destry it and give 100 points \n            ", "25px", "Consolas", "#FFFFFF", 320, 180, true);
            // buttons
            this._startButton = new objects.Button("player", 320, 430, true);
            this._space = new objects.Space();
            this.Main();
        };
        Info.prototype.Update = function () {
            this._space.Update();
        };
        Info.prototype.Main = function () {
            this.addChild(this._space);
            this.addChild(this._welcomeLabel);
            this.addChild(this._startButton);
            this._startButton.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
        };
        Info.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return Info;
    }(objects.Scene));
    scenes.Info = Info;
})(scenes || (scenes = {}));
//# sourceMappingURL=Info.js.map