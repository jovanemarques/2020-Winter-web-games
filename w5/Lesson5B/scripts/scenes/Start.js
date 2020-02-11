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
    var Start = (function (_super) {
        __extends(Start, _super);
        function Start() {
            var _this = _super.call(this) || this;
            _this.startLabel = new objects.Label();
            _this.startButton = new objects.Button();
            _this.player = new objects.Player();
            return _this;
        }
        Start.prototype.Start = function () {
            this.startLabel = new objects.Label("The Game", "80px", "Consolas", "#000000", 320, 180, true);
            this.startButton = new objects.Button('../assets/images/startButton.png', 320, 400, true);
            this.Main();
        };
        Start.prototype.Update = function () {
            this.player.Update();
            managers.Collision.AABBCheck(this.player, this.startButton);
        };
        Start.prototype.Main = function () {
            this.addChild(this.startLabel);
            this.addChild(this.startButton);
            console.log(this.startButton.position);
            this.player = new objects.Player();
            config.Game.STAGE.addChild(this.player);
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map