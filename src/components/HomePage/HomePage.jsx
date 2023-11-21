import { useEffect, useContext } from 'react'
import { Link } from "react-router-dom"
import { DataContext } from "../Context"
import Aside from "../aside/Aside"

import "./HomePage.css"

export default function HomePage() {
    const Context = useContext(DataContext)

    useEffect(() => {
        document.title = "Главная | Ежиное-РП"
    })


    return (
        <>
            <Aside />

            <article id="article-home">
                <h4 className="page-title text-dark">/Главная</h4>

                <section className="section-home">
                    <Link className="section-home-link__wrapper" to="https://vk.com/hedgehogs_army" target="_blank">
                        <img src="https://sun9-60.userapi.com/impg/oEWyVY7z0mShE_4NiWZjLJRUtlblNoS-p0Ph4Q/6rgXOaV54GI.jpg?size=1080x1021&quality=95&sign=7521bfdf054e784b2b37a022c4ec2fdf&type=album" alt="link-vk" />
                        <h3>Наша группа в ВК</h3>
                    </Link>

                    <Link className="section-home-link__wrapper" to="https://www.youtube.com/@hedgehogs_army" target="_blank">
                        <img src="https://yt3.googleusercontent.com/ytc/APkrFKbaiqa1gHCWFYDqjit1-jvSEpAZwt4eQv_5aDq8=s176-c-k-c0x00ffffff-no-rj" alt="link-vk" />
                        <h3>Мы в Youtube</h3>
                    </Link>
                </section>
            </article>
        </>
    )
}
