import React, {FC} from 'react'
import {Button, ButtonProps} from 'antd'
import {DeleteOutlined} from '@ant-design/icons'

export const DeleteButton: FC<ButtonProps> = (props) => {
    return (
        <Button
            size={'small'}
            type={'link'}
            title={'Delete'}
            style={{marginBottom: 2}}
            icon={<DeleteOutlined />}
            {...props}
        />
    )
}
