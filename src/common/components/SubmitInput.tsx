import React, {ChangeEvent, FC} from 'react'
import {Button, Input} from 'antd'
import {PlusSquareOutlined} from '@ant-design/icons'

export const SubmitInput: FC<{
    value: string
    onSubmit: () => void
    onChange: (value: string) => void
    onValidate?: (value: string) => boolean
}> = ({value, onChange, onSubmit, onValidate}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)

    const valid = onValidate ? onValidate(value) : value.trim()

    return (
        <Input.Group compact>
            <Input allowClear style={{width: 200}} onChange={handleChange} />
            <Button
                disabled={!valid}
                icon={<PlusSquareOutlined />}
                onClick={onSubmit}
            />
        </Input.Group>
    )
}
