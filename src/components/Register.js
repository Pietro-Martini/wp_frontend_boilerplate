import React from 'react'

import {RegisterForm} from '../renderProps/Form'
import {UsersAPI} from '../renderProps/API'

const Register = ({createUser}) => <RegisterForm onSubmit={createUser}/>

export default ({history, setDataFetching}) => (
    <UsersAPI setDataFetching={setDataFetching}>
        {({postUsers}) => {
            const createUser = ({username, password}) => {
                postUsers({
                    headers: {
                        'Content-Type': 'application/json;UTF-8'
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        email: username
                    }),
                    successCb: () => {
                        console.log('userRegistered')
                    }
                })
            }

            return <Register createUser={createUser}/>
        }}
    </UsersAPI>
)
