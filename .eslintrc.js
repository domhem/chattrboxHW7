module.exports = {
    "env": {
        "node": true,
        "browser": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console": "off",
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
