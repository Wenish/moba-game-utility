"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debuff = exports.Buff = void 0;
var Buff = /** @class */ (function () {
    function Buff(stat, value, duration) {
        this.stat = stat;
        this.value = value;
        this.duration = duration;
    }
    Buff.prototype.update = function () {
        this.duration -= 1;
    };
    Buff.prototype.reset = function (value, duration) {
        this.value = value;
        this.duration = duration;
    };
    return Buff;
}());
exports.Buff = Buff;
var Debuff = /** @class */ (function () {
    function Debuff(stat, value, duration) {
        this.stat = stat;
        this.value = value;
        this.duration = duration;
    }
    Debuff.prototype.update = function () {
        this.duration -= 1;
    };
    Debuff.prototype.reset = function (value, duration) {
        this.value = value;
        this.duration = duration;
    };
    return Debuff;
}());
exports.Debuff = Debuff;
