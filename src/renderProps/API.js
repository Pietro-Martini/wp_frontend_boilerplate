import React, { Component } from 'react'
import {apiReqAppResources, apiReqJWTAuthToken, apiReqCustomRoutes} from '../helpers/apiReq'
import compose from '../helpers/compose'
import capitalize from '../helpers/capitalize'

function API ({initialState, reqArgs, apiReqFn}) {
    return class extends React.Component {
        constructor(props) {
            super(props)

            this.actions = this.defineActions(initialState, reqArgs)

            this.state = initialState
        }

        defineActions = (initialState, reqArgs) => {
            const httpMethods = ['get', 'post', 'put', 'delete']

            return Object.keys(initialState).map((stateKey, i) => {
                return {
                    ...reqArgs[i],
                    stateKey
                }
            }).reduce((actionsColl, arg, i) => {
                const {stateKey} = arg

                httpMethods.forEach(method => {
                  const actionName = `${method}${capitalize(stateKey)}`

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
  reqArgs: [
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
  reqArgs: [
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
  reqArgs: [
    {endpoint: 'comments'},
    {endpoint: 'comments', transformStateFns: [x => x[0]]}
],
  apiReqFn: apiReqAppResources
})

export const AuthAPI = API({
    initialState: {
        token: ''
    },
    reqArgs: [
        {endpoint: 'token'}
    ],
    apiReqFn: apiReqJWTAuthToken
})

export const MenuAPI = API({
    initialState: {
        menuItems: []
    },
    reqArgs: [
        {endpoint: 'menu-items'}
    ],
    apiReqFn: apiReqAppResources
})
