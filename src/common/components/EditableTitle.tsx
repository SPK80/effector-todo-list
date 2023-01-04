import React, {FC} from 'react'
import {Typography} from 'antd'

const {Text} = Typography

type PropsType = {
    value: string
    onStartEditing?: () => void
    onEndEditing?: () => void
    onChanged: (value: string) => void
}

export const EditableTitle: FC<PropsType> = ({
    value,
    onStartEditing,
    onEndEditing,
    onChanged,
}) => (
    <span onBlur={onEndEditing}>
        <Text
            style={{margin: 5}}
            editable={{
                autoSize: true,
                onChange: onChanged,
                onStart: onStartEditing,
                onEnd: onEndEditing,
                onCancel: onEndEditing,
            }}
        >
            {value}
        </Text>
    </span>
)
