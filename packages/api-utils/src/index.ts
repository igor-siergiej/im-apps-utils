export interface PaginatedResponse<T> {
    data: Array<T>;
    total: number;
    page: number;
    pageSize: number;
}

export function createPaginatedResponse<T>(params: {
    items: Array<T>;
    total: number;
    page: number;
    pageSize: number;
}): PaginatedResponse<T> {
    const { items, total, page, pageSize } = params;

    return {
        data: items,
        total,
        page,
        pageSize,
    };
}

export class RetryableError extends Error {
    public readonly isRetryable: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'RetryableError';
        this.isRetryable = true;
    }
}

export async function retry<T>(fn: () => Promise<T>, options?: {
    retries?: number;
    delayMs?: number;
}): Promise<T> {
    const retries = options?.retries ?? 3;
    const delayMs = options?.delayMs ?? 250;

    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt === retries) break;
            await new Promise(res => setTimeout(res, delayMs));
        }
    }

    throw lastError instanceof Error ? lastError : new Error('Unknown error');
}
