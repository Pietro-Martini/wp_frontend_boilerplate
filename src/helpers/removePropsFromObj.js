export default function removePropsFromObj (obj, ...props) {
  return Object.keys(obj)
    .reduce((coll, prop) => {
      if (props.indexOf(prop) === -1) {
        const val = obj[prop]
        coll[prop] = val
      }
      return coll
    }, {})
}
