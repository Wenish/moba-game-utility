import { Buff, Debuff } from "./buffs";
import { PassiveSkill, ActiveSkill, UltimateSkill, Skill, SkillType } from "./skills";
import { Weapon } from "./weapons";

export class Unit {
    name: string;
    moveSpeed: number;
    maxHealth: number;
    health: number;
    maxShield: number;
    shield: number;
    weapon: Weapon | null;
    passiveSkill: PassiveSkill | null;
    normalSkills: ActiveSkill[];
    ultimateSkill: UltimateSkill | null;
    skillInProgress: boolean;
    currentSkill: Skill | null;
    skillRemainingDuration: number;
    buffs: { [key: string]: Buff };
    debuffs: { [key: string]: Debuff };
    stunned: boolean;

    constructor(name: string, moveSpeed: number, maxHealth: number, maxShield: number) {
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

    equipWeapon(weapon: Weapon): void {
        this.weapon = weapon;
    }

    equipSkill(skill: Skill): void {
        switch (skill.type) {
            case SkillType.Passive:
                this.passiveSkill = skill as PassiveSkill;
                break;
            case SkillType.Active:
                if (this.normalSkills.length < 3) {
                    this.normalSkills.push(skill as ActiveSkill);
                }
                break;
            case SkillType.Ultimate:
                this.ultimateSkill = skill as UltimateSkill;
                break;
        }
    }

    takeDamage(damage: number): void {
        if (this.shield > 0) {
            this.shield -= damage;
            if (this.shield < 0) {
                this.health += this.shield;
                this.shield = 0;
            }
        }
    }

    heal(heal: number): void {
        this.health += heal;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    addBuff(stat: string, value: number, duration: number): void {
        if (this.buffs[stat]) {
            this.buffs[stat].reset(value, duration);
        } else {
            this.buffs[stat] = new Buff(stat, value, duration);
        }
    }

    addDebuff(stat: string, value: number, duration: number): void {
        if (this.debuffs[stat]) {
            this.debuffs[stat].reset(value, duration);
        } else {
            this.debuffs[stat] = new Debuff(stat, value, duration);
        }
    }

    stun(duration: number): void {
        this.stunned = true;
        setTimeout(() => {
            this.stunned = false;
        }, duration);
    }

    async useSkill(skill: ActiveSkill, target: Unit): Promise<void> {
        if (!this.skillInProgress && !this.stunned) {
            this.currentSkill = skill;
            this.skillRemainingDuration = skill.duration;
            this.skillInProgress = true;
            await skill.use(this, target);
            this.currentSkill = null;
            this.skillRemainingDuration = 0;
            this.skillInProgress = false;
        }
    }

    update(): void {
        for (const stat in this.buffs) {
            this.buffs[stat].update();
            if (this.buffs[stat].duration <= 0) {
                delete this.buffs[stat];
            }
        }
        for (const stat in this.debuffs) {
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
    }
}