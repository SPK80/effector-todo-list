import React, {useState} from 'react'
import {TaskStatuses, TaskType} from './api'
import {deleteTaskFx, updateTaskStatusFx} from './model'
import {Checkbox} from 'antd'
import {CheckboxChangeEvent} from 'antd/es/checkbox'
import {EditableTaskTitle} from './EditableTaskTitle'
import {DeleteButton} from 'common/components/DeleteButton'

type PropsType = {
    task: TaskType
}

export const Task: React.FC<PropsType> = ({task}) => {
    const [isTitleEditing, setIsTitleEditing] = useState(false)

    const handleStatusChange = (e: CheckboxChangeEvent) => {
        updateTaskStatusFx({
            status: e.target.checked
                ? TaskStatuses.Completed
                : TaskStatuses.New,
            taskId: task.id,
            todoListId: task.todoListId,
        })
    }

    const handleDeleteClick = () => {
        deleteTaskFx({taskId: task.id, todoListId: task.todoListId})
    }

    return (
        <div>
            {!isTitleEditing && (
                <Checkbox
                    checked={task.status === TaskStatuses.Completed}
                    onChange={handleStatusChange}
                />
            )}
            <EditableTaskTitle
                value={task.title}
                taskId={task.id}
                todoListId={task.todoListId}
                onStartEditing={() => setIsTitleEditing(true)}
                onEndEditing={() => setIsTitleEditing(false)}
            />
            <DeleteButton onClick={handleDeleteClick} />
        </div>
    )
}
