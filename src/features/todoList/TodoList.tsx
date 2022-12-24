import React, {FC, useEffect} from 'react'
import {useEvent, useStore} from 'effector-react'
import {$todoList, fetchTodoListFx} from './model'
import {TaskStatuses} from './api'

export const TodoList: FC<{id: string}> = ({id}) => {
    const todoList = useStore($todoList)
    const fetchTodoListEvent = useEvent(fetchTodoListFx)
    useEffect(() => {
        fetchTodoListEvent(id)
    }, [id])

    return (
        <div>
            {todoList.map((task, index) => (
                <div key={index}>
                    <span>{task.title}</span>
                    {task.status === TaskStatuses.Completed && (
                        <span> - is done</span>
                    )}
                    <span> {task.addedDate}</span>
                </div>
            ))}
        </div>
    )
}
