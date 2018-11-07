import React from 'react'

export default ({name, type, value, errors}) => {
    return (
        <div className='field'>
            <input
                name={name}
                type={type}
                value={value}
            />
            <p>{errors.map(e => <span>{e}</span>)}</p>
        </div>
    )
}
