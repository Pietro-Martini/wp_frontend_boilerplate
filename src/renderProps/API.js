import React, { Component } from 'react'
import apiReq from '../helpers/apiReq'
import compose from '../helpers/compose'

function API ({initialState, fetchArgs}) {
    return class extends React.Component {
        constructor(props) {
            super(props)

            this.actions = this.defineActions(initialState, fetchArgs)

            this.state = initialState
        }

        defineActions = (initialState, fetchArgs) => {
            const httpMethods = ['get', 'post', 'put', 'delete']

            return Object.keys(initialState).map((k, i) => {
                return {
                    ...fetchArgs[i],
                    stateKey: k
                }
            }).reduce((actionsColl, arg, i) => {

                const {stateKey} = arg

                httpMethods.forEach(method => {
                  const resource = `${stateKey[0].toUpperCase()}${stateKey.slice(1)}`
                  const actionName = `${method}${resource}`

                  actionsColl[actionName] = this.fetchData({
                    ...arg,
                    method: method.toUpperCase()
                  })
                })

                return actionsColl
            }, {})
        }

        setDataFetching = shown => this.setState({dataFetching: shown})

        fetchData = ({endpoint, stateKey, method, transformStateFns}) => (queryParams = '') => {
            this.setDataFetching(true)
            apiReq({
                endpoint: `${endpoint}${queryParams}`,
                method,
                successFn: res => {
                    this.setDataFetching(false)
                    const newValue = transformStateFns && compose(...transformStateFns)(res) || res
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

export const PagesAPI = API({
  initialState: {
    pages: [],
    page: {}
  },
  fetchArgs: [
    {endpoint: 'pages'},
    {endpoint: 'pages', transformStateFns: [x => x[0]]}
  ]
})

export const PostsAPI = API({
  initialState: {
    posts: [],
    post: {}
  },
  fetchArgs: [
    {endpoint: 'posts'},
    {endpoint: 'posts', transformStateFns: [x => x[0]]}
  ]
})
