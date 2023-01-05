import React, {useState} from 'react'
import {TaskStatuses} from 'common/api/taskApi'
import {Checkbox} from 'antd'
import {CheckboxChangeEvent} from 'antd/es/checkbox'
import {EditableTitle} from 'common/components/EditableTitle'
import {DeleteButton} from 'common/components/DeleteButton'
import {TaskModelType} from './taskModel'
import {useEvent, useStore} from 'effector-react'

export const Task: React.FC<{model: TaskModelType}> = ({model}) => {
    const [isTitleEditing, setIsTitleEditing] = useState(false)
    const title = useStore(model.$title)
    const status = useStore(model.$status)
    const updateTitle = useEvent(model.updateTitleFx)
    const deleteTask = useEvent(model.deleteFx)
    const updateStatus = useEvent(model.updateStatusFx)

    const handleStatusChange = (e: CheckboxChangeEvent) =>
        updateStatus(
            e.target.checked ? TaskStatuses.Completed : TaskStatuses.New,
        )

    return (
        <div>
            {!isTitleEditing && (
                <Checkbox
                    checked={status === TaskStatuses.Completed}
                    onChange={handleStatusChange}
                />
            )}
            <EditableTitle
                value={title}
                onStartEditing={() => setIsTitleEditing(true)}
                onEndEditing={() => setIsTitleEditing(false)}
                onChanged={updateTitle}
            />
            {!isTitleEditing && <DeleteButton onClick={deleteTask} />}
        </div>
    )
}
