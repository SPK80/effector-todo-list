import React, {ChangeEvent, FC, FormEvent, useState} from 'react'
import {createTodoListFx} from './model'

export const AddTodoListForm: FC = () => {
    const [title, setTitle] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTodoListFx({title}).then(() => setTitle(''))
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
