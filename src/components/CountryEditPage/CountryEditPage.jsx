import { useEffect, useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from "../Context"
import CustomInput from "../CustomInput/CustomInput"
import Aside from "../Aside/Aside"
import { CONSTS, setPageLoading } from "../Global"


import "./CountryEditPage.css"

export default function CountryEditPage() {
    const Context = useContext(DataContext)

    const [countryBioLenght, setcountryBioLenght] = useState(0);
    const [submitButtonActive, setsubmitButtonActive] = useState(false);

    const countryNameRef = useRef()
    const countryBioRef = useRef()
    const countryPhotoRef = useRef()

    useEffect(() => {
        document.title = "Изменение страны | Ежиное-РП"
    }, [])


    const handleBioUpdate = () => {
        setcountryBioLenght(countryBioRef.current.value.length)
    }

    return (
        <>
            <Aside />
            
            <article id="article-country-edit">
                {/* Добавить изменение надписи на "Создание страны" если страна у юзера пустая */}
                <h4 className="page-title text-dark">/ Изменение страны</h4>

                <section className="section-country-edit">
                    <form>
                        <CustomInput label="Название страны">
                            <input
                                ref={countryNameRef}
                                type="text"
                                id="form-title"
                                maxLength={CONSTS.countryTitleMax}
                                required
                            />
                        </CustomInput>

                        <small>Длина названия от {CONSTS.countryTitleMin} до {CONSTS.countryTitleMax} символов</small>

                        <CustomInput label={`Описание страны (${countryBioLenght} / 5000)`}>
                            <textarea
                                ref={countryBioRef}
                                id="form-bio"
                                maxLength={CONSTS.countryBioMax}
                                onInput={handleBioUpdate}
                                required 
                            ></textarea>
                        </CustomInput>

                        <small>Длина описания до {CONSTS.countryBioMax} символов</small>

                        <CustomInput label="Ссылка на флаг страны">
                            <input
                                ref={countryPhotoRef}
                                type="text"
                                id="form-photo"
                                maxLength={CONSTS.countryPhotoMax}
                                required
                            />
                        </CustomInput>

                        {/* <p className={`text-red ${!formState.showErrorText ? "hidden" : null}`}>{formState.errorText}</p> */}

                        <button type="submit" disabled={!submitButtonActive} className="green">Сохранить</button>
                    </form>
                </section>
            </article>
        </>
    )
}
