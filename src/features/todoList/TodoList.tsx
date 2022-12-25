import React, {FC, useEffect} from 'react'
import {useEvent, useStore} from 'effector-react'
import {fetchTodoListFx, initiateTasks} from './model'
import {Task} from './Task'
import {AddTaskForm} from './AddTaskForm'

export const TodoList: FC<{todoListId: string}> = ({todoListId}) => {
    const todoList = useStore(initiateTasks({todoListId: todoListId}))
    const fetchTodoListEvent = useEvent(fetchTodoListFx)

    useEffect(() => {
        fetchTodoListEvent(todoListId)
    }, [todoListId])

    return (
        <div>
            <AddTaskForm todoListId={todoListId} />

            <br />
            {todoList &&
                todoList.map((task, index) => <Task key={index} task={task} />)}
        </div>
    )
}
