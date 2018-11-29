import entries from '../helpers/entries'

const encodeQueryParams = (queryColl, endpointConfigured) => {
  return entries(queryColl).reduce((coll, [key, val], i) => {
    const prevStr = i === 0 ? coll : `${coll}&`
    return `${prevStr}${key}=${val}`
  }, endpointConfigured ? '&' : '/?')
}

export default encodeQueryParams
