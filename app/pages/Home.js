import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchHomeServerState } from '../actions/home'

@connect(
  state => state.home
)

class Home extends Component{
  constructor(){
    super()
  }

  static ServerRender = false;

  static fetch (state, dispatch) {
    const fetchTasks = [];
    fetchTasks.push(
      dispatch(fetchHomeServerState(state))
    )
    return fetchTasks
  }

  // 前端在组件挂载后，要判断一下这个页面的状态数据，有没有初始化，如果没有，应该加载一次
  // 避免在前端路由跳转后，新的页面没有数据而报错
  componentDidMount () {
    const { loaded } = this.props
    if ( !loaded ) {
      this.constructor.fetch(this.props, this.props.dispatch)
    }
  }

  test(){
    alert('clicked!')
  }

  render(){
    const {id="", username="", mobile="", email="", county="" } = this.props.userData || {};
    return (
      <div>
        <h3>首页</h3>
        <div>ID：{id}</div>
        <div>名称：{username}</div>
        <div>手机：{mobile}</div>
        <div>邮箱：{email}</div>
        <div onClick={this.test}>居住地：{county}</div>
      </div>
    )
  }
}

export default Home