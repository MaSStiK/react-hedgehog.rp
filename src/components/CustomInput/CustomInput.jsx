import React, { useState } from 'react'
import "./CustomInput.css"
import EyeOpen from "../../assets/icons/EyeOpen.svg"
import EyeClosed from "../../assets/icons/EyeClosed.svg"
import $ from 'jquery'


export default function CustomInput(props) {
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)

        // Не совсем правильно, но работает
        let child = $("#" + props.children.props.id)
        if (child.attr("type") === "password") {
            child.attr("type", "text")
        } else {
            child.attr("type", "password")
        }
    }

    return (
        <div className={`custom-input-wrapper ${props.password && "password-input"} ${props.className}`}>
            {props.children}
            <label htmlFor={props.children.props.id}>{props.label}</label>

            {/* Для инпута с паролем кнопка показа пароля */}
            {props.password &&
                <button onClick={toggleShowPassword}>
                    {showPassword ? <img src={EyeOpen} alt="show-password" /> : <img src={EyeClosed} alt="hide-password" />}
                </button>
            }
        </div>
    )
}

CustomInput.defaultProps = {
    className: "",
    password: false
}


// return (
//     <fieldset>
//         <legend>{props.title}</legend>
//         <input type="text" size="10" />
//     </fieldset>
// )