yarn init
yarn add typescript -D
yarn add @types/node -D
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
mkdir src
touch src/index.ts

npx tsc

yarn add ts-node nodemon -D
touch nodemon.json