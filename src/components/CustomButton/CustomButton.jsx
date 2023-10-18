import React, {  } from 'react'
import "./CustomButton.css"
import imgBasePhoto from "../../assets/replace/base-photo.png"

export default function CustomButton(props) {
    return (
        <button className="custom-button" onClick={props.onClick} id={props.id}>
            <img src={props.src} alt="avatar" />
            <div className="custom-button__text">
                <p className="text-cut">{props.text}</p>
                {props.subText // Если сабтекст не указан (у страны) - рендерим только основной текст по центру
                    ? <small className="text-cut text-gray">{props.subText}</small>
                    : null
                }
            </div>
        </button>
    )
}

CustomButton.defaultProps = {
    id: "",
    src: imgBasePhoto,
    text: "",
    subText: ""
}