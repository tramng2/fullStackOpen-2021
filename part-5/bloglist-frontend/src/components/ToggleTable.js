import React, {useState, useImperativeHandle} from 'react'

const ToggleTable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenInVisible = { display: visible ? "" : "none" };
    
    const toggleVisibility = () => {
        setVisible(!visible)
    }
    useImperativeHandle(ref, () => {
        return {
          toggleVisibility
        }
      })    
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLable}</button>
        </div>
        <div style={showWhenInVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    );
})

export default ToggleTable
