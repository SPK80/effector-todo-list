import React, {FC, useEffect} from 'react'
import {useEvent, useStore} from 'effector-react'
import {$todoLists, fetchTodoListsFx} from './model'
import {TodoList} from 'features/todoList'

export const TodoLists: FC = () => {
    const todoLists = useStore($todoLists)
    const fetchTodoListsEvent = useEvent(fetchTodoListsFx)

    useEffect(() => {
        fetchTodoListsEvent()
    }, [])

    return (
        <div>
            {todoLists.map((tl, index) => (
                <div key={index}>
                    <span>{tl.title}</span>
                    <TodoList id={tl.id} />
                    <br />
                </div>
            ))}
        </div>
    )
}
