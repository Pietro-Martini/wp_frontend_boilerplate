import React from 'react'

import apiReq from '../helpers/apiReq'

const apiCommunicator = (entity, multiple) => {
  return class APICommunicator extends React.Component {
    state = {
      data: multiple ? [] : {}
    }

    componentDidMount = () => {
      this.getEntityData()
    }

    getEntityData = () => {
      const {slug} = this.props

      apiReq({
        endpoint: `${entity}${multiple ? '' : `?slug=${slug}`}`,
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

export const PostAPI = apiCommunicator('posts', false)
export const PageAPI = apiCommunicator('pages', false)

// Multiple Entities

export const PagesAPI = apiCommunicator('pages', true)
export const PostsAPI = apiCommunicator('pages', true)
