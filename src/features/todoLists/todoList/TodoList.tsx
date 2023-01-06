import React, {FC} from 'react'
import {Card, Space} from 'antd'
import {useEvent, useStore} from 'effector-react'
import {TodoListModelType} from './models/todoListModel'
import {DeleteButton} from 'common/components/DeleteButton'
import {EditableTitle} from 'common/components/EditableTitle'
import {SubmitItemForm} from 'common/components/SubmitItemForm'
import {TasksFilter} from './TasksFilter'
import {Tasks} from './Tasks'

export const TodoList: FC<{
    model: TodoListModelType
    onDelete: (id: string) => void
}> = ({model, onDelete}) => {
    const title = useStore(model.$title)
    const updateTitle = useEvent(model.updateTitleFx)
    const isTitleUpdating = useStore(model.updateTitleFx.pending)

    const handleDeleteClick = () => onDelete(model.id)

    return (
        <Card
            size="small"
            title={
                <Space align="center" style={{marginLeft: 8}}>
                    <EditableTitle
                        value={title}
                        loading={isTitleUpdating}
                        onChanged={updateTitle}
                    />
                    <DeleteButton onClick={handleDeleteClick} />
                </Space>
            }
        >
            <SubmitItemForm model={model.addTaskFormModel} />
            <TasksFilter model={model.filterModel} />
            <Tasks model={model.tasksModel} />
        </Card>
    )
}
