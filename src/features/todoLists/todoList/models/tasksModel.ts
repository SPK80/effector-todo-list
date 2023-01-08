import {createTaskModel, TaskModelType} from '../task/taskModel'
import {tasksApi, TaskType} from 'common/api/taskApi'
import {createCollectionModel} from 'common/models/collectionModel'
import {createDomain, forward} from 'effector'

export type TasksModelType = ReturnType<typeof createTasksModel>

export const createTasksModel = (todolistId: string) => {
    const domain = createDomain('TasksModel ' + todolistId)
    const statusUpdated = domain.createEvent('statusUpdated')

    const tasksModel = createCollectionModel(
        todolistId,
        tasksApi,
        createTaskModelWithSubs,
    )

    function createTaskModelWithSubs(taskData: TaskType): TaskModelType {
        const taskModel = createTaskModel(taskData)

        tasksModel.$items.on(taskModel.deleteFx.doneData, (items) =>
            items.filter((task) => task.id !== taskModel.id),
        )

        forward({
            from: taskModel.updateStatusFx.doneData,
            to: statusUpdated,
        })

        return taskModel
    }

    return {
        ...tasksModel,
        statusUpdated,
    }
}
