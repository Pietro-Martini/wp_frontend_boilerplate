import entries from '../helpers/entries'

const encodeQueryParams = queryColl => {
  return entries(queryColl).reduce((coll, [key, val], i) => {
    const prevStr = i === 0 ? coll : `${coll}&`
    return `${prevStr}${key}=${val}`
  }, '/?')
}

export default encodeQueryParams
