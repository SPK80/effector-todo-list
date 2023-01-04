import {instance} from 'common/api/instance'
import {
    axiosErrorToString,
    checkResultCodeAndGetData,
    getDataFromAxiosResponse,
    ResponseWithResultCodeType,
} from 'common/api/parseResponse'

export const todoListApi = {
    async getTodoLists() {
        return instance
            .get<Array<TodoListType>>('todo-lists')
            .then((res) => res.data)
            .catch(axiosErrorToString)
    },

    async createTodoList(title: string) {
        return instance
            .post<ResponseWithResultCodeType<{item: TodoListType}>>(
                'todo-lists',
                {title},
            )
            .then(getDataFromAxiosResponse)
            .then(checkResultCodeAndGetData)
            .catch(axiosErrorToString)
    },

    async deleteTodoList(todolistId: string) {
        return instance
            .delete<ResponseWithResultCodeType>(`todo-lists/${todolistId}`)
            .then(getDataFromAxiosResponse)
            .then(checkResultCodeAndGetData)
            .catch(axiosErrorToString)
    },

    async updateTodoListTitle(todolistId: string, title: string) {
        return instance
            .put<ResponseWithResultCodeType>(`todo-lists/${todolistId}`, {
                title,
            })
            .then(getDataFromAxiosResponse)
            .then(checkResultCodeAndGetData)
            .catch(axiosErrorToString)
    },
}

//===Types==============================================================================================================

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
