import {Typography} from 'antd'
import React, {FC} from 'react'
import {updateTaskTitleFx} from './model'

const {Text} = Typography

type PropsType = {
    taskId: string
    todoListId: string
    value: string
    onStartEditing: () => void
    onEndEditing: () => void
}

export const EditableTaskTitle: FC<PropsType> = ({
    taskId,
    todoListId,
    value,
    onStartEditing,
    onEndEditing,
}) => (
    <span onBlur={onEndEditing}>
        <Text
            style={{margin: 5}}
            editable={{
                autoSize: true,
                onChange: (title) =>
                    updateTaskTitleFx({title, taskId, todoListId}),
                onStart: onStartEditing,
                onEnd: onEndEditing,
                onCancel: onEndEditing,
            }}
        >
            {value}
        </Text>
    </span>
)
