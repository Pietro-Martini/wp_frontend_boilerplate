import React from 'react'
import values from '../helpers/values'
import entries from '../helpers/entries'

export default class Form extends React.Component {
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

        const fieldValidationFns = this.props.validationFns[key]

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
        const {children} = this.props
        const {state} = this

        return (
            <form onChange={this.onFieldChange} onSubmit={this.handleSubmit}>
                {children(this.state)}
                <input type='submit' value='Submit' disabled={this.checkForInvalidEntries(state)} />
            </form>
        )
    }
}
