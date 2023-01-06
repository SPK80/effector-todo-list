import {createDomain, forward} from 'effector'
import {createTaskModel, TaskModelType} from '../task/taskModel'
import {taskApi as tasksApi} from 'common/api/taskApi'

export type TasksModelType = ReturnType<typeof createTasksModel>

export const createTasksModel = (todolistId: string) => {
    const domain = createDomain('TasksModel ' + todolistId)
    const $tasks = domain.createStore<TaskModelType[]>([])

    const fetchTasksFx = domain.createEffect(
        async () => await tasksApi.getTasks(todolistId),
    )

    const createTaskFx = domain.createEffect(
        async (title: string) => await tasksApi.createTask(todolistId, title),
    )

    const deleteTaskFx = domain.createEffect(
        async ({taskId}: {taskId: string}) =>
            await tasksApi.removeTask(taskId, todolistId),
    )

    const statusUpdated = domain.createEvent('statusUpdated')

    const createTaskModelWithSubs = (taskData: any) => {
        const taskModel = createTaskModel(taskData)

        $tasks.on(taskModel.deleteFx.done, (state, _) =>
            state.filter((t) => t.id !== taskModel.id),
        )

        forward({
            from: taskModel.updateStatusFx.doneData,
            to: statusUpdated,
        })

        return taskModel
    }

    $tasks
        .on(fetchTasksFx.doneData, (tasks, {items}) =>
            items.map(createTaskModelWithSubs),
        )
        .on(createTaskFx.doneData, (tasks, {item}) => [
            createTaskModelWithSubs(item),
            ...tasks,
        ])
        .on(deleteTaskFx.done, (tasks, {params}) =>
            tasks.filter((t) => t.id !== params.taskId),
        )

    return {
        $tasks,
        fetchTasksFx,
        createTaskFx,
        deleteTaskFx,
        statusUpdated,
    }
}
