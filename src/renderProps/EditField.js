import React from 'react'
import includes from '../helpers/includes'

export default class EditComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.setEditFieldInitialState(this.props.children)
    }

    toggleEditMode = mode => className => {
        this.setState({
            ...this.state,
            [className]: {
                ...this.state[className],
                editing: mode
            }
        })
    }

    activateEditMode = this.toggleEditMode(true)
    deactivateEditMode = this.toggleEditMode(false)

    setEditFieldInitialState = children => {
        const {fieldsToEditClassNames} = this.props

        return React.Children.toArray(children).reduce((initialState, child) => {
            const {className} = child.props
            if (includes(fieldsToEditClassNames, className)) {
                initialState[className] = {
                    content: child.props.children,
                    editing: false
                }
            }
            return initialState
        }, {})
    }

    render = () => {
        const {fieldsToEditClassNames, children} = this.props

        return React.Children.map(children, child => {
            const {className} = child.props
            const isEditable = includes(fieldsToEditClassNames, className)

            if (isEditable) {
                const {editing, content} = this.state[className]

                if (editing) {
                    return (
                        <React.Fragment>
                            {React.createElement('input', {type: 'text', value: content})}
                            <button onClick={this.deactivateEditMode.bind(this, className)}>Finish Editing</button>
                        </React.Fragment>
                    )
                } else {
                    return (
                        <React.Fragment>
                            {child}
                            <button onClick={this.activateEditMode.bind(this, className)}>Edit</button>
                        </React.Fragment>
                    )
                }
            }

            return child
        })
    }
}
