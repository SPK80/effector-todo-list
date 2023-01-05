import React, {FC, useEffect} from 'react'
import {TasksModelType} from './models/tasksModel'
import {useEvent, useStore} from 'effector-react'
import {Task} from './task/Task'

export const Tasks: FC<{model: TasksModelType}> = ({model}) => {
    const tasks = useStore(model.$tasks)
    const fetchTasks = useEvent(model.fetchTasksFx)

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    return (
        <>
            {tasks.map((task, index) => (
                <Task key={index} model={task} />
            ))}
        </>
    )
}
