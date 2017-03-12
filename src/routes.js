import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './containers/App'
import FirstPage from './containers/FirstPage'
import SecondPage from './containers/SecondPage'
import NoMatch from './components/NoMatch'

let isBrowser = null
try {
  if (window) isBrowser = true
} catch (e) {}

const basePath = isBrowser ? '/dev' : '/'
const Routes = props => {
  return (
    <Router history={browserHistory}>
      <Route path={basePath} component={App}>
        <IndexRoute component={FirstPage}/>
        <Route path="second" component={SecondPage}/>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  )
}

export default Routes


