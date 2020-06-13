import React from 'react'
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

function InputModel(props) {
  const { title, visible, onFinish, onFinishFailed, showModal } = props
  return (
    <div>
      <Modal title={title} visible={visible} footer={[]}>
        <Form
          {...layout}
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

export default InputModel
