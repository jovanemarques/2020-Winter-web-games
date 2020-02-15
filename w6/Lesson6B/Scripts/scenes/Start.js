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
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            // initialization
            _this._startLabel = new objects.Label();
            _this._startButton = new objects.Button();
            _this._ocean = new objects.Ocean();
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            this._startLabel = new objects.Label("The Game", "80px", "Consolas", "#FFFF00", 320, 200, true);
            this._startButton = new objects.Button("./Assets/images/startButton.png", 320, 400, true);
            this._ocean = new objects.Ocean();
            this.Main();
        };
        Start.prototype.Update = function () {
            this._ocean.Update();
        };
        Start.prototype.Main = function () {
            this.addChild(this._ocean);
            this.addChild(this._startLabel);
            this.addChild(this._startButton);
            this._startButton.on("click", function () {
                config.Game.SCENE_STATE = scenes.State.PLAY;
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map