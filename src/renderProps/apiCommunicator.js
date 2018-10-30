import React from 'react'

import apiReq from '../helpers/apiReq'
import encodeQueryParams from '../helpers/encodeQueryParams'

const apiCommunicator = ({entity, multiple, fn}) => {
  return class APICommunicator extends React.Component {
    state = {
      data: multiple ? [] : {}
    }

    componentDidMount = () => {
      this.getEntityData()
    }

    getEntityData = () => {      
      const queryParams = (fn && fn(this.props.queryColl)) || ''

      apiReq({
        endpoint: `${entity}${queryParams}`,
        successFn: data => {
          this.setState({
            data: multiple ? data : data[0]
          })
        }
      })
    }

    render = () => {
      return this.props.render(this.state.data)
    }
  }
}

// Single Entity

export const PostAPI = apiCommunicator({
  entity: 'posts',
  fn: encodeQueryParams
})

export const PageAPI = apiCommunicator({
  entity: 'pages',
  fn: encodeQueryParams
})

// Multiple Entities

export const PostsAPI = apiCommunicator({
  entity: 'posts',
  multiple: true
})

export const PagesAPI = apiCommunicator({
  entity: 'pages',
  multiple: true
})
