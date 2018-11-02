import React from 'react'

export default class ActiveStateToggling extends React.Component {
    state = {active: false}

    toggleActiveState = () => this.setState(prevProps => {
        return {active: !prevProps.active}
    })

    render = () => (
        this.props.children({
            active: this.state.active,
            toggleActiveState: this.toggleActiveState
        })
    )
}
