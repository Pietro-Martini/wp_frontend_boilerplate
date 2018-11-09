import React, { Component } from 'react'
import {apiReqAppResources, apiReqJWTAuthToken} from '../helpers/apiReq'
import compose from '../helpers/compose'

function API ({initialState, fetchArgs, apiReqFn}) {
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

        updateState = (stateKey, newState) => {
            this.setDataFetching(false)
            this.setState({[stateKey]: newState})
        }

        fetchData = ({endpoint, stateKey, method, transformStateFns}) =>
            ({queryParams = '', body, headers, successCb} = {}) => {
                this.setDataFetching(true)
                apiReqFn({
                    endpoint: `${endpoint}${queryParams}`,
                    method,
                    body,
                    headers,
                    successFn: res => {
                        const newState = transformStateFns && compose(...transformStateFns)(res) || res
                        this.setDataFetching(false)
                        this.updateState(stateKey, newState)
                        successCb && successCb(res)
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
],
  apiReqFn: apiReqAppResources
})

export const PostsAPI = API({
  initialState: {
    posts: [],
    post: {}
  },
  fetchArgs: [
    {endpoint: 'posts'},
    {endpoint: 'posts', transformStateFns: [x => x[0]]}
],
  apiReqFn: apiReqAppResources
})

export const CommentsAPI = API({
  initialState: {
    comments: [],
    comment: {}
  },
  fetchArgs: [
    {endpoint: 'comments'},
    {endpoint: 'comments', transformStateFns: [x => x[0]]}
],
  apiReqFn: apiReqAppResources
})

export const AuthAPI = API({
    initialState: {
        token: ''
    },
    fetchArgs: [
        {endpoint: 'token'}
    ],
    apiReqFn: apiReqJWTAuthToken
})
