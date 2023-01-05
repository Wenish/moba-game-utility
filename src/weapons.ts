export enum WeaponType {
    Melee,
    Ranged
}

export interface Weapon {
    name: string;
    type: WeaponType;
    attackSpeed: number;
    attackTime: number;
    attackPower: number;
    attackRange: number;
}

export class Sword implements Weapon {
    name: string = "Sword";
    type: WeaponType = WeaponType.Melee;
    attackSpeed: number = 1.5;
    attackTime: number = 1.0;
    attackPower: number = 10;
    attackRange: number = 2;
}

export class Bow implements Weapon {
    name: string = "Bow";
    type: WeaponType = WeaponType.Ranged;
    attackSpeed: number = 1.0;
    attackTime: number = 1.5;
    attackPower: number = 8;
    attackRange: number = 10;
}

export class Daggers implements Weapon {
    name: string = "Daggers";
    type: WeaponType = WeaponType.Melee;
    attackSpeed: number = 2.0;
    attackTime: number = 0.5;
    attackPower: number = 6;
    attackRange: number = 1;
}

export class Hammer implements Weapon {
    name: string = "Hammer";
    type: WeaponType = WeaponType.Melee;
    attackSpeed: number = 1.0;
    attackTime: number = 2.0;
    attackPower: number = 12;
    attackRange: number = 3;
}

export class Gun implements Weapon {
    name: string = "Gun";
    type: WeaponType = WeaponType.Ranged;
    attackSpeed: number = 0.5;
    attackTime: number = 2.0;
    attackPower: number = 10;
    attackRange: number = 15;
}