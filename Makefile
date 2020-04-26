install:
	npm install

start:
	npx babel-node src/bin/gendiff.js $(ARGS)

lint:
	npx eslint .

publish:
	npm publish --dry-run
