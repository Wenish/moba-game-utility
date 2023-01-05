"use strict";
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
exports.Unit = void 0;
var buffs_1 = require("./buffs");
var skills_1 = require("./skills");
var Unit = /** @class */ (function () {
    function Unit(name, moveSpeed, maxHealth, maxShield) {
        this.name = name;
        this.moveSpeed = moveSpeed;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.maxShield = maxShield;
        this.shield = maxShield;
        this.weapon = null;
        this.passiveSkill = null;
        this.normalSkills = [];
        this.ultimateSkill = null;
        this.skillInProgress = false;
        this.currentSkill = null;
        this.skillRemainingDuration = 0;
        this.buffs = {};
        this.debuffs = {};
        this.stunned = false;
    }
    Unit.prototype.equipWeapon = function (weapon) {
        this.weapon = weapon;
    };
    Unit.prototype.equipSkill = function (skill) {
        switch (skill.type) {
            case skills_1.SkillType.Passive:
                this.passiveSkill = skill;
                break;
            case skills_1.SkillType.Active:
                if (this.normalSkills.length < 3) {
                    this.normalSkills.push(skill);
                }
                break;
            case skills_1.SkillType.Ultimate:
                this.ultimateSkill = skill;
                break;
        }
    };
    Unit.prototype.takeDamage = function (damage) {
        if (this.shield > 0) {
            this.shield -= damage;
            if (this.shield < 0) {
                this.health += this.shield;
                this.shield = 0;
            }
        }
    };
    Unit.prototype.heal = function (heal) {
        this.health += heal;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    };
    Unit.prototype.addBuff = function (stat, value, duration) {
        if (this.buffs[stat]) {
            this.buffs[stat].reset(value, duration);
        }
        else {
            this.buffs[stat] = new buffs_1.Buff(stat, value, duration);
        }
    };
    Unit.prototype.addDebuff = function (stat, value, duration) {
        if (this.debuffs[stat]) {
            this.debuffs[stat].reset(value, duration);
        }
        else {
            this.debuffs[stat] = new buffs_1.Debuff(stat, value, duration);
        }
    };
    Unit.prototype.stun = function (duration) {
        var _this = this;
        this.stunned = true;
        setTimeout(function () {
            _this.stunned = false;
        }, duration);
    };
    Unit.prototype.useSkill = function (skill, target) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.skillInProgress && !this.stunned)) return [3 /*break*/, 2];
                        this.currentSkill = skill;
                        this.skillRemainingDuration = skill.duration;
                        this.skillInProgress = true;
                        return [4 /*yield*/, skill.use(this, target)];
                    case 1:
                        _a.sent();
                        this.currentSkill = null;
                        this.skillRemainingDuration = 0;
                        this.skillInProgress = false;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Unit.prototype.update = function () {
        for (var stat in this.buffs) {
            this.buffs[stat].update();
            if (this.buffs[stat].duration <= 0) {
                delete this.buffs[stat];
            }
        }
        for (var stat in this.debuffs) {
            this.debuffs[stat].update();
            if (this.debuffs[stat].duration <= 0) {
                delete this.debuffs[stat];
            }
        }
        if (this.currentSkill) {
            this.skillRemainingDuration -= 1;
            if (this.skillRemainingDuration <= 0) {
                this.currentSkill = null;
                this.skillInProgress = false;
            }
        }
    };
    return Unit;
}());
exports.Unit = Unit;
