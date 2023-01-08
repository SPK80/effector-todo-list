import React, {FC, useEffect} from 'react'
import {TasksModelType} from './models/tasksModel'
import {useEvent, useStore} from 'effector-react'
import {Task} from './task/Task'
import {Loading} from 'common/components/Loading'

export const Tasks: FC<{
    model: TasksModelType
}> = ({model}) => {
    const tasks = useStore(model.$items)
    const fetchTasks = useEvent(model.fetchItemsFx)
    const isFetching = useStore(model.fetchItemsFx.pending)

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    return (
        <Loading active={isFetching}>
            {tasks.map((task, index) => (
                <Task key={index} model={task} />
            ))}
        </Loading>
    )
}
