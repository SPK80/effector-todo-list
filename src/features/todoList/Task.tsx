import React from 'react'
import {TaskStatuses, TaskType} from './api'
import {updateTaskStatusFx} from './model'
import {Checkbox} from 'antd'
import {CheckboxChangeEvent} from 'antd/es/checkbox'

type PropsType = {
    task: TaskType
}

export const Task: React.FC<PropsType> = ({task}) => {
    const handleStatusChange = (e: CheckboxChangeEvent) => {
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
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={handleStatusChange}
            >
                {task.title}
            </Checkbox>
        </div>
    )
}
