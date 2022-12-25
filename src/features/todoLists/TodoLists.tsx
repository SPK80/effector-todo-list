import React, {FC, useEffect} from 'react'
import {useEvent, useStore} from 'effector-react'
import {$todoLists, fetchTodoListsFx} from './model'
import {TodoList} from 'features/todoList'
import {AddTodoListForm} from './AddTodoListForm'

export const TodoLists: FC = () => {
    const todoLists = useStore($todoLists)
    const fetchTodoListsEvent = useEvent(fetchTodoListsFx)

    useEffect(() => {
        fetchTodoListsEvent()
    }, [])

    return (
        <div>
            <AddTodoListForm />
            {todoLists.map((tl, index) => (
                <div key={index}>
                    <span>{tl.title}</span>
                    <TodoList todoListId={tl.id} />
                    <br />
                </div>
            ))}
        </div>
    )
}
