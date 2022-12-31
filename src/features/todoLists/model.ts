import {createEffect, createStore} from 'effector'
import {api, TodoListType} from './api'

export const $todoLists = createStore<TodoListType[]>([])
export const fetchTodoListsFx = createEffect(
    async () => await api.getTodoLists(),
)

export const createTodoListFx = createEffect(
    async ({title}: {title: string}) => await api.createTodoList(title),
)

export const updateTodoListTitleFx = createEffect(
    async ({todolistId, title}: {todolistId: string; title: string}) =>
        await api.updateTodoListTitle(todolistId, title),
)

export const deleteTodoListFx = createEffect(
    async ({todolistId}: {todolistId: string}) =>
        await api.deleteTodoList(todolistId),
)

$todoLists
    .on(fetchTodoListsFx.doneData, (_, data) => [...data])
    .on(createTodoListFx.doneData, (todoLists, {item}) => [item, ...todoLists])
    .on(updateTodoListTitleFx.done, (todoLists, {params}) =>
        todoLists.map((tl) =>
            tl.id === params.todolistId ? {...tl, title: params.title} : tl,
        ),
    )
    .on(deleteTodoListFx.done, (todoLists, {params}) =>
        todoLists.filter((t) => t.id !== params.todolistId),
    )

//-watchers---------------------------------------------------------------------

fetchTodoListsFx.doneData.watch((data) =>
    console.log('fetchTodoListsFx.doneData', data),
)
