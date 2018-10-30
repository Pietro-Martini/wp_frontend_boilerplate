import React, { Component } from 'react'

export default class UI extends React.Component {
	state = {
		loaderShown: false
	}

	changePropState = propName => newState => {
		this.setState(prevState => {
			return {
				...this.state,
				[propName]: newState || !prevState[propName]
			}
		})
	}

	render = () => {
		const stateKeys = Object.keys(this.state)

		return this.props.render({
			...this.state,
			...stateKeys.reduce((coll, k) => {
				coll[`${k}Fn`] = this.changePropState(k)
				return coll
			}, {})
		})
	}
}
