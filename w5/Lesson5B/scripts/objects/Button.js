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
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(imagePath, x, y, isCentered) {
            if (imagePath === void 0) { imagePath = './assets/images/placeholder.png'; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = true; }
            var _this = _super.call(this, imagePath, x, y, isCentered) || this;
            _this.on("mouseover", _this.hoverOver);
            _this.on("mouseout", _this.hoverOut);
            _this.Start();
            return _this;
        }
        Button.prototype.hoverOver = function () {
            this.alpha = 0.7;
        };
        Button.prototype.hoverOut = function () {
            this.alpha = 1;
        };
        Button.prototype._checkBounds = function () {
        };
        Button.prototype.Start = function () {
        };
        Button.prototype.Update = function () {
        };
        Button.prototype.Reset = function () {
        };
        return Button;
    }(objects.GameObjects));
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=Button.js.map