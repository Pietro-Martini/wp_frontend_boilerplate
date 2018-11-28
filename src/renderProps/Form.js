import React from 'react'
import values from '../helpers/values'
import entries from '../helpers/entries'

import Field from '../components/Field'

import createCommentFormValidations from '../validationFns/createCommentFormValidations'
import loginFormValidations from '../validationFns/loginFormValidations'
import registrationValidations from '../validationFns/registrationValidations'

import loginFormFields from '../formFields/loginFormFields'
import commentFormFields from '../formFields/commentFormFields'
import registrationFormFields from '../formFields/registrationFormFields'
import searchFormFields from '../formFields/searchFormFields'

const generateForm = (fields, validationFns) => (
    class Form extends React.Component {
        constructor(props) {
            super(props)

            this.state = this.createInitialState(fields)
        }

        createInitialState = fields => fields.reduce((initialState, {name}) => {
            const defaultFieldState = {
                value: '',
                errors: [],
                touched: false
            }

            return {...initialState, [name]: defaultFieldState}
        }, {})

        checkForErrors = formState => Object.keys(formState).some(
            fKey => formState[fKey].errors.length > 0
        )

        validateEntries = () => {
            const formState = this.state

            const validatedState = Object.keys(formState).reduce((validatedState, sKey) => {
                const fieldState = formState[sKey]
                const fieldValidations = validationFns[sKey]

                validatedState[sKey] = {
                    ...fieldState,
                    errors: fieldValidations.reduce((fieldErrs, validationFn) => {
                        const error = validationFn(fieldState.value, formState)
                        return error ? fieldErrs.concat(error) : fieldErrs
                    }, [])
                }

                return validatedState
            }, {})

            return validatedState
        }

        handleInputUpdate = e => {
            const key = e.target.name
            const {value} = e.target

            this.setState({
                ...this.state,
                [key]: {
                    ...this.state[key],
                    value
                }
            }, () => {
                if (validationFns) {
                    this.setState(this.validateEntries())
                }
            })
        }

        updateFieldTouched = e => {
            const key = e.target.name

            this.setState({
                ...this.state,
                [key]: {
                    ...this.state[key],
                    touched: true
                }
            })
        }

        getFieldValues = state => {
            return entries(state).reduce((formBody, [field, fieldState]) => {
                formBody[field] = fieldState.value
                return formBody
            }, {})
        }

        handleSubmit = e => {
            e.preventDefault()

            const formBody = this.getFieldValues(this.state)

            this.props.onSubmit(formBody)
            if (!this.props.preserveFormStateOnSubmit) {
                this.setState({...this.createInitialState(fields)})
            }        
        }

        render = () => {
            const {children, error} = this.props
            const {state} = this         

            return (
                <React.Fragment>
                    <form onSubmit={this.handleSubmit}>
                        {fields.map(f => {
                            return (
                                <Field {...f}
                                    key={f.name}
                                    value={state[f.name].value}
                                    touched={state[f.name].touched}
                                    errors={state[f.name].errors}
                                    handleInputUpdate={this.handleInputUpdate}
                                    updateFieldTouched={this.updateFieldTouched}
                                />
                            )
                        })}
                        <input className='btn' type='submit' value='Submit' disabled={this.checkForErrors(state)} />
                    </form>
                    {this.props.children && this.props.children({
                        fieldVals: this.getFieldValues(this.state)
                    })}
                </React.Fragment>                
            )
        }
    }
)

export const LoginForm = generateForm(loginFormFields, loginFormValidations)
export const CreateCommentForm = generateForm(commentFormFields, createCommentFormValidations)
export const RegisterForm = generateForm(registrationFormFields, registrationValidations)
export const SearchForm = generateForm(searchFormFields)
