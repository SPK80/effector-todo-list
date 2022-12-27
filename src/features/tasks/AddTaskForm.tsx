import React, {FC, useState} from 'react'
import {createTaskFx} from './model'
import {SubmitInput} from 'common/components/SubmitInput'

export const AddTaskForm: FC<{todoListId: string}> = ({todoListId}) => {
    const [title, setTitle] = useState('')

    const handleSubmit = () =>
        createTaskFx({title, todoListId}).then(() => setTitle(''))

    return (
        <SubmitInput
            value={title}
            onChange={setTitle}
            onSubmit={handleSubmit}
        />
    )
}
