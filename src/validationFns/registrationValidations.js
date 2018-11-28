import {inputNotBlank, otherFieldMustMatch} from './index'

export default {
    username: [inputNotBlank],
    password: [inputNotBlank, otherFieldMustMatch('confirmPassword')],
    confirmPassword: [inputNotBlank, otherFieldMustMatch('password')]
}
