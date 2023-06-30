import React from 'react'

function Alert(props){
  const Capitalize = (str)=>{
        const newText = str.toLowerCase();
        return newText.charAt(0).toUpperCase() + newText.slice(1);
  }
   return (
    <div style={{height:'50px'}}>
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{Capitalize(props.alert.type)}</strong>: {props.alert.msg}
    </div>}
    </div>
  ) 
}

export default Alert