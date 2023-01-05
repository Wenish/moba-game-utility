"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gun = exports.Hammer = exports.Daggers = exports.Bow = exports.Sword = exports.WeaponType = void 0;
var WeaponType;
(function (WeaponType) {
    WeaponType[WeaponType["Melee"] = 0] = "Melee";
    WeaponType[WeaponType["Ranged"] = 1] = "Ranged";
})(WeaponType = exports.WeaponType || (exports.WeaponType = {}));
var Sword = /** @class */ (function () {
    function Sword() {
        this.name = "Sword";
        this.type = WeaponType.Melee;
        this.attackSpeed = 1.5;
        this.attackTime = 1.0;
        this.attackPower = 10;
        this.attackRange = 2;
    }
    return Sword;
}());
exports.Sword = Sword;
var Bow = /** @class */ (function () {
    function Bow() {
        this.name = "Bow";
        this.type = WeaponType.Ranged;
        this.attackSpeed = 1.0;
        this.attackTime = 1.5;
        this.attackPower = 8;
        this.attackRange = 10;
    }
    return Bow;
}());
exports.Bow = Bow;
var Daggers = /** @class */ (function () {
    function Daggers() {
        this.name = "Daggers";
        this.type = WeaponType.Melee;
        this.attackSpeed = 2.0;
        this.attackTime = 0.5;
        this.attackPower = 6;
        this.attackRange = 1;
    }
    return Daggers;
}());
exports.Daggers = Daggers;
var Hammer = /** @class */ (function () {
    function Hammer() {
        this.name = "Hammer";
        this.type = WeaponType.Melee;
        this.attackSpeed = 1.0;
        this.attackTime = 2.0;
        this.attackPower = 12;
        this.attackRange = 3;
    }
    return Hammer;
}());
exports.Hammer = Hammer;
var Gun = /** @class */ (function () {
    function Gun() {
        this.name = "Gun";
        this.type = WeaponType.Ranged;
        this.attackSpeed = 0.5;
        this.attackTime = 2.0;
        this.attackPower = 10;
        this.attackRange = 15;
    }
    return Gun;
}());
exports.Gun = Gun;
