import { nodeAppConfig } from '@igor-siergiej/eslint-config';

export default [
    ...nodeAppConfig,
    {
        files: ['**/types/**/*.ts', '**/*.types.ts', '**/*.enum.ts', '**/lib/**/types.ts'],
        rules: {
            'unused-imports/no-unused-vars': 'off',
        },
    },
];
