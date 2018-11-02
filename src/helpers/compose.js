const compose = (...fns) => x => fns.reduce((val, fn) => fn(val), x)

export default compose
