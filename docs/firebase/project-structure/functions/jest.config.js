module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/__tests__/**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.json' }], // Explicitly reference tsconfig.json
    },
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.json', // Ensure tsconfig is explicitly referenced
            isolatedModules: true, // Ensure isolatedModules is enabled
        },
    },
    moduleNameMapper: {
        '^firebase-admin$': '<rootDir>/node_modules/firebase-admin', // Ensure firebase-admin resolves correctly
    },
};
