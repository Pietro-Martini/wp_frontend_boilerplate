import React from 'react'

const AuthenticationContext = React.createContext()

export const AuthenticationConsumer = AuthenticationContext.Consumer

const {Provider} = AuthenticationContext

export class AuthenticationProvider extends React.Component {
    state = {
        loggedIn: false
    }

    componentDidMount = () => {
        const jwtToken = this.getJWTToken()

        if (jwtToken) {
            this.login(jwtToken)
        }
    }

    login = token => {
        // random value for now
        const expirationTime = 24000000
        const tokenRecord = JSON.stringify({
            token,
            timestamp: new Date().getTime() + expirationTime
        })
        localStorage.setItem('token', tokenRecord)
        this.setState({loggedIn: true})
    }

    logout = e => {
        e.preventDefault()
        localStorage.removeItem('token')
        this.setState({loggedIn: false})
    }

    getJWTToken = () => {
        const record = JSON.parse(localStorage.getItem('token'))
        return (
            record &&
            record.timestamp > new Date().getTime() &&
            record.token
        )
    }

    render () {
        const {login, logout, getJWTToken} = this
        const {loggedIn} = this.state

        return (
            <Provider value={{login, logout, getJWTToken, loggedIn}}>
                {this.props.children}
            </Provider>
        )
    }
}
