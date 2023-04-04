1- Run ```npm install -D typescript @types/node```  
  
2- create the ts-config.json file by running ```npx tsc --init``` and then have following options in it-  
```{
  "compilerOptions": {
     "target": "es2016",
     "module": "commonjs",
     "rootDir": "./",
     "resolveJsonModule": true, /* in case you are importing JSON files */
     "outDir": "./build",
     "esModuleInterop": true,
     "forceConsistentCasingInFileNames": true,
     "strict": true,
     "noImplicitAny": true,
     "skipLibCheck": true,
  }
}```  
  
3- Run ```npm install -D rimraf npm-run-all ts-node```  
  
4- Create a file src/index.ts.  
  
5- Add below scripts in package.json,  
```"scripts": {
  "clean": "rimraf ./build",
  "build": "npm-run-all lint format clean && tsc",
  "start": "node src",
  "local": "ts-node src",
  "test": "jest",
  "lint": "eslint src",
  "format": "npx prettier --write src",
  "format:check": "npx prettier --check src"
}```  
  
6- The local script uses ts-node to run our project instead of node command. This is pretty much a node but in typescript.  
  
7- Run ```npm i -D supertest @types/supertest jest @types/jest ts-jest```

8- Add jest.config.js in root directory and add following code-  
```module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: './src/.*\\.(test|spec)?\\.(js|ts)$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  roots: ['<rootDir>/src'],
};```
  
9- One thing we need to do now is to exclude test files ( *.test.ts) from our build by adding them to the exclude option in the ts-config.json file  
  
10- For linting- run ```npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint prettier eslint-config-prettier```  
  
11- Now create the .eslintrc file with the following code  
```{
  "extends": [
    "eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "root": true
}```