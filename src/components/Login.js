import React from 'react'

import {LoginForm} from '../renderProps/Form'
import Field from '../components/Field'
import {AuthAPI} from '../renderProps/API'
import {AuthenticationConsumer} from '../providers/AuthenticationProvider'

import validationFns from '../validationFns/loginFormValidations'

const Login = ({createToken}) => <LoginForm onSubmit={createToken}/>

export default ({history, setDataFetching}) => {
    return (
        <AuthenticationConsumer>
            {({login}) => (
                <AuthAPI setDataFetching={setDataFetching}>
                    {({postToken}) => {

                        const createToken = ({username, password}) => {
                            postToken({
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                                },
                                body: `password=${password}&username=${username}`,
                                successCb: ({token, user_email}) => {
                                    login(token, user_email)
                                    history.push('/')
                                }
                            })
                        }

                        return <Login createToken={createToken}/>
                    }}
                </AuthAPI>
            )}
        </AuthenticationConsumer>
    )
}
