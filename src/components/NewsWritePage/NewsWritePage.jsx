import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { DataContext } from "../Context"
import Aside from "../Aside/Aside"
import $ from "jquery";

import "./NewsWritePage.css"
import "./NewsWritePage-phone.css"


export default function NewsWritePage() {
    const Navigate = useNavigate()
    const Context = useContext(DataContext)

    useEffect(() => {
        document.title = "Создание поста | Ежиное-РП"
    })

    return (
        <>
            <Aside />

            <article id="article-news-write">
                <h4 className="page-title text-dark">/ Создание поста</h4>

                <section className="section-news-write__row">
                    <h3>Создание поста</h3>
                </section>
            </article>
        </>
    )
}
