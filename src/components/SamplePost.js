import React from 'react'
import {PageAPI} from '../renderProps/apiCommunicator'

const SamplePost = props => {
  return (
      <PageAPI
          queryColl={props.queryColl}
          uiActions={props.uiActions}
          render={entityData => {
            return <div />
          }} />
  )
}

export default SamplePost
