import React from 'react'

export default ({name, type, value, touched, errors, handleInputUpdate, updateFieldTouched}) => {
    return (
        <div className='field'>
            <input
                name={name}
                type={type}
                value={value}
                onChange={handleInputUpdate}
                onBlur={updateFieldTouched}
            />
            {touched && errors.length ? errors.map(e => <span>{e}</span>) : null}
        </div>
    )
}
