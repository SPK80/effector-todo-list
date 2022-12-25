import React, {FC} from 'react'
import {createTodoListFx} from './model'
import {Button, Form, Input} from 'antd'

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
                style={{marginRight: 8}}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    )
}
