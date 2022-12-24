import React, {FC} from 'react'
import {TodoList} from 'features/todoList'
import {AddTaskForm} from '../features/addTaskForm'

export const App: FC = () => (
    <>
        <h1>Todo List</h1>
        <AddTaskForm todolistId={'b3c35e1c-bc27-45c3-8c58-64ce2c7805a0'} />
        <TodoList id={'b3c35e1c-bc27-45c3-8c58-64ce2c7805a0'} />
    </>
)
