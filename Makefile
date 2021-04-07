test:
	deno test --allow-all --unstable --import-map=./importMap.json

cache:
	deno cache main.tsx --unstable --import-map=./importMap.json
