import React, { Component } from 'react'
import apiReq from '../helpers/apiReq'

const DatastoreContext = React.createContext('datastoreContext')

const {Provider} = DatastoreContext

export const DatastoreConsumer = DatastoreContext.Consumer

export default class DataStoreProvider extends Component {
    state = {
        posts: [],
        pages: [],
        page: {},
        post: {}
    }

    componentDidMount = () => {
        this.getPages()
    }

    getData = (element, fn) => (queryParams = '') => {
        apiReq({
            endpoint: `${element}${queryParams}`,
            successFn: res => {
                const newState = fn && fn({[element]: res}) || {[element]: res}
                this.setState(newState)
            }
        })
    }

    getPosts = this.getData('posts')
    getPages = this.getData('pages')
    getPost = this.getData('posts', transformNewStateForSingletons)
    getPage = this.getData('pages', transformNewStateForSingletons)

    render = () => {
        const {posts, pages, page, post} = this.state
        const {getPage} = this

        const state = {posts, pages, page, post}
        const actions = {getPage}

        const mergedProps = {...state, ...actions}

        return (
            <Provider value={mergedProps}>
                {this.props.children(mergedProps)}
            </Provider>
        )
    }
}

const transformNewStateForSingletons = newState => {
    return Object.keys(newState)
    .reduce((transformedState, k) => {
        const singularElement = k.slice(0, -1)
        const [val] = newState[k]

        return {[singularElement] : val}
    }, {})
}
