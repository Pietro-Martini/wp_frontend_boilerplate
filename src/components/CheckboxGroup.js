import React from 'react'

export default class CheckboxGroup extends React.Component {
    state = {
        selected: []
    }

    vals = ['a', 'b', 'c']

    handleChange = e => {
        const {value} = e.target

        const {selected} = this.state

        if (selected.indexOf(value) !== -1) {
            this.setState({selected: selected.concat(value)})
        } else {
            this.setState({selected: selected.filter(s => {
                return s !== value
            })})
        }
    }

    render = () => (
        <React.Fragment>
            {this.vals.map(v => {
                return <input type='checkbox' value={v} checked={this.state.selected.includes(v)} />
            })}
        </React.Fragment>
    )
}
