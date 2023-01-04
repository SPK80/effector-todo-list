import React, {FC} from 'react'
import {useStore} from 'effector-react'
import {addTodoListFormModel} from './model'
import {SubmitInput} from 'common/components/SubmitInput'

export const AddTodoListForm: FC = () => {
    const title = useStore(addTodoListFormModel.$title)
    const handleSubmit = () => addTodoListFormModel.submit()
    const handleChange = (value: string) => addTodoListFormModel.change(value)

    return (
        <SubmitInput
            value={title}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    )
}
