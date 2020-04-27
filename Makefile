install:
	npm install

start:
	npx babel-node src/bin/gendiff.js $(ARGS)

lint:
	npx eslint .

test:
	npm run test

publish:
	npm publish --dry-run
