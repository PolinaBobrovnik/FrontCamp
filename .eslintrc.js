module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
      "sourceType": "module",
      "allowImportExportEverywhere": false,
      "codeFrame": true
    },
  "extends": "airbnb-base",
  "env": {
    "browser": true,
  },
  "rules": {
    "import/no-extraneous-dependencies": [
      "error", {
        "devDependencies": true
      }
    ]
  }
};