import {createEffect, createStore} from 'effector'
import {api, TodoListType} from './api'

export const $todoLists = createStore<TodoListType[]>([])
export const fetchTodoListsFx = createEffect(
    async () => await api.getTodoLists(),
)

$todoLists.on(fetchTodoListsFx.doneData, (_, data) => [...data])

//-watchers---------------------------------------------------------------------

fetchTodoListsFx.doneData.watch((data) =>
    console.log('fetchTodoListsFx.doneData', data),
)
