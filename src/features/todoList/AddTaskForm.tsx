import React, {ChangeEvent, FC, FormEvent, useState} from 'react'
import {createTaskFx} from './model'

export const AddTaskForm: FC<{todolistId: string}> = ({todolistId}) => {
    const [title, setTitle] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTaskFx({title, todolistId})
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={title} />
            <button type="submit">Add</button>
        </form>
    )
}
