export type ClassValue = string | number | null | undefined | Array<ClassValue> | Record<string, boolean | null | undefined>;

export function cn(...inputs: Array<ClassValue>): string {
    const classes: Array<string> = [];

    for (const input of inputs) {
        if (!input) continue;
        if (typeof input === 'string' || typeof input === 'number') {
            classes.push(String(input));
            continue;
        }
        if (Array.isArray(input)) {
            classes.push(cn(...input));
            continue;
        }
        if (typeof input === 'object') {
            for (const [key, value] of Object.entries(input)) {
                if (value) classes.push(key);
            }
        }
    }

    return classes.join(' ');
}

export function isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function clamp(value: number, min: number, max: number): number {
    if (Number.isNaN(value) || Number.isNaN(min) || Number.isNaN(max)) {
        throw new Error('clamp: all arguments must be numbers');
    }

    return Math.min(Math.max(value, min), max);
}
