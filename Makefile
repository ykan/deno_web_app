test:
	deno test --allow-all --unstable --import-map=./importMap.json

cache:
	deno cache main.ts --unstable --import-map=./importMap.json

run:
	deno run --unstable --allow-all --import-map=./importMap.json main.ts

debug:
	deno run  --inspect-brk --unstable --allow-all --import-map=./importMap.json main.ts

gen:
	deno run --unstable --allow-all --import-map=./importMap.json tool/gen.ts

watch:
	deno run --unstable --allow-all --import-map=./importMap.json tool/watch.ts
