import React, { useEffect, useState } from 'react'
import { Table, Space, Button, message } from 'antd'
import { connect } from 'react-redux'
import { getList, delList } from '@/actions/home'
import InputModel from '@@/InputModel'

function Home(props) {
  const [visable, setVisable] = useState(false)
  const { getList, data } = props
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
    setVisable(true)
  }
  // 获取数据列表
  useEffect(() => {
    getList()
  }, [])

  return (
    <div>
      <InputModel />
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
  }
)(Home)
