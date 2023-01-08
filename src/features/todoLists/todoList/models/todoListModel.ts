import {createDomain} from 'effector'
import {todoListApi, TodoListType} from 'common/api/todoListApi'
import {createSubmitFormModel} from 'common/models/submitFormModel'
import {createTasksFilterModel} from './tasksFilterModel'
import {createFilteredTasksModel} from './filteredTasksModel'
import {createTasksModel} from './tasksModel'

export type TodoListModelType = ReturnType<typeof createTodoListModel>

export const createTodoListModel = (todolist: TodoListType) => {
    const domain = createDomain(todolist.id)

    const updateTitleFx = domain.createEffect(
        async (title: string) =>
            await todoListApi.updateTodoListTitle(todolist.id, title),
    )

    const $title = domain
        .createStore(todolist.title)
        .on(updateTitleFx.done, (_, {params}) => params)

    const tasksModel = createTasksModel(todolist.id)

    const addTaskFormModel = createSubmitFormModel(
        'addTaskForm',
        tasksModel.createItemFx,
    )

    const filterModel = createTasksFilterModel('TasksFilter ' + todolist.id)

    const filteredTasksModel = createFilteredTasksModel(
        todolist.id,
        tasksModel,
        filterModel,
    )

    return {
        id: todolist.id,
        $title,
        updateTitleFx,
        tasksModel: filteredTasksModel,
        addTaskFormModel,
        filterModel,
    }
}
