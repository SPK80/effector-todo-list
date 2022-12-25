import React, {FC, useEffect} from 'react'
import {useEvent, useStore} from 'effector-react'
import {fetchTodoListFx, initiateTasks} from './model'
import {AddTaskForm} from './AddTaskForm'
import {Task} from './task'

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
                todoList.map((task, index) => <Task key={index} task={task} />)}
        </div>
    )
}
