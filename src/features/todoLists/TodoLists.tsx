import React, {FC, useEffect} from 'react'
import {useEvent, useStore} from 'effector-react'
import {Card, Space} from 'antd'
import {$todoLists, deleteTodoListFx, fetchTodoListsFx} from './model'
import {AddTodoListForm} from './AddTodoListForm'
import {TodoList} from './todoList/TodoList'

export const TodoLists: FC = () => {
    const todoLists = useStore($todoLists)
    const fetchTodoLists = useEvent(fetchTodoListsFx)
    const deleteTodoList = useEvent(deleteTodoListFx)

    useEffect(() => {
        fetchTodoLists()
    }, [fetchTodoLists])

    const handleTodoListDelete = (todolistId: string) =>
        deleteTodoList({todolistId})

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
                        <TodoList
                            key={index}
                            model={tl}
                            onDelete={handleTodoListDelete}
                        />
                    ))}
                </Space>
            </Card>
        </Space>
    )
}
