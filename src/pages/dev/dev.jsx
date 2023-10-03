import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CustomInput from "../../components/CustomInput/CustomInput"
import { setInputError, setButtonDisabled } from "../../components/Global"

import "./dev.css"

export default function Dev() {
    useEffect(() => {
        document.title = "Ежиное-РП | dev"
    })

    const [exampleInputVal, setExampleInputVal] = useState("");
    const [exampleTextareaVal, setExampleTextareaVal] = useState("");

    const handleErrorButton = () => {
        setInputError("#example-input")
        setButtonDisabled("#set-error")
    }

    return (
        <section id="main-block">
            <h1>Never gonna give you up</h1>
            <h2>Never gonna let you down</h2>
            <h3>Never gonna run around and desert you</h3>
            <h4>Never gonna make you cry</h4>
            <p>Never gonna say goodbye</p>
            <p><small>Never gonna tell a lie and hurt you</small></p>
            <button>gray (standart)</button>
            <button className="green">green (confirm)</button>
            <button className="red">red (cancel)</button>
            <button className="tp">tp (transparent)</button>
            <button disabled>disabled</button>
            <Link to="#" className="link-text">Текст-ссылка по которой можно куда то попасть</Link>

            <CustomInput label="Пример с длинным название инпута">
                <input type="text" id="example-input" required onInput={e => setExampleInputVal(e.target.value)}/>
            </CustomInput>
            <p>{"Инпут: " + exampleInputVal}</p>
            <button id="set-error" onClick={handleErrorButton}>Сделать ошибку</button>

            <CustomInput label="Пример текстареа">
                <textarea required onInput={e => setExampleTextareaVal(e.target.value)}></textarea>
            </CustomInput>
            <p>{"Текстареа: " + exampleTextareaVal}</p>

            <CustomInput label="Только читаемый инпут">
                <input type="text" required readOnly />
            </CustomInput>

            <CustomInput label="Инпут с паролем" password={true}>
                <input type="password" id="password" required />
            </CustomInput>

            <CustomInput label="Инпут с повтором пароля" password={true}>
                <input type="password" id="password-again" required />
            </CustomInput>
        </section>
    )
}