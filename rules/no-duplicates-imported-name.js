'use strict'

const checkDuplicated = arr => {
  const setArr = new Set(arr)
  return setArr.size !== arr.length
}

/**
 * @type {import("@typescript-eslint/experimental-utils").TSESLint.RuleModule}
 */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'check duplicated named import',
    },
    fixable: 'code',
  },
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const specifiers = node.specifiers

        if (specifiers.length === 0) return // import '@testing-library/jest-dom'; のような場合無視する

        // ex) import { a, b, c } from 'foo' => ["a", "b", "c"]
        const namedImportedNames = specifiers
          .map(specifier => specifier.imported?.name)
          .filter(Boolean) // default import は除外

        const hasDuplicate = checkDuplicated(namedImportedNames)

        if (!hasDuplicate) return // 重複がない場合終了

        // ex) import { a, a, b, c, c } from "foo" => ["a", "c"]
        const duplicatedNames = namedImportedNames.filter(
          (name, index, arr) => arr.indexOf(name) !== index,
        )

        const message = `${duplicatedNames.join(', ')} が重複しています`

        const fix = fixer => {
          const fixedNamedImportedNames = [...new Set(namedImportedNames)] // 重複を除いたnamedImportedNames
          const fixedImportedNamesStr = `import$1{ ${fixedNamedImportedNames.join(
            ', ',
          )} }`

          const replaceText = String(context.getSource(node)).replace(
            /import([\s\S]*?){[\s\S]+?}/,
            fixedImportedNamesStr,
          )

          return fixer.replaceText(node, replaceText)
        }

        context.report({
          node,
          message,
          fix,
        })
      },
    }
  },
}
