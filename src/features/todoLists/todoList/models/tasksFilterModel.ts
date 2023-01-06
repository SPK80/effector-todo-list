import {createApi, createDomain} from 'effector'
import {TaskStatuses} from 'common/api/taskApi'
import {TaskModelType} from '../task/taskModel'

export enum TaskFilterType {
    All,
    Completed,
    Uncompleted,
}

export type TasksFilterModelType = ReturnType<typeof createTasksFilterModel>

export const createTasksFilterModel = (name: string) => {
    const domain = createDomain(name)

    const $filter = domain.createStore<TaskFilterType>(TaskFilterType.All)

    const {setFilter} = createApi($filter, {
        setFilter: (_, value: TaskFilterType) => value,
    })

    const apply = (tasks: TaskModelType[]) => {
        switch ($filter.getState()) {
            case TaskFilterType.Completed:
                return tasks.filter(
                    (task) =>
                        task.$status.getState() === TaskStatuses.Completed,
                )
            case TaskFilterType.Uncompleted:
                return tasks.filter(
                    (task) => task.$status.getState() < TaskStatuses.Completed,
                )
            default:
                return tasks
        }
    }

    return {
        $filter,
        setFilter,
        apply,
    }
}
