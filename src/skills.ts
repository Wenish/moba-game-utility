import { Effect } from "./effects";
import { Unit } from "./unit";
import { Weapon } from "./weapons";

export enum SkillType {
    Passive,
    Active,
    Ultimate,
}

export interface Skill {
    name: string;
    type: SkillType;
    cooldown: number;
    powerCost: number;
    requiredWeapon: Weapon | null;
}

export interface ActiveSkill extends Skill {
    duration: number;
    effects: Effect[];
}

export interface UltimateSkill extends ActiveSkill {
}

export abstract class Skill implements Skill {
    name: string;
    type: SkillType;
    cooldown: number;
    powerCost: number;
    requiredWeapon: Weapon | null;
    remainingCooldown: number;

    constructor(name: string, type: SkillType, cooldown: number, powerCost: number, requiredWeapon: Weapon | null) {
        this.name = name;
        this.type = type;
        this.cooldown = cooldown;
        this.powerCost = powerCost;
        this.requiredWeapon = requiredWeapon;
        this.remainingCooldown = 0;
    }

    abstract use(user: Unit, target: Unit): Promise<void>;

    async startCooldown(): Promise<void> {
        this.remainingCooldown = this.cooldown;
        while (this.remainingCooldown > 0) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            this.remainingCooldown -= 1;
        }
    }
}

export class PassiveSkill extends Skill {
    use(user: Unit, target: Unit): Promise<void> {
        return new Promise((resolve) => {
            resolve();
        });
    }
}

export class ActiveSkill extends Skill {
    duration: number;
    effects: Effect[];

    constructor(name: string, cooldown: number, powerCost: number, requiredWeapon: Weapon | null, duration: number, effects: Effect[]) {
        super(name, SkillType.Active, cooldown, powerCost, requiredWeapon);
        this.duration = duration;
        this.effects = effects;
    }

    use(user: Unit, target: Unit): Promise<void> {
        return new Promise(async (resolve) => {
            for (const effect of this.effects) {
                await effect.apply(user, target);
            }
            resolve();
        });
    }
}

export class UltimateSkill extends ActiveSkill {
    constructor(name: string, cooldown: number, powerCost: number, requiredWeapon: Weapon | null, duration: number, effects: Effect[]) {
        super(name, cooldown, powerCost, requiredWeapon, duration, effects);
        this.type = SkillType.Ultimate;
    }
}