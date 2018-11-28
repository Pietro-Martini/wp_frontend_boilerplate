import convertFromCamelCase from '../helpers/convertFromCamelCase'

export const inputNotBlank = x => x === '' ? 'Input cannot be blank' : null

export const otherFieldMustMatch = otherFieldName => (fieldVal, formState) => {    
    const fieldsMatch = fieldVal === formState[otherFieldName].value
    return !fieldsMatch ? `${convertFromCamelCase(otherFieldName)} and this field must have matching values` : null
}
