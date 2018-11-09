import React from 'react'

const AuthenticationContext = React.createContext()

export const AuthenticationConsumer = AuthenticationContext.Consumer

const {Provider} = AuthenticationContext

export class AuthenticationProvider extends React.Component {
    login = ({token}) => {
        // random value for now
        const expirationTime = 24000000
        const tokenRecord = JSON.stringify({
            token, timestamp: new Date().getTime() + expirationTime
        })
        localStorage.setItem('token', tokenRecord)
    }

    logout = () => {
        if (this.isAuthenticated) {
            localStorage.removeItem('token')
        }
    }

    getJWTToken = () => {
        const record = JSON.parse(localStorage.getItem('token'))
        return (
            record &&
            record.timestamp > new Date().getTime() &&
            record.token
        )
    }

    isAuthenticated = this.getJWTToken

    render () {
        const {login, logout, isAuthenticated, getJWTToken} = this

        return (
            <Provider value={{login, logout, isAuthenticated}}>
                {this.props.children}
            </Provider>
        )
    }
}
