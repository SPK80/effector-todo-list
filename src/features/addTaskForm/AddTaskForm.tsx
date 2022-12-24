import React, {ChangeEvent, FC, FormEvent} from 'react'
import {useStore} from 'effector-react'
import {$input, changeTaskTitle, submitForm} from './model'

export const AddTaskForm: FC<{todolistId: string}> = ({todolistId}) => {
    const title = useStore($input)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        submitForm({title, todolistId})
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskTitle(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={title} />
            <button type="submit">Add</button>
        </form>
    )
}
