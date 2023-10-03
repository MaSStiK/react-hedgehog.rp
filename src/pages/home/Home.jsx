import React, { useEffect } from 'react'
import "./home.css"

export default function Home() {
    useEffect(() => {
        document.title = "Ежиное-РП | Главная"
    })

    return (
        <section>
            <h1>Это типа главная страница ок да</h1>
        </section>
    )
}
