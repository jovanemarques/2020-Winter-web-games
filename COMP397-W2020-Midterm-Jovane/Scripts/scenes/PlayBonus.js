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
 * Source File: PlayBonus.ts
 * Author: Tom Tsiliopoulos / Jovane Marques
 * Date: Feb 22, 2020
 * Description: Play the Bonus Scene of a dice game
 */
var scenes;
(function (scenes) {
    var PlayBonus = /** @class */ (function (_super) {
        __extends(PlayBonus, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function PlayBonus() {
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
        PlayBonus.prototype.sleep = function (time) {
            return new Promise(function (resolve) { return setTimeout(resolve, time); });
        };
        // PUBLIC METHODS
        /**
         * initialize and instatiate
         *
         * @memberof Play
         */
        PlayBonus.prototype.Start = function () {
            var _this = this;
            this._diceTable = new createjs.Bitmap(config.Game.ASSETS.getResult("diceTable"));
            this._dice1 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 40, 120);
            this._dice1.scaleX = 0.5;
            this._dice1.scaleY = 0.5;
            this._dice1Label = new objects.Label("0", "50px", void 0, "#FFFFFF", 40, 230);
            this._dice2 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 160, 120);
            this._dice2.scaleX = 0.5;
            this._dice2.scaleY = 0.5;
            this._dice2Label = new objects.Label("0", "50px", void 0, "#FFFFFF", 160, 230);
            this._dice3 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 280, 120);
            this._dice3.scaleX = 0.5;
            this._dice3.scaleY = 0.5;
            this._dice3Label = new objects.Label("0", "50px", void 0, "#FFFFFF", 280, 220);
            this._dice4 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 410, 120);
            this._dice4.scaleX = 0.5;
            this._dice4.scaleY = 0.5;
            this._dice4Label = new objects.Label("0", "50px", void 0, "#FFFFFF", 410, 230);
            this._dice5 = new objects.Button(config.Game.ASSETS.getResult("diceBlank"), 520, 120);
            this._dice5.scaleX = 0.5;
            this._dice5.scaleY = 0.5;
            this._dice5Label = new objects.Label("0", "50px", void 0, "#FFFFFF", 520, 230);
            this._resultLabel = new objects.Label("Result: 0", "50px", void 0, "#FFFFFF", 310, 330);
            this._rollBtn = new objects.Button(config.Game.ASSETS.getResult("rollButton"), 250, 400);
            this._rollBtn.on('click', function (e) {
                if (!_this._moveDices) {
                    // move dices on
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
                        _this._dice3Number = Math.floor(util.Mathf.RandomRange(1, 6));
                        _this._dice3.image = _this._diceArray[_this._dice3Number];
                        _this._dice3Label.text = _this._dice3Number.toString();
                        console.log(_this._dice3Number);
                        _this._dice4Number = Math.floor(util.Mathf.RandomRange(1, 6));
                        _this._dice4.image = _this._diceArray[_this._dice4Number];
                        _this._dice4Label.text = _this._dice4Number.toString();
                        console.log(_this._dice4Number);
                        _this._dice5Number = Math.floor(util.Mathf.RandomRange(1, 6));
                        _this._dice5.image = _this._diceArray[_this._dice5Number];
                        _this._dice5Label.text = _this._dice5Number.toString();
                        console.log(_this._dice5Number);
                        // move dices off
                        _this._moveDices = false;
                        var min = Math.min(_this._dice1Number, _this._dice2Number, _this._dice3Number, _this._dice4Number, _this._dice5Number);
                        _this._resultLabel.text = 'Result: ' + (_this._dice1Number + _this._dice2Number + _this._dice3Number + _this._dice4Number + _this._dice5Number - min);
                    });
                }
            });
            this.Main();
        };
        /**
         * This method update the objects according to the FPS
         *
         * @memberof Play
         */
        PlayBonus.prototype.Update = function () {
            if (this._moveDices) {
                //set a random dice 
                var dice1 = Math.floor(util.Mathf.RandomRange(1, 6));
                this._dice1.image = this._diceArray[dice1];
                var dice2 = Math.floor(util.Mathf.RandomRange(1, 6));
                this._dice2.image = this._diceArray[dice2];
                var dice3 = Math.floor(util.Mathf.RandomRange(1, 6));
                this._dice3.image = this._diceArray[dice3];
                var dice4 = Math.floor(util.Mathf.RandomRange(1, 6));
                this._dice4.image = this._diceArray[dice4];
                var dice5 = Math.floor(util.Mathf.RandomRange(1, 6));
                this._dice5.image = this._diceArray[dice5];
            }
        };
        /**
         * Main function of the Scene
         *
         * @memberof Play
         */
        PlayBonus.prototype.Main = function () {
            this.addChild(this._diceTable);
            this.addChild(this._dice1);
            this.addChild(this._dice1Label);
            this.addChild(this._dice2);
            this.addChild(this._dice2Label);
            this.addChild(this._dice3);
            this.addChild(this._dice3Label);
            this.addChild(this._dice4);
            this.addChild(this._dice4Label);
            this.addChild(this._dice5);
            this.addChild(this._dice5Label);
            this.addChild(this._resultLabel);
            this.addChild(this._rollBtn);
        };
        return PlayBonus;
    }(objects.Scene));
    scenes.PlayBonus = PlayBonus;
})(scenes || (scenes = {}));
//# sourceMappingURL=PlayBonus.js.map