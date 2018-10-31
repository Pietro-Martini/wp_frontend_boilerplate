export default function transformObj (obj, fn) {
    return Object.keys(obj)
    .reduce(fn)
}
