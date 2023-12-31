# eslint-plugin-no-duplicates-imported-name

## Installing
You'll first need to install ESLint

```
npm i -D eslint
```

Next, you install this plugin

```
npm i -D eslint-plugin-no-duplicates-imported-name
```

## Usage

Add it to your eslint config

```
// .eslintrc.json
{
  "plugins": [
    "no-duplicates-imported-name"
  ],
  "rules": {
    "no-duplicates-imported-name/no-duplicates-imported-name": "error",
  }
}
```

## Rule

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

❌ Incorrect
```ts
import { A, A } from 'Foo';
import type { B, B, C } from 'Bar';
import D, { E, F, E } from 'Hoge';
```

✅ Correct
```ts
import { A } from 'Foo';
import type { B, C } from 'Bar';
import D, { E, F } from 'Hoge';
import G from "Baz"
import "Hoge"
```
