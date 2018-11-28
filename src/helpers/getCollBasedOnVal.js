import includes from './includes'

export default function getCollBasedOnVal (coll, val) {
  const hasVal = includes(Object.values(coll), val)
  if (hasVal) return coll
}
