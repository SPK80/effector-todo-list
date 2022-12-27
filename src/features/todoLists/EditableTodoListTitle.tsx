import {Typography} from 'antd'
import React, {FC} from 'react'
import {updateTodoListTitleFx} from './model'

const {Title} = Typography

export const EditableTodoListTitle: FC<{id: string; value: string}> = ({
    value,
    id,
}) => {
    return (
        <Title
            level={5}
            editable={{
                onChange: (title) =>
                    updateTodoListTitleFx({title, todolistId: id}),
            }}
        >
            {value}
        </Title>
    )
}
