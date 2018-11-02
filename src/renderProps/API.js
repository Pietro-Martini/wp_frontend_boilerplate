import React, { Component } from 'react'
import apiReq from '../helpers/apiReq'
import compose from '../helpers/compose'

export default function API ({initialState, fetchArgs}) {
    return class extends React.Component {
        constructor(props) {
            super(props)

            this.actions = this.defineActions(initialState, fetchArgs)

            this.state = initialState
        }

        defineActions = (initialState, fetchArgs) => {
            return Object.keys(initialState).map((k, i) => {
                return {
                    ...fetchArgs[i],
                    stateKey: k
                }
            }).reduce((actionsColl, arg) => {
                const {stateKey} = arg
                const actionName = `fetch${stateKey[0].toUpperCase()}${stateKey.slice(1)}`

                actionsColl[actionName] = this.fetchData(arg)
                return actionsColl
            }, {})
        }

        setDataFetching = shown => this.setState({dataFetching: shown})

        fetchData = ({endpoint, stateKey, transformStateFns}) => (queryParams = '') => {
            this.setDataFetching(true)
            apiReq({
                endpoint: `${endpoint}${queryParams}`,
                successFn: res => {
                    this.setDataFetching(false)
                    const newValue = transformStateFns.length && compose(...transformStateFns)(res) || res
                    this.setState({[stateKey]: newValue})
                }
            })
        }

        render = () => {
            const mergedProps = {...this.state, ...this.actions}

            return this.props.children(mergedProps)
        }
    }
}
