"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UltimateSkill = exports.ActiveSkill = exports.PassiveSkill = exports.Skill = exports.SkillType = void 0;
var SkillType;
(function (SkillType) {
    SkillType[SkillType["Passive"] = 0] = "Passive";
    SkillType[SkillType["Active"] = 1] = "Active";
    SkillType[SkillType["Ultimate"] = 2] = "Ultimate";
})(SkillType = exports.SkillType || (exports.SkillType = {}));
var Skill = /** @class */ (function () {
    function Skill(name, type, cooldown, powerCost, requiredWeapon) {
        this.name = name;
        this.type = type;
        this.cooldown = cooldown;
        this.powerCost = powerCost;
        this.requiredWeapon = requiredWeapon;
        this.remainingCooldown = 0;
    }
    Skill.prototype.startCooldown = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.remainingCooldown = this.cooldown;
                        _a.label = 1;
                    case 1:
                        if (!(this.remainingCooldown > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 2:
                        _a.sent();
                        this.remainingCooldown -= 1;
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Skill;
}());
exports.Skill = Skill;
var PassiveSkill = /** @class */ (function (_super) {
    __extends(PassiveSkill, _super);
    function PassiveSkill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PassiveSkill.prototype.use = function (user, target) {
        return new Promise(function (resolve) {
            resolve();
        });
    };
    return PassiveSkill;
}(Skill));
exports.PassiveSkill = PassiveSkill;
var ActiveSkill = /** @class */ (function (_super) {
    __extends(ActiveSkill, _super);
    function ActiveSkill(name, cooldown, powerCost, requiredWeapon, duration, effects) {
        var _this = _super.call(this, name, SkillType.Active, cooldown, powerCost, requiredWeapon) || this;
        _this.duration = duration;
        _this.effects = effects;
        return _this;
    }
    ActiveSkill.prototype.use = function (user, target) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, effect;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.effects;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        effect = _a[_i];
                        return [4 /*yield*/, effect.apply(user, target)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return ActiveSkill;
}(Skill));
exports.ActiveSkill = ActiveSkill;
var UltimateSkill = /** @class */ (function (_super) {
    __extends(UltimateSkill, _super);
    function UltimateSkill(name, cooldown, powerCost, requiredWeapon, duration, effects) {
        var _this = _super.call(this, name, cooldown, powerCost, requiredWeapon, duration, effects) || this;
        _this.type = SkillType.Ultimate;
        return _this;
    }
    return UltimateSkill;
}(ActiveSkill));
exports.UltimateSkill = UltimateSkill;
