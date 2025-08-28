import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Logger } from '.';

describe('Logger', () => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    beforeEach(() => {
        console.log = vi.fn();
        console.warn = vi.fn();
        console.error = vi.fn();
    });

    afterEach(() => {
        console.log = originalLog;
        console.warn = originalWarn;
        console.error = originalError;
    });

    it('writes info logs with JSON payload', () => {
        const logger = new Logger();
        logger.info('hello', { a: 1 });
        expect(console.log).toHaveBeenCalledTimes(1);
        const payload = (console.log as any).mock.calls[0][0] as string;
        const obj = JSON.parse(payload);
        expect(obj).toMatchObject({ level: 'info', message: 'hello' });
        expect(obj.meta).toBeDefined();
    });

    it('writes warn and error logs', () => {
        const logger = new Logger();
        logger.warn('be careful');
        logger.error('boom', { reason: 'x' });
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledTimes(1);
    });
});
