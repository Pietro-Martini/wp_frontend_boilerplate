import React from 'react'

import Form from '../renderProps/Form'

import encodeQueryParams from '../helpers/encodeQueryParams'

import fields from '../formFields/commentFormFields'
import validationFns from '../validationFns/createCommentFormValidations'

import Field from './Field'

export default ({postComment, getComments, postId, getJWTToken, postError}) => {
    return (
        <Form fields={fields} validationFns={validationFns} onSubmit={
            body => postComment({
              headers: {
                Authorization: `Bearer ${getJWTToken()}`,
                'Content-Type': 'application/json;UTF-8'
              },
              body: JSON.stringify({
                ...body,
                post: postId
              }),
              successCb: () => getComments(encodeQueryParams({post: postId}))
            })
        } error={postError}>
            {formState => (
                fields.map(f => {
                    const fieldName = f.name
                    return (
                        <Field {...f}
                            value={formState[fieldName].value}
                            errors={formState[fieldName].errors}
                        />
                    )
                })
            )}
        </Form>
    )
}
