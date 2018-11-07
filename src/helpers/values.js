export default (obj) => Object.keys(obj).reduce((values, k) => values.concat(obj[k]), [])
