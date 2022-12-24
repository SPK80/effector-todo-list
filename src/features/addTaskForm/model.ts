import {createEffect, createEvent, createStore, forward} from 'effector'
import {api} from '../todoList/api'

export const initTodolistIdStore = (id: string) => createStore(id)

export const changeTaskTitle = createEvent<string>()

export const submitForm = createEvent<{todolistId: string; title: string}>()

export const $input = createStore('').reset(submitForm)
forward({from: changeTaskTitle, to: $input})

export const createTaskFx = createEffect(
    async ({todolistId, title}: {todolistId: string; title: string}) =>
        await api.createTask(todolistId, title),
)

forward({from: submitForm, to: createTaskFx})

createTaskFx.watch((params) => console.log('createTaskFx.start', params))
createTaskFx.doneData.watch((params) =>
    console.log('createTaskFx.done', params),
)
createTaskFx.fail.watch((params) => console.log('createTaskFx.fail', params))
