export interface ILogger {
    info: (message: string, ...meta: Array<unknown>) => void;
    warn: (message: string, ...meta: Array<unknown>) => void;
    error: (message: string, ...meta: Array<unknown>) => void;
}
