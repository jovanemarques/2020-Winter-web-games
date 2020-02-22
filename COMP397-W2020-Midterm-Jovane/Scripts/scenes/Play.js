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
            _this._diceArray = [
                config.Game.ASSETS.getResult("diceBlank"),
                config.Game.ASSETS.getResult("dice1"),
                config.Game.ASSETS.getResult("dice2"),
                config.Game.ASSETS.getResult("dice3"),
                config.Game.ASSETS.getResult("dice4"),
                config.Game.ASSETS.getResult("dice5"),
                config.Game.ASSETS.getResult("dice6"),
            ];
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            var _this = this;
            this._dice1 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 100, 150);
            this._dice2 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 350, 150);
            this._rollBtn = new objects.Button(config.Game.ASSETS.getResult("rollButton"), 250, 400);
            this._rollBtn.on('click', function (e) {
                _this._dice1Number = Math.floor(util.Mathf.RandomRange(1, 6));
                _this._dice1.image = _this._diceArray[_this._dice1Number];
                console.log(_this._dice1Number);
                _this._dice2Number = Math.floor(util.Mathf.RandomRange(1, 6));
                _this._dice2.image = _this._diceArray[_this._dice2Number];
                console.log(_this._dice2Number);
            });
            this.Main();
        };
        Play.prototype.Update = function () {
        };
        Play.prototype.Main = function () {
            this.addChild(this._dice1);
            this.addChild(this._dice2);
            this.addChild(this._rollBtn);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map