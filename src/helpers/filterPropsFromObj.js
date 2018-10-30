import includes from './includes'

function filterPropsFromObj (fn) {
    return (obj, ...props) => {
        return Object.keys(obj)
          .reduce((coll, prop) => {
            if (fn(props, prop)) {
              const val = obj[prop]
              coll[prop] = val
            }
            return coll
          }, {})
    }
}

export const keepPropsInObj = filterPropsFromObj(includes)
export const removePropsFromObj = filterPropsFromObj(!includes)
