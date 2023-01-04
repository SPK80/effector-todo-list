import {createDomain} from 'effector'
import {todoListApi} from 'common/api/todoListApi'
import {createTodoListModel, TodoListModelType} from './todoList/todoListModel'
import {createSubmitFormModel} from './submitFormModel'

const domain = createDomain('todoLists')
const $todoLists = domain.createStore<TodoListModelType[]>([])

const fetchTodoListsFx = domain.createEffect(
    async () => await todoListApi.getTodoLists(),
)

const createTodoListFx = domain.createEffect(
    async (title: string) => await todoListApi.createTodoList(title),
)

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

const addTodoListFormModel = createSubmitFormModel(
    'addTodoListForm',
    createTodoListFx,
)

export {$todoLists, fetchTodoListsFx, deleteTodoListFx, addTodoListFormModel}
