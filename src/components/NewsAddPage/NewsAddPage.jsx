import { useEffect, useContext, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { DataContext } from "../Context"
import Aside from "../Aside/Aside"
import CustomInput from "../CustomInput/CustomInput"
import { CONSTS, setPageLoading } from "../Global"
import { GSAPI } from "../GS-API"


import "./NewsAddPage.css"
import "./NewsAddPage-phone.css"


export default function NewsAddPage() {
    const Navigate = useNavigate()
    const Context = useContext(DataContext)

    const [postTextLenght, setpostTextLenght] = useState(0);

    const [errorText, seterrorText] = useState("") // Текст ошибки
    const [titleInputError, settitleInputError] = useState(false) // Отображать ли ошибку инпута Названия страны
    const [textInputError, settextInputError] = useState(false) // Отображать ли ошибку инпута Названия страны
    // const [photoInputError, setphotoInputError] = useState(false) // Отображать ли ошибку инпута Сслыка на фото
    const [disableSubmitButton, setdisableSubmitButton] = useState(true) // Отключить ли кнопку сохранения

    const postTitleInput = useRef()
    const postTextInput = useRef()
    // const countryPhotoInput = useRef()

    useEffect(() => {
        document.title = "Создание новости | Ежиное-РП"
    })


    // При обновлении любого из инпутов
    const handleInputUpdate = () => {
        seterrorText("")
        settitleInputError(false)
        settextInputError(false)
        setdisableSubmitButton(postTitleInput.current.value.length < CONSTS.countryTitleMin) // Если меньше 1 символа в заголовке новости
    }


    // Ивент субмит у формы создания новости
    function submitForm() {
        handleInputUpdate() // Сброс всех ошибок

        let formTitle = postTitleInput.current.value
        let formText = postTextInput.current.value
        // let formPhoto = countryPhotoInput.current.value


        // Проверка длины Заголовка
        if (formTitle.length < CONSTS.postTitleMin || formTitle.length > CONSTS.postTitleMax) {
            seterrorText(formTitle.length < CONSTS.postTitleMin
                ? `Заголовок меньше ${CONSTS.postTitleMin} символов`
                : `Заголовок больше ${CONSTS.postTitleMax} символов`
            )
            settitleInputError(true)
            return
        }


        // Проверка длины Текста
        if (formText.length > CONSTS.postTextMax) {
            seterrorText(`Текст больше ${CONSTS.postTextMax} символов`)
            settextInputError(true)
            return
        }

        // Проверка длины фото
        // if (formPhoto.length > CONSTS.countryPhotoMax) {
        //     seterrorText(`Ссылка на фотографию больше ${CONSTS.countryPhotoMax} символов`)
        //     setphotoInputError(true)
        //     return
        // }


        // Отключаем кнопку только в случае если прошло все проверки
        setdisableSubmitButton(true)
        setPageLoading()

        // Таймштамп
        let dateNow = Date.now()

        // Данные нового пользователя
        const newPostData = {
            country_id: Context.userData.country_id, // id страны
            post_id: Context.userData.country_id + "_" + dateNow, // id новости
            post_title: formTitle, // Заголовок новости
            post_text: formText, // Текст новости
            attachments: "{}", // Прикрепленные картинки
            timestamp: dateNow // Дата создани новости
        }

        GSAPI("POSTnews", {data: JSON.stringify(newPostData), token: Context.userData.token}, (data) => {
            console.log("GSAPI: POSTnews");

            // Если все успешно
            if (data.success) {
                let posts = [...Context.posts]
                posts.push(newPostData)
                Context.setposts(posts)

                // Navigate("/countries/" + Context.userData.country_id)
                Navigate("/news")

                setPageLoading(false)
                return
            }

            seterrorText(`Произошла непредвиденная ошибка!`)
            setdisableSubmitButton(false)
            setPageLoading(false)
        })
    }

    return (
        <>
            <Aside />

            <article id="article-news-write">
                <h4 className="page-title text-dark">/ Создание новости</h4>

                <section className="section-news-write">
                    <CustomInput label="Заголовок новости">
                        <input
                            ref={postTitleInput}
                            type="text"
                            id="form-title"
                            className={titleInputError ? "error" : null}
                            maxLength={CONSTS.postTitleMax}
                            onInput={handleInputUpdate}
                            required
                        />
                    </CustomInput>
                    <small>Длина заголовка от {CONSTS.postTitleMin} до {CONSTS.postTitleMax} символов</small>

                    <CustomInput label={`Текст новости (${postTextLenght} / ${CONSTS.postTextMax})`}>
                        <textarea
                            ref={postTextInput}
                            id="form-text"
                            className={textInputError ? "error" : null}
                            maxLength={CONSTS.postTextMax}
                            onInput={() => {
                                setpostTextLenght(postTextInput.current.value.length) // Обновляем значение длины описания
                                handleInputUpdate() // Так же тригирим апдейт всех полей
                            }}
                            required 
                        ></textarea>
                    </CustomInput>
                    <small>Длина текста до {CONSTS.postTextMax} символов</small>

                    <h4>В следующем обновлении будет возможность добавлять картинки</h4>

                    <p className={`text-red ${!errorText ? "hidden" : null}`}>{errorText}</p>

                    <button onClick={submitForm} disabled={disableSubmitButton} className="green">Создать</button>
                </section>
            </article>
        </>
    )
}
