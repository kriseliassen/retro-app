import React, { useState } from 'react'
import Switch from "react-switch";

const SwitchToggle = ({ showTeam, setShowTeam }) => {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked);
    setShowTeam(!showTeam);
  }

  return (
    <div className="ToggleSwitch__container">
      <label htmlFor="material-switch" />
        <span 
          className=
        {`ToggleSwitch__label ${!checked ? "toggle-active" : ""}`}>
          Team entries
        </span>
        <Switch
          checked={checked}
          onChange={handleChange}
          onColor="#404E5C"
          onHandleColor="#B7C3F3"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
        <span 
          className=
        {`ToggleSwitch__label ${checked ? "toggle-active" : ""}`}>
          My entries
        </span>
    </div>
  )
}

export default SwitchToggle
