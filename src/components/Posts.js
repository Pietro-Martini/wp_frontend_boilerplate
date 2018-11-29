import React from 'react'

import Pagination from '../renderProps/Pagination'

import PaginationComponent from './Pagination'

import Post from './Post'

import encodeQueryParams from '../helpers/encodeQueryParams'

const Posts = ({posts, setDataFetching}) => {
  return (
    <div className='posts'>
      <ul className='posts__list'>
        {posts.map(p => (
          <Post
            key={p.id}
            setDataFetching={setDataFetching}
            {...p}
          />
        ))}
      </ul>
    </div>
  )
}

export default class extends React.Component {
  state = {maxPostPage: 1}

  componentDidMount = () => {
      this.props.getPosts({
        successCb: (data, res) => this.setState({maxPostPage: parseInt(res.headers.get('X-WP-TotalPages'))})        
      })
    }
  
  render = () => {      
    return (
    <Pagination maxPage={this.state.maxPostPage}>
      {pagination => {        
        const paginationUpdateFn = page => {              
          const queryParams = encodeQueryParams({page}, true)
          this.props.getPosts({queryParams})
        }

        return (
          <React.Fragment>
            <Posts {...this.props} />
            <PaginationComponent {...pagination} paginationUpdateFn={paginationUpdateFn} />
          </React.Fragment>
        )
      }}
    </Pagination>
  )
  }
}
