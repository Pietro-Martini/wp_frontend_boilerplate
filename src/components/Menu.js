import React from 'react'

import {DatastoreConsumer} from '../providers/DataStoreProvider'

import {Link} from 'react-router-dom'

import encodeQueryParams from '../helpers/encodeQueryParams'

const Menu = ({pages, getPage}) => (
  <ul className='menu'>
      {createMenuItems(pages, getPage)}
  </ul>
)

const createMenuItems = (pages, getPage) => pages.map(({title, slug}) => {
  return (
    <li
        className='menu__item'
        onClick={e => getPage(encodeQueryParams({slug}))}
    >
      <Link
        key={slug}
        to={`/${slug}`}
      >
        {title.rendered}
      </Link>
    </li>
  )
})

export default function () {
        return (
            <DatastoreConsumer>
                {({pages, getPage}) => {
                    return <Menu pages={pages} getPage={getPage}/>
                }}
            </DatastoreConsumer>
        )
}
