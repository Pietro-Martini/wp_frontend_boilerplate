import React from 'react'

export default class UI extends React.Component {
    state = {dataFetching: false}

    setDataFetching = dataFetching => this.setState({dataFetching})

    render = () => this.props.children({
        dataFetching: this.state.dataFetching,
        setDataFetching: this.setDataFetching
    })
}
