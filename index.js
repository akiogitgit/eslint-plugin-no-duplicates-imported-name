'use strict'

const noDuplicatesImportedName = require('./rules/no-duplicates-imported-name')

// import all rules
module.exports.rules = {
  'no-duplicates-imported-name': noDuplicatesImportedName,
}
