import { useEffect, useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { DataContext } from "../Context"
import CustomInput from "../CustomInput/CustomInput"
import CustomButton from "../CustomButton/CustomButton"
import Aside from "../Aside/Aside"

import "./CountryPage.css"

export default function CountryPage() {
    const Context = useContext(DataContext)
    const searchRef = useRef()


    useEffect(() => {
        document.title = "Страна | Ежиное-РП"
    }, [])


    return (
        <>
            <Aside />
            
            <article id="article-country">
                <h4 className="page-title text-dark">/ Страна</h4>

                <section className="section-country">
                    <Link to={"/countries/edit"}>
                        <button className="green">Изменить страну</button>
                    </Link>
                </section>
            </article>
        </>
    )
}
