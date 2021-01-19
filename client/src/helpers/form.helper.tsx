
/**
 * Construct one item of simple input form using react-hook-form.
 * @param props.register just pass react-hook-form method.
 * @param props.errors just pass react-hook-form method.
 * @param props.reg_json this json contents are passed to register.
 */
export function FormRow(
  props:
    {
      // default value for optional arguments. condition will be good choice.
      type?: string,
      step?: string,
      disabled?: boolean,  
      title: string,
      name: string,
      id: string,
      placeholder: string,
      register: any,
      errors: any,
      reg_json: any
    }
){
  return(
    <div className="form__group">
      <div className="col--sm-4">
        <label className="form__label" htmlFor={props.id}>
          {props.title}
        </label>
      </div>
      <div className="col--sm-8 tooltip tooltip--secondary">
        <input
          className={`form__control`}
          type={props.type || "text"}
          step={props.step || undefined}
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
          ref={props.register(props.reg_json)}
          disabled ={props.disabled}
        />
        {props.errors[props.name] && props.errors[props.name].message}
      </div>
    </div>
  )
}

export function SubmitButton(props:{
  formState: any, title:string
}){
  return(
    <div className="panel_foot">
      <div className="form__group">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={!props.formState.isValid}
        > 
          {props.title}
        </button>
      </div>
    </div>
  )

}