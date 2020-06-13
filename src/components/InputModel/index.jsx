import React, { useEffect } from 'react'
import { Modal, Button, Form, Input } from 'antd'

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 12,
  },
}

export default function InputModel(props) {
  const [form] = Form.useForm()
  const { title, visible, onFinish, onFinishFailed, showModal, fields } = props
  // 修改时表单回填 添加时表单清空
  useEffect(() => {
    if (title === '添加') {
      form.resetFields()
    } else {
      form.setFieldsValue(fields)
    }
  })
  return (
    <div>
      <Modal
        title={title}
        visible={visible}
        footer={[]}
        onCancel={showModal}
        getContainer={false}
      >
        <Form
          {...layout}
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="姓名" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="年龄" name="age">
            <Input />
          </Form.Item>

          <Form.Item label="地址" name="msg">
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button style={{ marginLeft: '10px' }} onClick={showModal}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
