import React from 'react'
import { BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Top } from './components/top.component'
import { GNEPages } from './components/gne_myopathy.component'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component ={Top} />
        <Route exact path='/gne_myopathy' component ={GNEPages} />
      </Switch>
    </Router>
  )
}

export default App;
