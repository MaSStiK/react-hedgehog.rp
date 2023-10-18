import React, { useEffect } from 'react'
import Aside from "../aside/Aside"

import "./Home.css"

export default function Home() {
    useEffect(() => {
        document.title = "Ежиное-РП | Главная"
    }, [])

    return (
        <>
            <Aside />
            
            <article>
                <section>
                    <h1>Это типа главная страница ок да</h1>
                </section>
            </article>
        </>
    )
}
