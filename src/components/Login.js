import React from 'react'

import Form from '../renderProps/Form'
import Field from '../components/Field'
import {AuthAPI} from '../renderProps/API'

import validationFns from '../validationFns/loginFormValidations'

import fields from '../formFields/loginFormFields'

const Login = (props) => {
    return (
        <Form fields={fields} validationFns={validationFns} onSubmit={
            ({username, password}) => {
                props.postToken({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    body: `password=${password}&username=${username}`,
                    successCb: res => {
                        
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
        </Form>
    )
}

export default (props) => {
    return (
        <AuthAPI>
            {({token, postToken}) => {
                return (
                    <Login {...props}
                        token={token}
                        postToken={postToken}
                    />
                )
            }}
        </AuthAPI>
    )
}
