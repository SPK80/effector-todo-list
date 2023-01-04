import React, {FC, useState} from 'react'
import {SubmitInput} from 'common/components/SubmitInput'
import {TodoListModelType} from './todoListModel'

export const AddTaskForm: FC<{model: TodoListModelType}> = ({model}) => {
    const [title, setTitle] = useState('')
    const handleSubmit = () =>
        model.createTaskFx({title}).then(() => setTitle(''))

    return (
        <SubmitInput
            value={title}
            onChange={setTitle}
            onSubmit={handleSubmit}
        />
    )
}
