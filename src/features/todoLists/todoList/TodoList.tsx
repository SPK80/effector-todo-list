import React, {FC, useEffect} from 'react'
import {Card, Space} from 'antd'
import {useEvent, useStore} from 'effector-react'
import {DeleteButton} from 'common/components/DeleteButton'
import {TodoListModelType} from './todoListModel'
import {EditableTitle} from 'common/components/EditableTitle'
import {AddTaskForm} from './AddTaskForm'
import {Task} from './task/Task'

export const TodoList: FC<{
    model: TodoListModelType
    onDelete: (id: string) => void
}> = ({model, onDelete}) => {
    const tasks = useStore(model.$tasks)
    const title = useStore(model.$title)
    const fetchTasks = useEvent(model.fetchTasksFx)

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    const handleDeleteClick = () => onDelete(model.id)
    const handleChangedTitle = (title: string) => model.updateTitleFx({title})

    return (
        <Card
            size="small"
            title={
                <Space align="center">
                    <EditableTitle
                        value={title}
                        onChanged={handleChangedTitle}
                    />
                    <DeleteButton onClick={handleDeleteClick} />
                </Space>
            }
        >
            <AddTaskForm model={model} />

            {tasks &&
                tasks.map((task, index) => <Task key={index} model={task} />)}
        </Card>
    )
}
