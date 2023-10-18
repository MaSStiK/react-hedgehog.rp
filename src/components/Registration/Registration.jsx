import React, { useRef, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CustomInput from "../CustomInput/CustomInput"
import CustomButton from "../CustomButton/CustomButton"
import "./Registration.css"
import "./Registration-phone.css"
import imgLogo from "../../assets/logo/logo.png"
import imgCopy from "../../assets/icons/Copy.svg"
import { GSAPI } from "../Google-scripts-API"
import { VKAPI } from "../VK-API"
import { CONSTS, setPageLoading } from "../Global"


export default function Dev() {
    useEffect(() => {
        document.title = "Ежиное-РП | Регистрация"
    }, [])

    let Navigate = useNavigate()

    // Уникальный ключ
    function generateVkCode() {
        return Date.now().toString(32)
    }

    const [showPage, setshowPage] = useState(1) // Отображаемая страница
    const [showCopyMessage, setshowCopyMessage] = useState(false) // Спрятать ли сообщение об скопированом коде

    const [showVkFindUserError, setshowVkFindUserError] = useState(false) // Отображать ли ошибку поиска юзера
    const [textVkFindUserError, settextVkFindUserError] = useState("") // Отображать ли ошибку поиска юзера
    const [vkCode, setvkCode] = useState(generateVkCode()) // Создаем ключ для отправки в вк
    const [vkData, setvkData] = useState({}) // Информация о юзере

    const handleCopyButton = () => {
        navigator.clipboard.writeText(vkCode)
        setshowCopyMessage(true)
        setTimeout(() => setshowCopyMessage(false), 5000)
    }


    // Начать поиск сообщений
    const firstPageSubmit = () => {
        setshowPage(2)
        setvkData({})
        setshowVkFindUserError(false)

        // Получаем все диалоги
        VKAPI('messages.getConversations', {}, (data) => {
            data = data.response

            let vkFindedUserId = null

            // Перебираем все последние сообщения в чате
            for (let message of data.items) {
                // Если находит сообщение с ключем, то записывает id юзера и заканчивает цикл
                if (message.last_message.text === vkCode) {
                    vkFindedUserId = message.last_message.from_id
                    break
                }
            }

            // Если не нашел
            if (!vkFindedUserId) {
                settextVkFindUserError("Сообщение не найдено!")
                setshowVkFindUserError(true)
                return
            }
            
            // Находим информацию о пользователе
            VKAPI('users.get', {user_id: vkFindedUserId, fields: "photo_200"}, (data) => {
                data = data.response[0]

                setvkData({
                    id: vkFindedUserId,
                    name: data.first_name + " " + data.last_name,
                    photo: data.photo_200,
                })
            })
        })
    }

    // Возвращение на первую страницу
    const middlePageBack = () => {
        setvkCode(generateVkCode()) // Обновляем код
        setshowPage(1)
    }

    // Переход на последнюю страницу
    const middlePageSubmit = () => {
        setPageLoading()

        // Проверка уникальности найденого юзера
        GSAPI("POSTuserCheck", {id: vkData.id}, (data) => {
            setPageLoading(false)

            // Если найден id, то ошибка
            if (!data.success) {
                setvkData({})
                settextVkFindUserError("Этот пользователь уже зарегистрирован!")
                setshowVkFindUserError(true)
                return
            }

            // Если такого id нету - переходим на последнюю страницу
            setshowPage(3)
        })

    }

    // Возвращение на вторую страницу
    const lastPageback = () => {
        setshowPage(2)
    }


    const [errorText, seterrorText] = useState("Неверный логин или пароль") // Текст ошибки
    const [showErrortext, setshowErrortext] = useState(false) // Спрятать ли ошибку
    const [loginInputError, setloginInputError] = useState(false) // Отображать ли ошибку инпута логина
    const [passwordInputError, setpasswordInputError] = useState(false) // Отображать ли ошибку инпута пароля
    const [passwordAgainInputError, setpasswordAgainInputError] = useState(false) // Отображать ли ошибку инпута повтора пароля
    const [disableSubmitButton, setdisableSubmitButton] = useState(false) // Отключить ли кнопку

    const loginInput = useRef()
    const passwordInput = useRef()
    const passwordAgainInput = useRef()

    // При обновлении любого из инпутов
    const handleUnputUpdate = () => {
        setloginInputError(false)
        setpasswordInputError(false)
        setpasswordAgainInputError(false)
        setshowErrortext(false)
        loginInput.current.value = loginInput.current.value.replaceAll(" ", "_")
        passwordInput.current.value = passwordInput.current.value.replaceAll(" ", "_")
        passwordAgainInput.current.value = passwordAgainInput.current.value.replaceAll(" ", "_")
    }

    // Ивент субмит у формы регистрации
    function regForm(event) {
        // Отключение базового перехода
        event.preventDefault()
        setloginInputError(false)
        setpasswordInputError(false)
        setpasswordAgainInputError(false)
        setshowErrortext(false)

        let formLogin = loginInput.current.value
        let formPassword = passwordInput.current.value
        let formPasswordAgain = passwordAgainInput.current.value

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

        // Проверка совпадения пароля
        if (formPassword !== formPasswordAgain) {
            setpasswordInputError(true)
            setpasswordAgainInputError(true)
            seterrorText(`Пароли не совпадают`)
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
            setpasswordAgainInputError(true)
            seterrorText("Введены запрещенные символы")
            setshowErrortext(true)
            return
        }


        // Таймштамп
        let dateNow = Date.now()

        // Данные нового пользователя
        const newUserData = {
            id: vkData.id.toString(), // id на сайте, по стандарту id от вк, но в случае чего можно изменить вручную (К примеру для второго аккаунта)
            token: token, // Токен авторизации
            tag: "@" + vkData.id.toString(), // Тег для упрощенного поиска
            vk_id: vkData.id.toString(), // Чаще всего совпадает, но если надо сделать профиль для группы, то можно изменить вручную
            vk_link: "https://vk.com/id" + vkData.id, // Ссылка на профиль, для групп другая
            name: vkData.name, // Отображаемое имя и фамилия
            bio: "", // Описание
            photo: vkData.photo, // Фото профиля
            in_vk: dateNow, // Дата появления в беседе - устанавливается администратором
            timestamp: dateNow, // Дата регистрации
            // favourite: JSON.stringify({
            //     users: [],
            //     countries: []
            // }), 
            favourite: {}, // Избранные
            country: {}
        }

        // Отключаем кнопку только в случае если прошло все проверки
        setdisableSubmitButton(true)
        setPageLoading()

        GSAPI("POSTuser", {data: JSON.stringify(newUserData)}, (data) => {

            // Если токен совпал
            if (!data.success) {
                setloginInputError(true)
                seterrorText("Введенный логин занят")
                setshowErrortext(true)
                setdisableSubmitButton(false)

                setPageLoading(false)
                return
            }

            // Отправляем сообщение в беседу логов
            let VKAPImessage = `Регистрация пользователя:\nname: ${vkData.name}\nid: ${vkData.id}\nlink: ${"https://vk.com/id" + vkData.id}`
            VKAPI('messages.send', {peer_id: 2000000007, random_id: 0, message: VKAPImessage}, () => {

                // Отправляем сообщение пользователю
                let VKAPImessage2 = "Вы успешно зарегистрировались!"
                VKAPI('messages.send', {peer_id: vkData.id, random_id: 0, message: VKAPImessage2}, () => {
                    setPageLoading(false)

                    // Если успех - сохраняем и открываем главную
                    localStorage.userData = JSON.stringify(newUserData)
                    Navigate("/home")
                })
            })
        })
            
    }

    return (
        <article id="article-registration">
            <div className="section-reg__logo">
                <img src={imgLogo} alt="logo" onClick={() => {Navigate("/")}} />
            </div>

            <section id="section-reg">
                <div id="section-reg__first-page" className={showPage !== 1 ? "hidden" : null}>
                    <h2>Регистрация</h2>
                    <h3>1) Прикрепите свой профиль в ВК</h3>
                    <p>Отправте код ниже <Link to="https://vk.com/geografrp" target="_blank" rel="noopener noreferrer" className="text-link">нашему боту "Географ"</Link></p>

                    <button className="tp section-reg__code-button" onClick={handleCopyButton}>
                        <p id="section-reg__code">Код: {vkCode}</p>
                        <img src={imgCopy} alt="copy" />
                    </button>

                    <p className={`text-gray ${!showCopyMessage ? "hidden" : null}`}>Скопировано</p>

                    <p>Нажмите на кнопку "Отправил", после того как отправите сообщение боту</p>

                    <button onClick={firstPageSubmit}>Отправил</button>
                </div>

                <div id="section-reg__middle-page" className={showPage !== 2 ? "hidden" : null}>
                    <h2>Регистрация</h2>
                    <h3>2) Проверка аккаунта</h3>

                    {/* Если найден юзер */}
                    {Object.keys(vkData).length !== 0 &&
                    <>
                        <p>Это вы?</p>
                        <Link to={`https://vk.com/id${vkData.id}`} target="_blank" rel="noopener noreferrer">
                            <CustomButton src={vkData.photo} text={vkData.name} />
                        </Link>
                        <button className="red" onClick={middlePageBack}>Нет</button>
                        <button className="green" onClick={middlePageSubmit}>Да</button>
                    </>
                    }

                    {/* Если ошибка */}
                    {showVkFindUserError &&
                    <>
                        <p className="text-red">{textVkFindUserError}</p>
                        <button onClick={middlePageBack}>Назад</button>
                    </>
                    }
                    
                </div>

                <form onSubmit={regForm} id="section-reg__last-page" className={showPage !== 3 ? "hidden" : null}>
                    <h2>Регистрация</h2>
                    <h3>3) Придумайте логин и пароль</h3>

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

                    <small>Без пробелов<br/>Длина логина от {CONSTS.loginMin} до {CONSTS.loginMax} символов<br/>Только латиница и спецсимволы</small>

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

                    <small>Без пробелов<br/>Длина пароля от {CONSTS.passwordMin} до {CONSTS.passwordMax} символов<br/>Только латиница и спецсимволы</small>

                    <CustomInput label="Повторите пароль" password={true}>
                        <input
                            ref={passwordAgainInput}
                            type="password"
                            id="form-password-again"
                            className={passwordAgainInputError ? "error" : null}
                            maxLength={CONSTS.passwordMax}
                            onInput={handleUnputUpdate}
                            required
                        />
                    </CustomInput>

                    <p className={`text-red ${!showErrortext ? "hidden" : null}`}>{errorText}</p>

                    <button className="green section-reg__button" type="submit" disabled={disableSubmitButton}>Зарегистрироваться</button>
                    <button type="button" onClick={lastPageback}>Назад</button>
                </form>
            </section>

            <div className="section-reg__sub-text">
                <p><small className="text-gray">Уже есть аккаунт?</small></p>
                <Link to="/login" className="text-link small">Войди!</Link>
            </div>
        </article>
    )
}