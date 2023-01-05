import { Unit } from "./unit";

export interface Effect {
    apply(user: Unit, target: Unit): Promise<void>;
}

export class DamageEffect implements Effect {
    damage: number;

    constructor(damage: number) {
        this.damage = damage;
    }

    async apply(user: Unit, target: Unit): Promise<void> {
        target.takeDamage(this.damage);
    }
}

export class HealEffect implements Effect {
    heal: number;

    constructor(heal: number) {
        this.heal = heal;
    }

    async apply(user: Unit, target: Unit): Promise<void> {
        target.heal(this.heal);
    }
}

export class BuffEffect implements Effect {
    stat: string;
    value: number;
    duration: number;

    constructor(stat: string, value: number, duration: number) {
        this.stat = stat;
        this.value = value;
        this.duration = duration;
    }

    async apply(user: Unit, target: Unit): Promise<void> {
        target.addBuff(this.stat, this.value, this.duration);
    }
}

export class DebuffEffect implements Effect {
    stat: string;
    value: number;
    duration: number;

    constructor(stat: string, value: number, duration: number) {
        this.stat = stat;
        this.value = value;
        this.duration = duration;
    }

    async apply(user: Unit, target: Unit): Promise<void> {
        target.addDebuff(this.stat, this.value, this.duration);
    }
}

export class StunEffect implements Effect {
    duration: number;

    constructor(duration: number) {
        this.duration = duration;
    }

    async apply(user: Unit, target: Unit): Promise<void> {
        target.stun(this.duration);
    }
}