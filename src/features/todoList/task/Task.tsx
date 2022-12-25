import React, {ChangeEvent} from 'react'
import {TaskStatuses, TaskType} from '../api'
import {updateTaskStatusFx} from '../model'

type PropsType = {
    task: TaskType
}

export const Task: React.FC<PropsType> = ({task}) => {
    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateTaskStatusFx({
            status: e.target.checked
                ? TaskStatuses.Completed
                : TaskStatuses.New,
            taskId: task.id,
            todoListId: task.todoListId,
        })
    }

    return (
        <div>
            <span>{task.title}</span>
            <input
                type="checkbox"
                checked={task.status === TaskStatuses.Completed}
                onChange={handleStatusChange}
            />
        </div>
    )
}
