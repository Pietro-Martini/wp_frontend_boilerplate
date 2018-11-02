import React, { Component } from 'react'
import apiReq from '../helpers/apiReq'
import encodeQueryParams from '../helpers/encodeQueryParams'
import compose from '../helpers/compose'

const DatastoreContext = React.createContext('datastoreContext')

const {Provider} = DatastoreContext

export const DatastoreConsumer = DatastoreContext.Consumer

export default class DataStoreProvider extends Component {
    state = {
        posts: [],
        pages: [],
        page: {},
        post: {},
        dataFetching: false
    }

    componentDidMount = () => {
        this.getPages()
        this.getPage(encodeQueryParams({slug: 'home'}))
    }

    setDataFetching = shown => this.setState({dataFetching: shown})

    fetchData = (...fns) => (endpoint, stateKey) => (queryParams = '') => {
        this.setDataFetching(true)
        apiReq({
            endpoint: `${endpoint}${queryParams}`,
            successFn: res => {
                this.setDataFetching(false)
                const newValue = fns.length && compose(...fns)(res) || res
                this.setState({[stateKey]: newValue})
            }
        })
    }

    fetchSingleton = this.fetchData(res => res[0])
    fetchMultiple = this.fetchData()

    getPost = this.fetchSingleton('posts', 'post')
    getPage = this.fetchSingleton('pages', 'page')

    getPosts = this.fetchMultiple('posts', 'posts')
    getPages = this.fetchMultiple('pages', 'pages')

    render = () => {
        const {getPage} = this
        const actions = {getPage}

        const mergedProps = {...this.state, ...actions}

        console.log(this.state)

        return (
            <Provider value={mergedProps}>
                {this.props.children(mergedProps)}
            </Provider>
        )
    }
}
