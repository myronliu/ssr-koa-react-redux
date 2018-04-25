import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Menu, Breadcrumb } from 'antd';

class App extends Component {
  render () {
    const currentMenu = this.props.location.pathname.replace('/','') || 'home';
    return (
      <div>
        <div className="ant-layout-top">
          <div className="ant-layout-header">
            <div className="ant-layout-wrapper">
              <div className="ant-layout-logo"><img src="/imgs/avatar100.jpg" width="50" /></div>
              <Menu theme="dark" mode="horizontal" style={{lineHeight: '64px'}} selectedKeys={[currentMenu]}>
                <Menu.Item key="home"><Link to="/" >Home</Link></Menu.Item>
                <Menu.Item key="news"><Link to="/news" >News</Link></Menu.Item>
              </Menu>
            </div>
          </div>
          <div className="ant-layout-wrapper">
            <div className="ant-layout-container">
              <div style={{ minHeight: 600 }}>
                {this.props.children }
              </div>
            </div>
          </div>
          <div className="ant-layout-footer">
            版权所有 © 2018 myronliu
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  // console.log(state)
  return state.home;
})(App)
