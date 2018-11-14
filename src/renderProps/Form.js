import React from 'react'
import values from '../helpers/values'
import entries from '../helpers/entries'

import createCommentFormValidations from '../validationFns/createCommentFormValidations'
import loginFormValidations from '../validationFns/loginFormValidations'

const generateForm = (validationFns) => (
    class Form extends React.Component {
        constructor(props) {
            super(props)

            this.state = this.createInitialState(this.props.fields)
        }

        checkForInvalidEntries = formState => values(formState).some(({errors}) => errors.length)

        createInitialState = fields => fields.reduce((initialState, {name}) => {
            const defaultFieldState = {
                value: '',
                errors: []
            }

            return {...initialState, [name]: defaultFieldState}
        }, {})

        onFieldChange = e => {
            const key = e.target.name
            const {value} = e.target

            const fieldValidationFns = validationFns[key]

            this.setState({
                ...this.state,
                [key]: {
                    value,
                    errors: fieldValidationFns.reduce((errorsColl, fn) => {
                        const error = fn(value, this.state)
                        return error ? errorsColl.concat(error) : errorsColl
                    }, [])
                }
            })
        }

        handleSubmit = e => {
            e.preventDefault()

            const formBody = entries(this.state).reduce((formBody, [field, fieldState]) => {
                formBody[field] = fieldState.value
                return formBody
            }, {})

            this.props.onSubmit(formBody)
        }

        render = () => {
            const {children, error} = this.props
            const {state} = this

            return (
                <form onChange={this.onFieldChange} onSubmit={this.handleSubmit}>
                    {children(this.state)}
                    <input type='submit' value='Submit' disabled={this.checkForInvalidEntries(state)} />
                </form>
            )
        }
    }
)

export const LoginForm = generateForm(loginFormValidations)
export const CreateCommentForm = generateForm(createCommentFormValidations)
