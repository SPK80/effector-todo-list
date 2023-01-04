import {createDomain, forward, sample} from 'effector'
import {todoListApi} from 'common/api/todoListApi'
import {createTodoListModel, TodoListModelType} from './todoList/todoListModel'
import {createSubmitFormModel} from './submitFormModel'

const domain = createDomain('todoLists')
const $todoLists = domain.createStore<TodoListModelType[]>([])

const addTodoListFormModel = createSubmitFormModel('addTodoListForm')

const fetchTodoListsFx = domain.createEffect(
    async () => await todoListApi.getTodoLists(),
)

const createTodoListFx = domain.createEffect(
    async (title: string) => await todoListApi.createTodoList(title),
)

sample({
    clock: addTodoListFormModel.submit,
    source: addTodoListFormModel.$title,
    target: createTodoListFx,
})

forward({
    from: createTodoListFx.doneData,
    to: addTodoListFormModel.reset,
})

const deleteTodoListFx = domain.createEffect(
    async ({todolistId}: {todolistId: string}) =>
        await todoListApi.deleteTodoList(todolistId),
)

$todoLists
    .on(fetchTodoListsFx.doneData, (_, data) => data.map(createTodoListModel))
    .on(createTodoListFx.doneData, (todoLists, {item}) => [
        createTodoListModel(item),
        ...todoLists,
    ])
    .on(deleteTodoListFx.done, (todoLists, {params}) =>
        todoLists.filter((t) => t.id !== params.todolistId),
    )

export {$todoLists, fetchTodoListsFx, deleteTodoListFx, addTodoListFormModel}
