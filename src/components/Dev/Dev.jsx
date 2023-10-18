import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import CustomInput from "../CustomInput/CustomInput"
import { CONSTS } from "../Global"
import Aside from "../aside/Aside"

import "./Dev.css"

export default function Dev() {
    useEffect(() => {
        document.title = "Ежиное-РП | dev"
        console.log(CONSTS);
    }, [])

    const [exampleInputValue, setexampleInputValue] = useState("");
    const [exampleTextareaValue, setexampleTextareaValue] = useState("");
    const [exampleInputError, setexampleInputError] = useState(false);
    const [disableErrorButton, setdisableErrorButton] = useState(false);

    const exampleInput = useRef()
    const exampleTextarea = useRef()

    const handleErrorButton = () => {
        setexampleInputError(true)
        setTimeout(() => setexampleInputError(false), 2000)
        setdisableErrorButton(true)
        setTimeout(() => setdisableErrorButton(false), 2000)
    }

    return (
        <>
            <Aside />
            
            <article className="dev-page">
                <section className="dev-block">
                    <h1>Never gonna give you up</h1>
                    <h2>Never gonna let you down</h2>
                    <h3>Never gonna run around and desert you</h3>
                    <h4>Never gonna make you cry</h4>
                    <p>Never gonna say goodbye</p>
                    <p><small>Never gonna tell a lie and hurt you</small></p>
                    
                </section>

                <section className="dev-block">
                    <button>gray (standart)</button>
                    <button className="green">green (confirm)</button>
                    <button className="red">red (cancel)</button>
                    <button className="tp">tp (transparent)</button>
                    <button disabled>disabled</button>
                    <Link to="#" className="text-link">Текст-ссылка по которой можно куда то попасть</Link>
                </section>
                    
                <section className="dev-block">
                    <CustomInput label="Пример с длинным название инпута">
                        <input ref={exampleInput} type="text" className={exampleInputError ?  "error" : null} required
                        onChange={() => {setexampleInputValue(exampleInput.current.value)}} />
                    </CustomInput>
                    <p>{"Инпут: " + exampleInputValue}</p>
                    <button disabled={disableErrorButton} onClick={handleErrorButton}>Сделать ошибку</button>

                    <CustomInput label="Только читаемый инпут">
                        <input type="text" required readOnly value={"Пример описания"} />
                    </CustomInput>
                </section>

                <section className="dev-block">
                    <CustomInput label="Пример текстареа">
                        <textarea ref={exampleTextarea} required
                        onChange={() => {setexampleTextareaValue(exampleTextarea.current.value)}}></textarea>
                    </CustomInput>
                    <p>{"Текстареа: " + exampleTextareaValue}</p>
                </section>

                <section className="dev-block">
                    <CustomInput label="Инпут с паролем" password={true}>
                        <input type="password" id="password" required/>
                    </CustomInput>

                    <CustomInput label="Инпут с повтором пароля" password={true}>
                        <input type="password" id="password-again" required />
                    </CustomInput>

                    <button onClick={() => {localStorage.clear()}}>Delete userData</button>
                </section>
            </article>
        </>
    )
}