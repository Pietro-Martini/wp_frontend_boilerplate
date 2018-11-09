import React from 'react'

import Form from '../renderProps/Form'
import Field from '../components/Field'
import {AuthAPI} from '../renderProps/API'
import {AuthenticationConsumer} from '../providers/AuthenticationProvider'

import validationFns from '../validationFns/loginFormValidations'

import fields from '../formFields/loginFormFields'

const Login = ({postToken, login}) => {
    return (
        <Form fields={fields} validationFns={validationFns} onSubmit={
            ({username, password}) => {
                postToken({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    body: `password=${password}&username=${username}`,
                    successCb: login
                })
            }
        }>
            {formState => {
                return fields.map(f => {
                    const fieldName = f.name
                    return (
                        <Field {...f}
                            value={formState[fieldName].value}
                            errors={formState[fieldName].errors}
                        />
                    )
                })
            }}
        </Form>
    )
}

export default props => {
    return (
        <AuthenticationConsumer>
            {({login, isAuthenticated}) => (
                <AuthAPI>
                    {({postToken}) => (
                        <Login
                            login={login}
                            isAuthenticated={isAuthenticated}
                            postToken={postToken}
                        />
                    )}
                </AuthAPI>
            )}
        </AuthenticationConsumer>
    )
}
