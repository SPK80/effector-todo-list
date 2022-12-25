import React, {FC} from 'react'
import {TodoLists} from 'features/todoLists'

export const App: FC = () => (
    <>
        <h1>Todo List</h1>
        <TodoLists />
    </>
)
