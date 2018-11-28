import React, { Component } from 'react'
import {apiReqAppResources, apiReqJWTAuthToken, apiReqCustomRoutes} from '../helpers/apiReq'
import compose from '../helpers/compose'
import includes from '../helpers/includes'
import capitalize from '../helpers/capitalize'

import Error from '../components/Error'

const HTTP_METHODS = ['get', 'post', 'put', 'delete']

function API ({initialState, reqArgs, apiReqFn}) {
    return class API extends React.Component {
        constructor(props) {
            super(props)            

            this.actions = this.defineActions(Object.keys(initialState), reqArgs)

            this.state = {...initialState, ...this.defineErrorsState()}
        }

        defineErrorsState = () => {
            return HTTP_METHODS.reduce((httpErrorMethodColl, m) => {
                httpErrorMethodColl[`${m}Error`] = ''
                return httpErrorMethodColl
            }, {})
        }

        defineActions = (stateKeys, reqArgs) => (
            compose(
                this.defineHttpActions(stateKeys, reqArgs),
                this.defineStateResetAction(stateKeys)
            )({})
        )

        defineHttpActions = (stateKeys, reqArgs) => actions => {            
            return stateKeys.reduce((actionsColl, stateKey, i) => {
                const argsForRequest = {...reqArgs[i], stateKey}
                const capitalizedStateKey = capitalize(stateKey)

                HTTP_METHODS.forEach(method => {
                  const actionName = `${method}${capitalizedStateKey}`
                  actionsColl[actionName] = this.fetchData({
                    ...argsForRequest,
                    method: method.toUpperCase()
                  })
                })

                return actionsColl
            }, actions)
        }

        defineStateResetAction = stateKeys => actions => {
            return stateKeys.reduce((actions, k) => {
                actions[`${k}ResetState`] = () => {
                    this.setState({...initialState})
                }

                return actions
            }, actions)
        }

        fetchData = ({endpoint, stateKey, method, transformStateFns}) =>
            ({queryParams = '', body, headers, successCb, errorCb} = {}) => {
                this.props.setDataFetching(true)
                apiReqFn({
                    endpoint: `${endpoint}${queryParams}`,
                    method,
                    body,
                    headers,                    
                })
                .then(data => {
                    this.props.setDataFetching(false)
                    const newState = transformStateFns && compose(...transformStateFns)(data) || data
                    this.setState({[stateKey]: newState}, () => {
                        successCb && successCb(data)
                    })
                })
                .catch(res => {
                    const httpErrorMsg = `${method.toLowerCase()}Error`

                    this.setState({[httpErrorMsg]: res.message}, () => {
                        errorCb && errorCb(res.message)
                    })
                })
        }

        displayHTTPErrors = state => {
            const errorKeys = Object.keys(state).filter(sKey => includes(sKey, 'Error'))

            return errorKeys.reduce((errorColl, eKey) => {
                const error = state[eKey]
                return error
                ? errorColl.concat(<Error error={error}/>)
                : errorColl
            }, [])
        }

        render = () => {
            const mergedProps = {...this.state, ...this.actions}                        

            return (
                <React.Fragment>
                    {this.props.children(mergedProps)}
                    {this.displayHTTPErrors(this.state)}
                </React.Fragment>
            )
        }
    }
}

export const PagesAPI = API({
  initialState: {
    pages: []
  },
  reqArgs: [
    {endpoint: 'pages'}
],
  apiReqFn: apiReqAppResources
})

export const PostsAPI = API({
  initialState: {
    posts: []    
  },
  reqArgs: [
    {endpoint: 'posts?_embed'}    
],
  apiReqFn: apiReqAppResources
})

export const CommentsAPI = API({
  initialState: {
    comments: []    
  },
  reqArgs: [
    {endpoint: 'comments'}    
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

export const UsersAPI = API({
    initialState: {
        users: {}
    },
    reqArgs: [
        {
            endpoint: 'users/register'
        }
    ],
    apiReqFn: apiReqAppResources
})

export const SearchAPI = API({
    initialState: {
        searchResults: {
            results: [],
            search_count: 0,
            results_per_page: 0
        }
    },
    reqArgs: [
        {
            endpoint: 'search'
        }
    ],
    apiReqFn: apiReqAppResources
})
