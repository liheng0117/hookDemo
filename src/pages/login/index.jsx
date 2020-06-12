import React from 'react'
import { Form, Input, Button } from 'antd'
import { connect } from 'react-redux'
import { getUser } from '@/actions/auth'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
}

function User(props) {
  const { getUser } = props
  // 表单验证正确
  const onFinish = (values) => {
    console.log('Success:', values)
    getUser(values).then((res) => {
      if (res.payload.status === '200') {
        props.history.push('/')
      }
    })
  }
  // 表单验证错误
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="pwd"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default connect(
  (state) => {
    return {}
  },
  {
    getUser,
  }
)(User)
