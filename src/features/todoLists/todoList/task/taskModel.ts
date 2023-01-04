import {createDomain} from 'effector'
import {taskApi, TaskStatuses, TaskType} from 'common/api/taskApi'

export type TaskModelType = ReturnType<typeof createTaskModel>

export const createTaskModel = (task: TaskType) => {
    const domain = createDomain(task.id)

    const updateTitleFx = domain.createEffect(
        async (title: string) =>
            await taskApi.updateTask(task.id, task.todoListId, {
                ...task,
                title,
            }),
    )

    const $title = domain.createStore(task.title)
    $title.on(updateTitleFx.doneData, (_, {item}) => item.title)

    const deleteFx = domain.createEffect(
        async () => await taskApi.removeTask(task.id, task.todoListId),
    )

    const updateStatusFx = domain.createEffect(
        async (status: TaskStatuses) =>
            await taskApi.updateTask(task.id, task.todoListId, {
                ...task,
                status,
            }),
    )

    const $status = domain.createStore(task.status)
    $status.on(updateStatusFx.doneData, (_, {item}) => item.status)

    // const task$ = domain.createStore(task)
    // task$
    //     .on(updateTitleFx.doneData, (state, {item}) => item)
    //     .on(updateStatusFx.doneData, (state, {item}) => item)

    return {
        id: task.id,
        $title,
        $status,
        updateTitleFx,
        updateStatusFx,
        deleteFx,
    }
}
