import React from 'react'

const UIProvider = React.createContext('ui')

const {Provider} = UIProvider

export const UIConsumer = UIProvider.Consumer

export class UIProvider extends React.Component {
    state = {
        dataFetching: false
    }

    setDataFetching = dataFetching => this.setState({dataFetching})

    render = () => {
        const {setDataFetching} = this

        <Provider value={{...this.state, setDataFetching}}>
            {this.props.children()}
        </Provider>
    }
}
