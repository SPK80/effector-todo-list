import React, {FC} from 'react'
import {Button} from 'antd'
import {DeleteOutlined} from '@ant-design/icons'

export const DeleteButton: FC<{onClick: () => void}> = ({onClick}) => {
    return (
        <Button
            size={'small'}
            type={'link'}
            title={'Delete'}
            style={{marginBottom: 2}}
            icon={<DeleteOutlined />}
            onClick={onClick}
        />
    )
}
