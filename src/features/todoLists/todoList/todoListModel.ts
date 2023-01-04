import {createDomain} from 'effector'
import {taskApi as tasksApi} from 'common/api/taskApi'
import {todoListApi, TodoListType} from 'common/api/todoListApi'
import {createTaskModel, TaskModelType} from './task/taskModel'
import {createSubmitFormModel} from '../submitFormModel'

export type TodoListModelType = ReturnType<typeof createTodoListModel>

export const createTodoListModel = (todolist: TodoListType) => {
    const domain = createDomain(todolist.id)

    const $title = domain.createStore(todolist.title)

    const updateTitleFx = domain.createEffect(
        async (title: string) =>
            await todoListApi.updateTodoListTitle(todolist.id, title),
    )

    $title.on(updateTitleFx.done, (_, {params}) => {
        return params
    })

    const $tasks = domain.createStore<TaskModelType[]>([])

    const fetchTasksFx = domain.createEffect(
        async () => await tasksApi.getTasks(todolist.id),
    )

    const createTaskFx = domain.createEffect(
        async (title: string) => await tasksApi.createTask(todolist.id, title),
    )

    const deleteTaskFx = domain.createEffect(
        async ({taskId}: {taskId: string}) =>
            await tasksApi.removeTask(taskId, todolist.id),
    )

    const createTaskModelWithSubs = (taskData: any) => {
        const taskModel = createTaskModel(taskData)
        $tasks.on(taskModel.deleteFx.done, (state, _) =>
            state.filter((t) => t.id !== taskModel.id),
        )
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

    const addTaskFormModel = createSubmitFormModel('addTaskForm', createTaskFx)

    return {
        id: todolist.id,
        $title,
        updateTitleFx,
        $tasks,
        fetchTasksFx,
        createTaskFx,
        deleteTaskFx,
        addTaskFormModel,
    }
}
