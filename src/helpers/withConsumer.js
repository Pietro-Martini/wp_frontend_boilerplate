import React from 'react'

const withConsumer = Consumer => fn => {
    return props => {
        return (
            <Consumer>
                {fn}
            </Consumer>
        )
    }
}

export default withConsumer
