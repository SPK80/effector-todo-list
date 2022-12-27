import React, {FC, useEffect} from 'react'
import {useEvent, useStore} from 'effector-react'
import {fetchTodoListFx, initiateTasks} from './model'
import {Task} from './Task'

export const TasksList: FC<{todoListId: string}> = ({todoListId}) => {
    const tasks = useStore(initiateTasks({todoListId: todoListId}))
    const fetchTodoListEvent = useEvent(fetchTodoListFx)

    useEffect(() => {
        fetchTodoListEvent(todoListId)
    }, [todoListId])

    return (
        <>
            {tasks &&
                tasks.map((task, index) => <Task key={index} task={task} />)}
        </>
    )
}
