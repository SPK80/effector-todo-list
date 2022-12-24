import {createApi, createEffect, createStore} from 'effector'
import {api, TaskType} from './api'
import {createTaskFx} from '../addTaskForm/model'

export const $todoList = createStore<TaskType[]>([])
export const {addTask, removeTask} = createApi($todoList, {
    addTask: (tasks, task: TaskType) => [task, ...tasks],
    removeTask: (tasks, id: string) => tasks.filter((t) => t.id === id),
})

export const fetchTodoListFx = createEffect(
    async (id: string) => await api.getTasks(id),
)

$todoList.on(fetchTodoListFx.doneData, (_, data) => [...data.items])

$todoList.on(createTaskFx.doneData, (tasks, data) => [data.item, ...tasks]) //todo: maybe should fetchTodoListFx (all tasks)

fetchTodoListFx.watch((params) => console.log('fetchTodoListFx.start', params))

fetchTodoListFx.doneData.watch((params) =>
    console.log('fetchTodoListFx.done', params),
)

fetchTodoListFx.fail.watch((params) =>
    console.log('fetchTodoListFx.fail', params),
)
