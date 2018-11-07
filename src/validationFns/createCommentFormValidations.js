const inputNotBlank = x => x === '' ? 'Input cannot be blank' : null

export default {
    title: [inputNotBlank],
    content: [inputNotBlank]
}
