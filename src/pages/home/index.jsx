import React, { useEffect, useState } from 'react'
import { Table, Space, Button, message, Form, Input, Modal } from 'antd'
import { connect } from 'react-redux'
import { getList, delList, addList, updateList } from '@/actions/home'

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
function Home(props) {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('添加')
  const [fields, setFields] = useState([])
  const { getList, data, addList, updateList } = props
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'msg',
      key: 'msg',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => updateFn(record)}>编辑</Button>
          <Button onClick={() => delFn(record)}>删除</Button>
        </Space>
      ),
    },
  ]
  // 删除
  function delFn(record) {
    let obj = { id: record.id }
    props.delList(obj).then((res) => {
      message.info(res.payload.info)
      if (res.payload.status === '200') {
        getList()
      }
    })
  }
  // 修改
  function updateFn(record) {
    setVisible(true)
    setTitle('修改')
    setFields(record)
  }
  // 获取数据列表
  useEffect(() => {
    getList()
  }, [])
  // 添加
  const showModal = () => {
    setVisible(!visible)
    setTitle('添加')
  }
  // 确定表单
  const onFinish = (values) => {
    if (title === '添加') {
      addList(values).then((res) => {
        message.info(res.payload.info)
        if (res.payload.status === '200') {
          getList()
        }
        setVisible(false)
      })
    } else {
      let obj = { ...values, id: fields.id }
      updateList(obj).then((res) => {
        message.info(res.payload.message)
        if (res.payload.status === '200') {
          getList()
        }
        setVisible(false)
      })
    }
  }
  const onFinishFailed = (errorInfo) => {
    setVisible(false)
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        添加
      </Button>
      <Modal title={title} visible={visible} footer={[]} onCancel={showModal}>
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={fields}
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
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default connect(
  (state) => {
    return {
      data: state.home.data,
    }
  },
  {
    getList,
    delList,
    addList,
    updateList,
  }
)(Home)
