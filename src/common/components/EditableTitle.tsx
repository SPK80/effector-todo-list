import React, {FC} from 'react'
import {Typography} from 'antd'
import {EditOutlined, LoadingOutlined} from '@ant-design/icons'

const {Text} = Typography

type PropsType = {
    value: string
    onStartEditing?: () => void
    onEndEditing?: () => void
    onChanged: (value: string) => void
    disabled?: boolean
    loading?: boolean
}

export const EditableTitle: FC<PropsType> = ({
    value,
    onStartEditing,
    onEndEditing,
    onChanged,
    disabled,
    loading,
}) => (
    <span onBlur={onEndEditing}>
        <Text
            disabled={disabled}
            style={{margin: 5}}
            editable={{
                icon: loading ? <LoadingOutlined /> : <EditOutlined />,
                autoSize: true,
                onChange: (v: string) => v !== value && onChanged(v),
                onStart: onStartEditing,
                onEnd: onEndEditing,
                onCancel: onEndEditing,
            }}
        >
            {value}
        </Text>
    </span>
)
