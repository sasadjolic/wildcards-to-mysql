
function toMysqlOperator (type) {
  return `${type}`.includes('*') ? 'LIKE' : '='
}

function toMysqlLike (type) {
  // TODO: Enforce wildcard at end of string only
  // TODO: Escape %
  // TODO: Sanitize input
  return `${type}`.replace('*', '%')
}

function toMysqlRegex (types) {
  let rxs = []
  if (Array.isArray(types)) {
    for (let type of types) {
      rxs.push(translate(type))
    }
    return `(${rxs.map(ex => `(${ex})`).join('|')})`
  }

  return `${translate(types)}`
}

function translate (type) {
  return `${type}`
    .replace('.', '\\.')
    .replace('?', '.')
    .replace('*', '.*')
}

module.exports = {
  toMysqlOperator,
  toMysqlLike,
  toMysqlRegex
}
