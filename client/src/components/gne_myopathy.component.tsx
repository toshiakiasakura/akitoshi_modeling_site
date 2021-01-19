import React, { useEffect, useState } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { ModelService } from '../services/modeling.service'
import { Form } from '../helpers/types.helper'
import { FormRow, SubmitButton } from '../helpers/form.helper' 
import test_img from '../img/test.png'

function ValueForm(props:{
  errors:any, register:any, title:string, name: string
}){
  const require_json = {
    required: 'Need input',
    validate: (v:number) => (v > 0 && v < 100) || 'range is from 0 to 100'
  }
  return (
    <FormRow 
      type="number"
      step="1"
      title={props.title}
      name={props.name}
      id={props.name}
      placeholder="percentage"
      errors={props.errors} register={props.register}
      reg_json={require_json}
    />
  )
}

function GNEFormResult () {
  const { register, handleSubmit, errors, formState, control, watch } =
                            useForm<Form['GNE']>({mode:'onBlur'})
  const [state, setState] = useState<{url:string, isLoading: boolean}>
    ({url:'', isLoading:false} )                          
  const sendData = (data:Form['GNE']) => {
    setState((prev:any) => ({
      url:'',
      isLoading:true
    }))
    ModelService.getGNEMyopathy(data)
      .then(url => {
        console.log(url)
        setState({url:url, isLoading:false})
        })
    }

  let input_items = [
    'knee_flexion', 'ankle_dorsiflex', 'knee_extension',
    'grip', 'shoulder_abduction', 'elbow_flexion'
  ]
  let input_labels = [
    'Knee Flexion', 'Ankle Dorsiflex', 'Knee Extension',
    'Grip', 'Shoulder Abduction', 'Elbow Flexion'
  ]
  const showImg = () =>{
    if(state.isLoading){
      return(
        <div> Loading </div>
      )
    } else if(state.url === ''){
      return(
        <div> Estimated Result is shown here.</div>
      )
    } else {
      return(
        <img 
          src={state.url} 
          alt="picture"
          style={{border: "1px #000000 solid"}} 
        />
      )
    }

  }
  return(
    <div>
      <form
        className="form row"
        role="form"
        name="signup"
        onSubmit={handleSubmit(sendData)}
      >
        <div className="panel">
          <div className="panel__body">
            {input_items.map( 
              (v,i) => 
                <ValueForm
                  title={input_labels[i]}
                  name={v}
                  errors={errors}
                  register={register}
                />
              )
            }
          </div>
          <SubmitButton formState={formState} title="Estimate" />
        </div>
      </form>
      <h2> Result </h2>
      {showImg()}
    </div>

  )
}

function Description(){
  return(
    <React.Fragment>
      <h2> Description </h2>
      Here is a description of this modeling.
      <img 
        src={test_img} 
        style={{border: "1px #000000 solid"}} 
        alt="Fitting results"
      /> <br />
      Test.
    </React.Fragment>

  )

}

function GNEMyopathyPage(){
  return(
    <div className="container">
      <h1> GNE myopathy - Estimating "disease age" from QMT.</h1>
      <GNEFormResult />
      <Description /> 
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
