import React from 'react'

const AuthenticationContext = React.createContext()

export const AuthenticationConsumer = AuthenticationContext.Consumer

const {Provider} = AuthenticationContext

const initialState = () => ({
    loggedIn: false,
    userEmail: ''
})

export class AuthenticationProvider extends React.Component {
    state = initialState()

    componentDidMount = () => {
        const {token, userEmail} = this.getJWTCredentials()

        if (token) {
            this.login(token, userEmail)
        }
    }

    login = (token, userEmail) => {
        // random value for now
        const expirationTime = 24000000
        const record = JSON.stringify({
            token,
            userEmail,
            timestamp: new Date().getTime() + expirationTime
        })
        localStorage.setItem('jwtCreds', record)
        this.setState({loggedIn: true, userEmail})
    }

    logout = e => {
        e.preventDefault()
        localStorage.removeItem('jwtCreds')
        this.setState(initialState())
    }

    getJWTCredentials = () => {
        const {token, timestamp, userEmail} = JSON.parse(localStorage.getItem('jwtCreds')) || {}
        return (
            timestamp > new Date().getTime() &&
            {token, userEmail}
        )
    }

    render () {
        const {login, logout, getJWTCredentials} = this
        const {loggedIn} = this.state

        return (
            <Provider value={{login, logout, getJWTCredentials, loggedIn}}>
                {this.props.children}
            </Provider>
        )
    }
}
