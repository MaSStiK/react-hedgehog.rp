import React, { useEffect } from 'react'
import Aside from "../aside/Aside"

import "./Error404.css"

export default function Home() {
    useEffect(() => {
        document.title = "Ежиное-РП | Главная"
    }, [])

    return (
        <>
            <Aside />
            
            <article>
                <section>
                    <h1>Упс</h1>
                    <h2>Такой страницы нету, или ее еще не сделали</h2>
                </section>
            </article>
        </>
    )
}
