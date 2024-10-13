{
  "env": {
    "node": true,
    "es6": true,
    "jest": true // Si estás utilizando Jest para pruebas
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "quotes": ["error", "single"], // Usar comillas simples
    "semi": ["error", "always"], // Siempre usar punto y coma
    "no-unused-vars": "off", // Desactivar la regla de variables no utilizadas
    "@typescript-eslint/no-unused-vars": ["warn"], // Advertir sobre variables no utilizadas en TypeScript
    "@typescript-eslint/explicit-function-return-type": "off", // Desactivar la advertencia sobre tipos de retorno explícitos
    "indent": ["error", 2], // Usar 2 espacios para la indentación
    "no-empty-function": "warn", // Advertir sobre funciones vacías
    "@typescript-eslint/no-explicit-any": "warn" // Advertir sobre el uso de 'any'
  }
}
