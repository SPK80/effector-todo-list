import React, {FC} from 'react'
import {TodoListType} from './api'
import {Card} from 'antd'
import {AddTaskForm, TasksList} from '../tasks'

export const TodoList: FC<{data: TodoListType}> = ({data}) => {
    return (
        <Card title={data.title} size="small">
            <AddTaskForm todoListId={data.id} />
            <TasksList todoListId={data.id} />
        </Card>
    )
}
