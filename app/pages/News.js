import React, {Component} from 'react'
import { Button } from 'antd';
import { connect } from 'react-redux'
import { Pagination, Select, Alert} from 'antd'
import { fetchNews } from '../actions/news'

@connect(
  state => state.news,
)

class News extends Component{
  static fetch (state, dispatch) {
    const fetchTasks = []
    fetchTasks.push(
      dispatch(fetchNews(state))
    )
    return fetchTasks
  }

  static ServerRender = true;

  componentDidMount () {
    const { loaded} = this.props
    if ( !loaded ) {
      this.constructor.fetch(this.props, this.props.dispatch)
    }
  }

  getNextPage(){
    this.constructor.fetch(this.props, this.props.dispatch);
  }

  render(){
    const { data={}, loaded } = this.props;

    return (
      <div style={{ background: '#F9F9F9', padding: '30px' }}>
        <Alert message="强制刷新这个页面，数据从服务端渲染加载，点击下面的分页，数据异步加载" type="info" closeText="关闭" />
        <div>
        { JSON.stringify(data) }
        </div>
     </div>
    )
  }
}

export default News
