import React, {FC, useEffect} from 'react'
import {useEvent, useStore} from 'effector-react'
import {Card, Space} from 'antd'
import {
    $todoLists,
    addTodoListFormModel,
    deleteTodoListFx,
    fetchTodoListsFx,
} from './models/todoListsModel'
import {SubmitItemForm} from 'common/components/SubmitItemForm'
import {TodoList} from './todoList/TodoList'
import {Loading} from 'common/components/Loading'

export const TodoLists: FC = () => {
    const todoLists = useStore($todoLists)
    const fetchTodoLists = useEvent(fetchTodoListsFx)
    const isFetching = useStore(fetchTodoListsFx.pending)
    const deleteTodoList = useEvent(deleteTodoListFx)

    useEffect(() => {
        fetchTodoLists()
    }, [fetchTodoLists])

    const handleTodoListDelete = (todolistId: string) =>
        deleteTodoList({todolistId})

    return (
        <Space size="middle" style={{padding: 16}}>
            <Loading active={isFetching} tip="Loading...">
                <Card
                    title={<SubmitItemForm model={addTodoListFormModel} />}
                    size="small"
                >
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
            </Loading>
        </Space>
    )
}
