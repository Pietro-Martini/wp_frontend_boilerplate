import capitalize from './capitalize'

export default str => str.split(/(?=[A-Z])/).map(capitalize).join(' ')
