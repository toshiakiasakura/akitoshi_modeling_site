import React, { useEffect, useState } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import test_img from '../img/test.png'

function GNEMyopathyPage(){
  return(
    <div className="container">
      <h1> GNE myopathy - Estimating "disease age" from QMT.</h1>
      
      <img src={test_img} style={{border: "1px #000000 solid"}} alt="Fitting results"/> <br />
      Test.
    </div>
  )
}

function GNEPages(){
  return(
    <Switch>
      <Route path='/gne-myopathy' component={ GNEMyopathyPage } />
    </Switch>
  )
}

export { GNEPages }
