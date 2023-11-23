import { useRef, useEffect, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DataContext } from "../Context"
import CustomInput from "../CustomInput/CustomInput"
import { GSAPI } from "../GS-API"
import { CONSTS, setPageLoading } from "../Global"
import imgLogo from "../../assets/logo/logo.png"

import "./LoginPage.css"
import "./LoginPage-phone.css"

export default function LoginPage() {
    const Navigate = useNavigate()
    const Context = useContext(DataContext)

    useEffect(() => {
        document.title = "Вход | Ежиное-РП"
    }, [])

    const [formState, setformState] = useState({
        errorText: "", // Текст ошибки
        showErrorText: false, // Спрятать ли ошибку
        loginInputError: false, // Отображать ли ошибку инпута логина
        passwordInputError: false, // Отображать ли ошибку инпута пароля
        disableSubmitButton: false // Отключить ли кнопку входа
    })

    const loginInput = useRef()
    const passwordInput = useRef()

    

    // При обновлении любого из инпутов
    const handleInputUpdate = () => {
        setformState({
            showErrorText: false,
            loginInputError: false,
            passwordInputError: false
        })
        loginInput.current.value = loginInput.current.value.replaceAll(" ", "_")
        passwordInput.current.value = passwordInput.current.value.replaceAll(" ", "_")
    }

    // Ивент субмит у формы входа
    function loginForm(event) {
        // Отключение базового перехода
        event.preventDefault()

        setformState({
            showErrorText: false,
            loginInputError: false,
            passwordInputError: false
        })

        let formLogin = loginInput.current.value
        let formPassword = passwordInput.current.value

        // Проверка длины логина
        if (formLogin.length < CONSTS.loginMin || formLogin.length > CONSTS.loginMax) {
            setformState({
                errorText: formLogin.length < CONSTS.loginMin
                    ? `Логин меньше ${CONSTS.loginMin} символов`
                    : `Логин больше ${CONSTS.loginMax} символов`,
                showErrorText: true,
                loginInputError: true
            })
            return
        }

        // Проверка длины пароля
        if (formPassword.length < CONSTS.passwordMin || formPassword.length > CONSTS.passwordMax) {
            setformState({
                errorText: formPassword.length < CONSTS.passwordMin
                    ? `Пароль меньше ${CONSTS.passwordMin} символов`
                    : `Пароль больше ${CONSTS.passwordMax} символов`,
                showErrorText: true,
                passwordInputError: true
            })
            return
        }

        // Проверка наличия запрещенных символов
        let token = null
        try {
            token = btoa(formLogin + " " + formPassword)
        } catch {
            setformState({
                errorText: "Неверный логин или пароль",
                showErrorText: true,
                loginInputError: true,
                passwordInputError: true
            })
            return
        }

        // Отключаем кнопку только в случае если прошло все проверки
        setformState({
            disableSubmitButton: true
        })
        setPageLoading()

        GSAPI("authorize", {token: token}, (data) => {
            setPageLoading(false)

            // Если по токену не нашло
            if (!data.success) {
                setformState({
                    errorText: "Неверный логин или пароль",
                    showErrorText: true,
                    loginInputError: true,
                    passwordInputError: true,
                    disableSubmitButton: false
                })
                return
            }

            // Если успех - сохраняем и открываем главную
            let newUserData = data.data
            newUserData.token = token // Ставим токен
            localStorage.userData = JSON.stringify(newUserData)

            Context.setuserData(newUserData)
            Context.setisAdmin(newUserData.id === "291195777")
            Navigate("/")
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
                            className={formState.loginInputError ? "error" : null}
                            maxLength={CONSTS.loginMax}
                            onInput={handleInputUpdate}
                            required
                        />
                    </CustomInput>

                    <CustomInput label="Пароль" password={true}>
                        <input
                            ref={passwordInput}
                            type="password"
                            id="form-password"
                            className={formState.passwordInputError ? "error" : null}
                            maxLength={CONSTS.passwordMax}
                            onInput={handleInputUpdate}
                            required
                        />
                    </CustomInput>

                    <p className={`text-red ${!formState.showErrorText ? "hidden" : null}`}>{formState.errorText}</p>

                    <button className="green" disabled={formState.disableSubmitButton} type="submit">Войти</button>
                </form>
            </section>

            <div className="section-login__sub-text">
                <p><small className="text-gray">Нету аккаунта?</small></p>
                <Link to={"/registration"} className="text-link small">Зарегистрируйся!</Link>
            </div>
        </article>
    )
}