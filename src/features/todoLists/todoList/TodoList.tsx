import React, {FC, useEffect} from 'react'
import {Card, Space} from 'antd'
import {useEvent, useStore} from 'effector-react'
import {TodoListModelType} from './todoListModel'
import {DeleteButton} from 'common/components/DeleteButton'
import {EditableTitle} from 'common/components/EditableTitle'
import {AddItemForm} from 'common/components/AddItemForm'
import {Task} from './task/Task'
import {TasksFilter} from './TasksFilter'

export const TodoList: FC<{
    model: TodoListModelType
    onDelete: (id: string) => void
}> = ({model, onDelete}) => {
    const tasks = useStore(model.$filteredTasks)
    const title = useStore(model.$title)
    const fetchTasks = useEvent(model.fetchTasksFx)
    const updateTitle = useEvent(model.updateTitleFx)

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    const handleDeleteClick = () => onDelete(model.id)

    return (
        <Card
            size="small"
            title={
                <Space align="center" style={{marginLeft: 8}}>
                    <EditableTitle value={title} onChanged={updateTitle} />
                    <DeleteButton onClick={handleDeleteClick} />
                </Space>
            }
        >
            <AddItemForm model={model.addTaskFormModel} />
            <TasksFilter model={model.filterModel} />
            {tasks &&
                tasks.map((task, index) => <Task key={index} model={task} />)}
        </Card>
    )
}
