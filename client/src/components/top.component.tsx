import React from 'react'
import {
   Route, Switch, Redirect, Link
} from 'react-router-dom'

export function Top(){
  return(
    <div className="container">
      <h1>Akitoshi's Modeling site</h1>
      <div>
        - &nbsp; 
        <Link to="/gne-myopathy" >
          GNE Myopathy - Estimating "Disease Age"
        </Link>
      </div>
    </div>
  )
}