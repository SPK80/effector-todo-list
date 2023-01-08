import {createDomain} from 'effector'
import {tasksApi, TaskStatuses, TaskType} from 'common/api/taskApi'

export type TaskModelType = ReturnType<typeof createTaskModel>

export const createTaskModel = (task: TaskType) => {
    const domain = createDomain(task.id)

    const updateTitleFx = domain.createEffect(
        async (title: string) =>
            await tasksApi.updateItem(task.todoListId, task.id, {
                ...task,
                title,
            }),
    )

    const $title = domain.createStore(task.title)
    $title.on(updateTitleFx.doneData, (_, {item}) => item.title)

    const deleteFx = domain.createEffect(
        async () => await tasksApi.deleteItem(task.todoListId, task.id),
    )

    const updateStatusFx = domain.createEffect(
        async (status: TaskStatuses) =>
            await tasksApi.updateItem(task.todoListId, task.id, {
                ...task,
                status,
            }),
    )

    const $status = domain.createStore(task.status)
    $status.on(updateStatusFx.doneData, (_, {item}) => item.status)

    return {
        id: task.id,
        $title,
        $status,
        updateTitleFx,
        updateStatusFx,
        deleteFx,
    }
}
