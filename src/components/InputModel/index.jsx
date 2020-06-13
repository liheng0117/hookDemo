import React, { useState } from 'react'
import { Modal, Button, Form, Input, message } from 'antd'
import { connect } from 'react-redux'
import { addList, getList } from '@/actions/home'

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
  const { addList, getList } = props
  const [visible, setVisible] = useState(false)
  const showModal = () => {
    setVisible(!visible)
  }
  const onFinish = (values) => {
    addList(values).then((res) => {
      message.info(res.payload.info)
      if (res.payload.status === '200') {
        getList()
      }
      setVisible(false)
    })
  }
  const onFinishFailed = (errorInfo) => {
    setVisible(false)
  }
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        添加
      </Button>
      <Modal
        title="Basic Modal"
        visible={visible}
        footer={[]}
        onCancel={showModal}
      >
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

export default connect(
  (state) => {
    return {}
  },
  {
    addList,
    getList,
  }
)(InputModel)
