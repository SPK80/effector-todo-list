import React, {FC, useState} from 'react'
import {createTodoListFx} from './model'
import {SubmitInput} from 'common/components/SubmitInput'

export const AddTodoListForm: FC = () => {
    const [title, setTitle] = useState('')
    const handleSubmit = () =>
        createTodoListFx({title}).then(() => setTitle(''))

    return (
        <SubmitInput
            value={title}
            onChange={setTitle}
            onSubmit={handleSubmit}
        />
    )
}
