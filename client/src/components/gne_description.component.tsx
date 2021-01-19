import React, { useEffect, useState } from 'react'
import test_img from '../img/test.png'
import Latex from 'react-latex-next'

export function GNEDescription(){
  let model_equation = '$ L = \\prod_{k} P(Y_{i,k})$, <br /> where <br />'+
    '$Y_{i,k} \\sim N(\\mu_{i,k}, (\\sigma_k \\mu_{i,k})^2 + \\delta^2 ) )$, <br />' + 
    '$\\mu_{i, k} = logit^{-1}(\\theta_k + \\beta_k(\\alpha_i))$.' 

  return(
    <React.Fragment>
      <h2> Description of this model </h2>
      <p>
        !! Caution!!  : This modling is unofficial one. Be careful to use the result. <br /> <br />
        This modeling comes from &nbsp;
        <a href="https://doi.org/10.1002/sim.8050">
          Bayesian model of disease progression in GNE myopathy  
        </a>.  <br />
        As the authors estimated the decay function of each muscle, 
        use this function is true course of decay function, 
        and estimate "disease age" from one cross-sectional data.<br />
        "Disease age" is estimated with the maximum likelihood estimation method,
        with the model, 
        
        <p className="text-center">
          <Latex>
            {model_equation}
          </Latex>
        </p>
        Estimation is done by "L-BFGS-B" method implemented in scipy's minimize method. <br /><br />

        <h3> Figure Explanation </h3>
        The following picture is a sample result of this fitting. 
        Each curve represents a decay function of each muscle.
        This curve is irrelevalent to chrolonogical age, so that estimation is needed.
        Each point represents a each percentage point aligned with nearest point of  disease age. 
        The black vertical line is an estimated disease age, 
        which is displayed in the right-top of the figure.
      </p>
      
      
      <div className="text-center">
        <img 
          src={test_img} 
          style={{border: "1px #000000 solid"}} 
          alt="Fitting results"
        /> <br />
      </div>
      <p>
        <br />
      </p>
    </React.Fragment>

  )
}