import React from 'react'
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router'

import App from './pages/App'
import News from './pages/News'
import Home from './pages/Home'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="news" component={News} />
      <Redirect from="test_re" to="/news" />
    </Route>
  </Router>
)