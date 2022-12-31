import React, {FC} from 'react'
import {TodoListType} from './api'
import {Card, Space} from 'antd'
import {AddTaskForm, TasksList} from '../tasks'
import {EditableTodoListTitle} from './EditableTodoListTitle'
import {deleteTodoListFx} from './model'
import {DeleteButton} from 'common/components/DeleteButton'

export const TodoList: FC<{data: TodoListType}> = ({data}) => {
    const handleDeleteClick = () => deleteTodoListFx({todolistId: data.id})

    return (
        <Card
            size="small"
            title={
                <Space align="center">
                    <EditableTodoListTitle id={data.id} value={data.title} />
                    <DeleteButton onClick={handleDeleteClick} />
                </Space>
            }
        >
            <AddTaskForm todoListId={data.id} />
            <TasksList todoListId={data.id} />
        </Card>
    )
}
