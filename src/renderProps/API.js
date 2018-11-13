import React, { Component } from 'react'
import {apiReqAppResources, apiReqJWTAuthToken, apiReqCustomRoutes} from '../helpers/apiReq'
import compose from '../helpers/compose'
import capitalize from '../helpers/capitalize'

const HTTP_METHODS = ['get', 'post', 'put', 'delete']

function API ({initialState, reqArgs, apiReqFn}) {
    return class extends React.Component {
        constructor(props) {
            super(props)

            const stateKeys = Object.keys(initialState)

            this.actions = this.defineActions(stateKeys, reqArgs)

            const errorsState = HTTP_METHODS.reduce((httpErrorMethodColl, m) => {
                httpErrorMethodColl[`${m}Error`] = ''
                return httpErrorMethodColl
            }, {})

            this.state = {...initialState, ...errorsState}
        }

        defineActions = (stateKeys, reqArgs) => {
            return stateKeys.reduce((actionsColl, stateKey, i) => {
                const argsForRequest = {...reqArgs[i], stateKey}
                HTTP_METHODS.forEach(method => {
                  const actionName = `${method}${capitalize(stateKey)}`
                  actionsColl[actionName] = this.fetchData({
                    ...argsForRequest,
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
            ({queryParams = '', body, headers, successCb, errorCb} = {}) => {
                this.setDataFetching(true)
                apiReqFn({
                    endpoint: `${endpoint}${queryParams}`,
                    method,
                    body,
                    headers,
                    fn: res => {
                        if (res.data && res.data.status === 401) {
                            const httpErrorMsg = `${method.toLowerCase()}Error`

                            this.setState({[httpErrorMsg]: res.message}, () => {
                                errorCb && errorCb(res.message)
                            })
                        } else {
                            const newState = transformStateFns && compose(...transformStateFns)(res) || res
                            this.setDataFetching(false)
                            this.setState({[stateKey]: newState}, () => {
                                successCb && successCb(res)
                            })
                        }
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
