import React from 'react'
import includes from '../helpers/includes'

export default class EditComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            content: this.props.children.props.children,
            editing: false
        }
    }

    toggleEditMode = mode => fn => {
        this.setState(
            {...this.state, editing: mode },
            () => fn && fn(this.state.content)
        )
    }

    activateEditMode = this.toggleEditMode(true)
    deactivateEditMode = this.toggleEditMode(false)

    handleChange = newContent => this.setState({...this.state, content: newContent})

    render = () => {
        const {editing, content} = this.state
        const child = this.props.children

        if (this.props.fieldNonEditable) {
            return child
        } else {
            return editing
            ? (
                <React.Fragment>
                    {React.createElement('input', {type: 'text', value: content, onChange: e => this.handleChange(e.target.value)})}
                    <button onClick={() => this.deactivateEditMode(this.props.afterEditFn)}>Finish Editing</button>
                    <button onClick={() => this.deactivateEditMode()}>Cancel</button>
                </React.Fragment>
            )
            : (
                <React.Fragment>
                    {child}
                    <button onClick={() => this.activateEditMode()}>Edit</button>
                </React.Fragment>
            )
        }
    }
}
