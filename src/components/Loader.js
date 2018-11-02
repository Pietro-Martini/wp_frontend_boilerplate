import React from 'react'

import {DatastoreConsumer} from '../providers/DataStoreProvider'
import withConsumer from '../helpers/withConsumer'

const Loader = ({dataFetching}) => (
  dataFetching ? <p>Loading...</p> : null
)

export default withConsumer(DatastoreConsumer)(
  ({dataFetching}) => <Loader dataFetching={dataFetching}/>
)
