module.exports = {
    root: true,

    env: {
        node: true,
        browser: true
    },

    parser: '@typescript-eslint/parser',
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    extends: ['plugin:vue/strongly-recommended', 'eslint:recommended', '@vue/typescript/recommended', 'prettier'],
    plugins: ['@typescript-eslint', 'import', 'unicorn', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'vue/no-multiple-template-root': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',

        'prefer-promise-reject-errors': 'off',

        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        'import/order': [
            'warn',
            {
                groups: ['builtin', 'external', 'parent', 'sibling', 'index']
            }
        ],

        'unicorn/filename-case': [
            'error',
            {
                cases: {
                    kebabCase: true
                }
            }
        ]
    }
}
