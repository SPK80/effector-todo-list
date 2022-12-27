import React, {FC, useEffect} from 'react'
import {useEvent, useStore} from 'effector-react'
import {$todoLists, fetchTodoListsFx} from './model'
import {AddTodoListForm} from './AddTodoListForm'
import {Card, Space} from 'antd'
import {TodoList} from './TodoList'

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
                        <TodoList key={index} data={tl} />
                    ))}
                </Space>
            </Card>
        </Space>
    )
}
