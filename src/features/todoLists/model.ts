import {createEffect, createStore} from 'effector'
import {api, TodoListType} from './api'

export const $todoLists = createStore<TodoListType[]>([])
export const fetchTodoListsFx = createEffect(
    async () => await api.getTodoLists(),
)

export const createTodoListFx = createEffect(
    async ({title}:{title:string}) => await api.createTodoList(title)
)

$todoLists.on(fetchTodoListsFx.doneData, (_, data) => [...data])
    .on(createTodoListFx.doneData, (todoLists, data)=>[data.item, ...todoLists])

//-watchers---------------------------------------------------------------------

fetchTodoListsFx.doneData.watch((data) =>
    console.log('fetchTodoListsFx.doneData', data),
)
