import React from 'react'

import {LoginForm} from '../renderProps/Form'
import Field from '../components/Field'
import {AuthAPI} from '../renderProps/API'
import {AuthenticationConsumer} from '../providers/AuthenticationProvider'

import validationFns from '../validationFns/loginFormValidations'

import fields from '../formFields/loginFormFields'

const Login = ({postToken, login, history}) => {
    return (
        <LoginForm fields={fields} onSubmit={
            ({username, password}) => {
                postToken({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    body: `password=${password}&username=${username}`,
                    successCb: ({token}) => {
                        login(token)
                        history.push('/')
                    }
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
        </LoginForm>
    )
}

export default ({history, setDataFetching}) => {
    return (
        <AuthenticationConsumer>
            {({login, loggedIn}) => (
                <AuthAPI setDataFetching={setDataFetching}>
                    {({postToken}) => (
                        <Login
                            login={login}
                            loggedIn={loggedIn}
                            postToken={postToken}
                            history={history}
                        />
                    )}
                </AuthAPI>
            )}
        </AuthenticationConsumer>
    )
}
