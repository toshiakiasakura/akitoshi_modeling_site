import React from 'react'
import {
   BrowserRouter as Router, Route, Switch, Redirect 
} from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Top } from './components/top.component'
import { GNEPages } from './components/gne_myopathy.component'
import './styles/_index.sass'

function App() {
  return (
    <Router>
      <Helmet>
        <title> Toshiaki-Srap.net</title>
        <meta name="description" content="Private site managed by toshiaki." />
        <link
            href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
            rel="stylesheet"
        />
      </Helmet>
      <Switch>
        <Route exact path='/' component ={Top} />
        <Route exact path='/gne-myopathy' component ={GNEPages} />
      </Switch>
    </Router>
  )
}

export default App;
