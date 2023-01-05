import {TasksModelType} from './tasksModel'
import {TasksFilterModelType} from './tasksFilterModel'
import {createDomain, sample} from 'effector'
import {TaskModelType} from '../task/taskModel'

export const createFilteredTasksModel = (
    todolistId: string,
    tasksModel: TasksModelType,
    filterModel: TasksFilterModelType,
): TasksModelType => {
    const domain = createDomain('FilteredTasksModel ' + todolistId)
    const $filteredTasks = domain.createStore<TaskModelType[]>([])

    sample({
        clock: [
            filterModel.setFilter,
            tasksModel.$tasks,
            tasksModel.statusUpdated,
        ],
        source: tasksModel.$tasks,
        target: $filteredTasks,
        fn: (source) => filterModel.apply(source),
    })
    return {...tasksModel, $tasks: $filteredTasks}
}
