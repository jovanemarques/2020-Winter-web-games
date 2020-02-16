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
            var _this = _super.call(this, imagePath) || this;
            _this.cursor = "pointer";
            if (isCentered) {
                _this.regX = 75;
                _this.regY = 250;
            }
            _this.x = x;
            _this.y = y;
            _this.on("mouseover", _this.hoverOver);
            _this.on("mouseout", _this.hoverOut);
            return _this;
        }
        Button.prototype.hoverOver = function () {
            this.alpha = 0.7;
        };
        Button.prototype.hoverOut = function () {
            this.alpha = 1;
        };
        return Button;
    }(createjs.Bitmap));
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=Button.js.map