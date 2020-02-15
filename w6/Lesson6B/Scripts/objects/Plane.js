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
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        // constructor
        function Plane() {
            return _super.call(this, config.Game.ASSETS.getResult("plane")) || this;
        }
        // PRIVATE LIFE CYCLE METHODS
        Plane.prototype._checkBounds = function () {
        };
        // PUBLIC LIFE CYCLE METHODS
        Plane.prototype.Start = function () {
        };
        Plane.prototype.Update = function () {
        };
        Plane.prototype.Reset = function () {
        };
        return Plane;
    }(objects.GameObject));
    objects.Plane = Plane;
})(objects || (objects = {}));
//# sourceMappingURL=Plane.js.map