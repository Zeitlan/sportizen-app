module.exports = {
    'env': {
        'jest': true,
        'browser': true
    },
    'parser': 'babel-eslint',
    'parserOptions': {
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'linebreak-style': 0,
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'comma-dangle': 'off',
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ]
    }
};