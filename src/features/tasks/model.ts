import {createEffect, createStore} from 'effector'
import {api, TaskStatuses, TaskType} from './api'

const $tasksPacks = createStore<{[todoListId: string]: TaskType[]}>({})

export const initiateTasks = ({todoListId}: {todoListId: string}) => {
    return $tasksPacks.map((packs) => packs[todoListId])
}

export const fetchTodoListFx = createEffect(
    async (id: string) => await api.getTasks(id),
)

const findTask = (taskId: string, todoListId: string) =>
    $tasksPacks.getState()[todoListId].find((t) => t.id === taskId)

export const updateTaskTitleFx = createEffect(
    async ({
        taskId,
        todoListId,
        title,
    }: {
        taskId: string
        todoListId: string
        title: string
    }) => {
        const task = findTask(taskId, todoListId)
        if (!task) throw new Error('Task not found!')
        return await api.updateTask(taskId, todoListId, {...task, title})
    },
)

export const updateTaskStatusFx = createEffect(
    async ({
        taskId,
        todoListId,
        status,
    }: {
        taskId: string
        todoListId: string
        status: TaskStatuses
    }) => {
        const task = findTask(taskId, todoListId)
        if (!task) throw new Error('Task not found!')
        return await api.updateTask(taskId, todoListId, {...task, status})
    },
)

export const createTaskFx = createEffect(
    async ({todoListId, title}: {todoListId: string; title: string}) =>
        await api.createTask(todoListId, title),
)

export const deleteTaskFx = createEffect(
    async ({taskId, todoListId}: {taskId: string; todoListId: string}) =>
        await api.removeTask(taskId, todoListId),
)

$tasksPacks
    .on(fetchTodoListFx.done, (packs, {params: todoListId, result: data}) => ({
        ...packs,
        [todoListId]: data.items,
    }))

    .on(createTaskFx.done, (packs, {params, result: {item}}) => ({
        ...packs,
        [params.todoListId]: [item, ...packs[params.todoListId]],
    }))
    .on(updateTaskStatusFx.doneData, (packs, {item}) => ({
        ...packs,
        [item.todoListId]: packs[item.todoListId].map((task) =>
            task.id === item.id ? item : task,
        ),
    }))
    .on(updateTaskTitleFx.done, (packs, {params, result}) => ({
        ...packs,
        [params.todoListId]: packs[params.todoListId].map((t) =>
            t.id === params.taskId ? result.item : t,
        ),
    }))
    .on(deleteTaskFx.done, (packs, {params}) => ({
        ...packs,
        [params.todoListId]: packs[params.todoListId].filter(
            (t) => t.id !== params.taskId,
        ),
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
