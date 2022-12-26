import React, {FC} from 'react'
import {createTodoListFx} from './model'
import {Button, Form, Input} from 'antd'
import {PlusSquareOutlined} from '@ant-design/icons'

export const AddTodoListForm: FC = () => {
    const [form] = Form.useForm()

    const handleSubmit = ({title}: {title: string}) =>
        createTodoListFx({title}).then(() => form.resetFields())

    return (
        <Form
            form={form}
            name="AddTodoListForm"
            style={{display: 'flex'}}
            initialValues={{title: ''}}
            autoComplete="off"
            onFinish={handleSubmit}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{required: true, message: 'Please input title!'}]}
                style={{marginRight: 4}}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button
                    type="text"
                    htmlType="submit"
                    icon={<PlusSquareOutlined style={{fontSize: '22px'}} />}
                ></Button>
            </Form.Item>
        </Form>
    )
}
