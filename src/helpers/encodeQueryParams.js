import entries from '../helpers/entries'

const encodeQueryParams = queryColl => {
  return entries(queryColl).reduce((coll, [key, val]) => {
    return `${coll}/?${key}=${val}`
  }, '')
}

export default encodeQueryParams
