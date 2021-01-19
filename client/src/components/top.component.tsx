import React from 'react'
import {
   Route, Switch, Redirect, Link
} from 'react-router-dom'

export function Top(){
  return(
    <div className="container">
      <h1>Toshiaki's Scrap Net </h1>
      <p>
        Mainly include the contents of mathematical modeling. <br />
      </p>
      <div>
        - &nbsp; 
        <Link to="/gne-myopathy" >
          GNE Myopathy - Estimating "Disease Age"
        </Link>
      </div>
    </div>
  )
}