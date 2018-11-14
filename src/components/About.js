import React from 'react'

import Posts from './Posts'

const About = ({setDataFetching}) => (
    <div className='about'>
        <Posts setDataFetching={setDataFetching}/>
    </div>
)

export default About
