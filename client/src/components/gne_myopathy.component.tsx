import React, { useEffect, useState } from 'react'
import { Route, Switch, Link } from 'react-router-dom'

function GNEPage(){
  return(
  <div>
    Test.
  </div>)
}

function GNEPages(){
  return(
    <Switch>
      <Route path='/gne_myopathy' component={ GNEPage} />
    </Switch>
  )
}

export { GNEPages }
