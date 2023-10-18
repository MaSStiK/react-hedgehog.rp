import React, { useRef, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CustomInput from "../CustomInput/CustomInput"
import "./Login.css"
import "./Login-phone.css"
import imgLogo from "../../assets/logo/logo.png"
import { GSAPI } from "../Google-scripts-API"
import { CONSTS, setPageLoading } from "../Global"

export default function Dev() {
    useEffect(() => {
        document.title = "Ежиное-РП | Вход"
    }, [])

    let Navigate = useNavigate()


    const [errorText, seterrorText] = useState("") // Текст ошибки
    const [showErrortext, setshowErrortext] = useState(false) // Спрятать ли ошибку
    const [loginInputError, setloginInputError] = useState(false) // Отображать ли ошибку инпута логина
    const [passwordInputError, setpasswordInputError] = useState(false) // Отображать ли ошибку инпута пароля
    const [disableSubmitButton, setdisableSubmitButton] = useState(false) // Отключить ли кнопку

    const loginInput = useRef()
    const passwordInput = useRef()

    // При обновлении любого из инпутов
    const handleUnputUpdate = () => {
        setloginInputError(false)
        setpasswordInputError(false)
        setshowErrortext(false)
        loginInput.current.value = loginInput.current.value.replaceAll(" ", "_")
        passwordInput.current.value = passwordInput.current.value.replaceAll(" ", "_")
    }

    // Ивент субмит у формы входа
    function loginForm(event) {
        // Отключение базового перехода
        event.preventDefault()
        setloginInputError(false)
        setpasswordInputError(false)
        setshowErrortext(false)

        let formLogin = loginInput.current.value
        let formPassword = passwordInput.current.value

        // Проверка длины логина
        if (formLogin.length < CONSTS.loginMin || formLogin.length > CONSTS.loginMax) {
            setloginInputError(true)
            seterrorText(formLogin.length < CONSTS.loginMin
                ? `Логин меньше ${CONSTS.loginMin} символов`
                : `Логин больше ${CONSTS.loginMax} символов`
            )
            setshowErrortext(true)
            return
        }

        // Проверка длины пароля
        if (formPassword.length < CONSTS.passwordMin || formPassword.length > CONSTS.passwordMax) {
            setpasswordInputError(true)
            seterrorText(formPassword.length < CONSTS.passwordMin
                ? `Пароль меньше ${CONSTS.passwordMin} символов`
                : `Пароль больше ${CONSTS.passwordMax} символов`
            )
            setshowErrortext(true)
            return
        }

        // Проверка наличия запрещенных символов
        let token = null
        try {
            token = btoa(formLogin + " " + formPassword)
        } catch {
            setloginInputError(true)
            setpasswordInputError(true)
            seterrorText("Неверный логин или пароль")
            setshowErrortext(true)
            return
        }

        // Отключаем кнопку только в случае если прошло все проверки
        setdisableSubmitButton(true)
        setPageLoading()

        GSAPI("GETuser", {token: token}, (data) => {
            setPageLoading(false)

            // Если по токену не нашло
            if (!data.success) {
                setloginInputError(true)
                setpasswordInputError(true)
                seterrorText("Неверный логин или пароль")
                setshowErrortext(true)
                setdisableSubmitButton(false)
                return
            }

            // Если успех - сохраняем и открываем главную
            localStorage.userData = JSON.stringify(data.data)
            Navigate("/home")
        })
    }

    return (
        <article id="article-login">
            <div className="section-login__logo">
                <img src={imgLogo} alt="logo" onClick={() => {Navigate("/")}} />
            </div>

            <section id="section-login">
                <form onSubmit={loginForm}>
                    <h2>Вход в профиль</h2>

                    <CustomInput label="Логин">
                        <input
                            ref={loginInput}
                            type="text"
                            id="form-login"
                            className={loginInputError ? "error" : null}
                            maxLength={CONSTS.loginMax}
                            onInput={handleUnputUpdate}
                            required
                        />
                    </CustomInput>

                    <CustomInput label="Пароль" password={true}>
                        <input
                            ref={passwordInput}
                            type="password"
                            id="form-password"
                            className={passwordInputError ? "error" : null}
                            maxLength={CONSTS.passwordMax}
                            onInput={handleUnputUpdate}
                            required
                        />
                    </CustomInput>

                    <p className={`text-red ${!showErrortext ? "hidden" : null}`}>{errorText}</p>

                    <button className="green" disabled={disableSubmitButton} type="submit">Войти</button>
                </form>
            </section>

            <div className="section-login__sub-text">
                <p><small className="text-gray">Нету аккаунта?</small></p>
                <Link to="/registration" className="text-link small">Зарегистрируйся!</Link>
            </div>
        </article>
    )
}