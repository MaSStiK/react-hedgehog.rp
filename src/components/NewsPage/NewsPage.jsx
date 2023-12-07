import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { DataContext } from "../Context"
import Aside from "../Aside/Aside"

import "./NewsPage.css"
import "./NewsPage-phone.css"


export default function NewsPage() {
    const Navigate = useNavigate()
    const Context = useContext(DataContext)

    useEffect(() => {
        document.title = "Новости | Ежиное-РП"
    })

    return (
        <>
            <Aside />

            <article id="article-news">
                <h4 className="page-title text-dark">/ Новости</h4>

                <section className="section-news__row">
                    <h3>Список новостей</h3>
                </section>
            </article>
        </>
    )
}
