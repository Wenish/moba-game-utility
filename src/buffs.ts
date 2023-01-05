export class Buff {
    stat: string;
    value: number;
    duration: number;

    constructor(stat: string, value: number, duration: number) {
        this.stat = stat;
        this.value = value;
        this.duration = duration;
    }

    update(): void {
        this.duration -= 1;
    }

    reset(value: number, duration: number): void {
        this.value = value;
        this.duration = duration;
    }
}

export class Debuff {
    stat: string;
    value: number;
    duration: number;

    constructor(stat: string, value: number, duration: number) {
        this.stat = stat;
        this.value = value;
        this.duration = duration;
    }

    update(): void {
        this.duration -= 1;
    }

    reset(value: number, duration: number): void {
        this.value = value;
        this.duration = duration;
    }
}