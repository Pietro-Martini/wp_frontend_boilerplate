import React, { Component } from 'react'
import apiReq from '../helpers/apiReq'
import encodeQueryParams from '../helpers/encodeQueryParams'

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
        this.getPage(encodeQueryParams({slug: 'home'}))
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
        const {getPage} = this
        const actions = {getPage}

        const mergedProps = {...this.state, ...actions}

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
