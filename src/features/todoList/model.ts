import {createEffect, createStore} from 'effector'
import {api, TaskType} from './api'

const $tasksPacks = createStore<{[todoListId: string]: TaskType[]}>({})

export const initiateTasks = ({todoListId}: {todoListId: string}) => {
    return $tasksPacks.map((packs) => packs[todoListId])
}

export const fetchTodoListFx = createEffect(
    async (id: string) => await api.getTasks(id),
)

$tasksPacks.on(
    fetchTodoListFx.done,
    (packs, {params: todoListId, result: data}) => ({
        ...packs,
        [todoListId]: data.items,
    }),
)

export const createTaskFx = createEffect(
    async ({todolistId, title}: {todolistId: string; title: string}) =>
        await api.createTask(todolistId, title),
)

$tasksPacks.on(createTaskFx.done, (packs, {params, result: data}) => ({
    ...packs,
    [params.todolistId]: [data.item, ...packs[params.todolistId]],
}))

//-watchers---------------------------------------------------------------------

fetchTodoListFx.watch((params) => console.log('fetchTodoListFx.start', params))

fetchTodoListFx.done.watch((params) =>
    console.log('fetchTodoListFx.done', params),
)

fetchTodoListFx.fail.watch((params) =>
    console.log('fetchTodoListFx.fail', params),
)

createTaskFx.watch((params) => console.log('createTaskFx.start', params))

createTaskFx.doneData.watch((params) =>
    console.log('createTaskFx.done', params),
)

createTaskFx.fail.watch((params) => console.log('createTaskFx.fail', params))
