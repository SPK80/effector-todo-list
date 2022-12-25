import React, {FC, useEffect} from 'react'
import {useEvent, useStore} from 'effector-react'
import {$todoLists, fetchTodoListsFx} from './model'
import {TasksList, AddTaskForm} from 'features/todoList'
import {AddTodoListForm} from './AddTodoListForm'
import {Card, Space} from 'antd'

export const TodoLists: FC = () => {
    const todoLists = useStore($todoLists)
    const fetchTodoListsEvent = useEvent(fetchTodoListsFx)

    useEffect(() => {
        fetchTodoListsEvent()
    }, [])

    return (
        <Space size="middle" style={{padding: 16}}>
            <Card title={<AddTodoListForm />} size="small">
                <Space
                    size="middle"
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                    }}
                >
                    {todoLists.map((tl, index) => (
                        <Card key={index} title={tl.title} size="small">
                            <AddTaskForm todoListId={tl.id} />
                            <TasksList todoListId={tl.id} />
                        </Card>
                    ))}
                </Space>
            </Card>
        </Space>
    )
}
