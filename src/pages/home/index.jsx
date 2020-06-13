import React, { useEffect, useState } from 'react'
import { Table, Space, Button, message } from 'antd'
import { connect } from 'react-redux'
import { getList, delList, addList, updateList } from '@/actions/home'
import InputModel from '@@/InputModel'

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
      <InputModel
        title={title}
        visible={visible}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        showModal={showModal}
      />
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
