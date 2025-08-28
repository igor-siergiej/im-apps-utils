export type ConstructorOfType<T> = new (...args: Array<any>) => T;

export type InstanceMap<Tokens extends string> = Partial<Record<Tokens, unknown>>;

export type DependencyMap<Tokens extends string> = Partial<Record<Tokens, ConstructorOfType<unknown>>>;
