import { useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { DataContext } from "../Context"
import Aside from "../Aside/Aside"

import "./ToolsPage.css"

export default function ToolsPage() {
    const Navigate = useNavigate()
    const Context = useContext(DataContext)

    useEffect(() => {
        document.title = "Инструменты | Ежиное-РП"
    })

    const handleExitProfile = () => {
        delete localStorage.userData
        delete Context.userData
        Navigate("/")
        window.location.reload()
    }


    return (
        <>
            <Aside />

            <article id="article-tools">
                <h4 className="page-title text-dark">/ Инструменты</h4>

                <section className="section-tools__column">
                    <h2>Запасной выход из профиля</h2>
                    <button className="red" onClick={handleExitProfile}>Выход из профиля</button>
                </section>
            </article>
        </>
    )
}
