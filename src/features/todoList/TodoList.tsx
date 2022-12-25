import React, {FC, useEffect} from 'react'
import {useEvent, useStore} from 'effector-react'
import {fetchTodoListFx, initiateTasks} from './model'
import {TaskStatuses} from './api'
import {AddTaskForm} from './AddTaskForm'

export const TodoList: FC<{id: string}> = ({id}) => {
    const todoList = useStore(initiateTasks({todoListId: id}))
    const fetchTodoListEvent = useEvent(fetchTodoListFx)

    useEffect(() => {
        fetchTodoListEvent(id)
    }, [id])

    return (
        <div>
            <AddTaskForm todolistId={id} />

            <br />
            {todoList &&
                todoList.map((task, index) => (
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
