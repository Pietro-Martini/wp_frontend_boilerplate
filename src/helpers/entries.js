export default function entries (obj) {
  return Object.keys(obj)
    .reduce((coll, key) => {
      coll.push([key, obj[key]])
      return coll
    }, [])
}
