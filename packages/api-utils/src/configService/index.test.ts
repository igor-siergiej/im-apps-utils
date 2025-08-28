import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { ConfigError, ConfigService, getEnv, loadBaseConfig, parsers } from '.';

const ORIGINAL_ENV = process.env;

describe('configService', () => {
    beforeEach(() => {
        process.env = { ...ORIGINAL_ENV };
    });

    afterEach(() => {
        process.env = ORIGINAL_ENV;
    });

    it('getEnv returns parsed values and throws when missing without fallback', () => {
        process.env.TEST_NUMBER = '42';
        expect(getEnv('TEST_NUMBER', parsers.number)).toBe(42);
        expect(() => getEnv('MISSING')).toThrowError(new ConfigError('MISSING'));
        expect(getEnv('OPTIONAL', parsers.string, 'fallback')).toBe('fallback');
    });

    it('loadBaseConfig reads required envs', () => {
        process.env.PORT = '3000';
        process.env.CONNECTION_URI = 'mongodb://localhost:27017';
        process.env.DATABASE_NAME = 'testdb';
        const cfg = loadBaseConfig();
        expect(cfg).toEqual({ PORT: 3000, CONNECTION_URI: 'mongodb://localhost:27017', DATABASE_NAME: 'testdb' });
    });

    it('ConfigService parses, supports default, optional, and throws when missing', () => {
        process.env.NUM = '5';
        process.env.FLAG = 'true';
        delete process.env.TEST_NAME;

        const schema = {
            NUM: { parser: parsers.number },
            FLAG: { parser: parsers.boolean },
            NAME: { parser: parsers.string, default: 'anon', from: 'TEST_NAME' },
            OPT: { parser: parsers.string, optional: true },
            REMAP: { parser: parsers.string, from: 'REMAPPED' },
        } as const;

        process.env.REMAPPED = 'value';

        const service = new ConfigService(schema);
        expect(service.get('NUM')).toBe(5);
        expect(service.get('FLAG')).toBe(true);
        expect(service.get('NAME')).toBe('anon');
        expect(service.get('OPT')).toBeUndefined();
        expect(service.get('REMAP')).toBe('value');

        const badSchema = { REQ: { parser: parsers.string } } as const;
        expect(() => new ConfigService(badSchema)).toThrowError(new ConfigError('REQ'));
    });
});
