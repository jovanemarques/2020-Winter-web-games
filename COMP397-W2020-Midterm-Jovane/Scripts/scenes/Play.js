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
 * Source File: Play.ts
 * Author: Tom Tsiliopoulos / Jovane Marques
 * Date: Feb 22, 2020
 * Description: Play Scene of a dice game
 */
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this._moveDices = false;
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
        /**
         * Method to wait a period of time before doing some actions
         *
         * @private
         * @param {number} time
         * @returns
         * @memberof Play
         */
        Play.prototype.sleep = function (time) {
            return new Promise(function (resolve) { return setTimeout(resolve, time); });
        };
        // PUBLIC METHODS
        /**
         * initialize and instatiate
         *
         * @memberof Play
         */
        Play.prototype.Start = function () {
            var _this = this;
            this._dice1 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 100, 150);
            this._dice1Label = new objects.Label("0", "30px", void 0, void 0, 200, 360);
            this._dice2 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 350, 150);
            this._dice2Label = new objects.Label("0", "30px", void 0, void 0, 450, 360);
            this._rollBtn = new objects.Button(config.Game.ASSETS.getResult("rollButton"), 250, 400);
            this._rollBtn.on('click', function (e) {
                _this._moveDices = true;
                _this.sleep(1000).then(function () {
                    _this._dice1Number = Math.floor(util.Mathf.RandomRange(1, 6));
                    _this._dice1.image = _this._diceArray[_this._dice1Number];
                    _this._dice1Label.text = _this._dice1Number.toString();
                    console.log(_this._dice1Number);
                    _this._dice2Number = Math.floor(util.Mathf.RandomRange(1, 6));
                    _this._dice2.image = _this._diceArray[_this._dice2Number];
                    _this._dice2Label.text = _this._dice2Number.toString();
                    console.log(_this._dice2Number);
                    // move dices off
                    _this._moveDices = false;
                });
            });
            this.Main();
        };
        /**
         * This method update the objects according to the FPS
         *
         * @memberof Play
         */
        Play.prototype.Update = function () {
            if (this._moveDices) {
                //set a random dice 
                var dice1 = Math.floor(util.Mathf.RandomRange(1, 6));
                this._dice1.image = this._diceArray[dice1];
                var dice2 = Math.floor(util.Mathf.RandomRange(1, 6));
                this._dice2.image = this._diceArray[dice2];
            }
        };
        /**
         * Main function of the Scene
         *
         * @memberof Play
         */
        Play.prototype.Main = function () {
            this.addChild(this._dice1);
            this.addChild(this._dice1Label);
            this.addChild(this._dice2);
            this.addChild(this._dice2Label);
            this.addChild(this._rollBtn);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map