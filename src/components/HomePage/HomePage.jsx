import { useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { DataContext } from "../Context"
import Aside from "../Aside/Aside"

import "./HomePage.css"

export default function HomePage() {
    const Navigate = useNavigate()
    const Context = useContext(DataContext)

    useEffect(() => {
        document.title = "Главная | Ежиное-РП"
    })

    return (
        <>
            <Aside />

            <article id="article-home">
                <h4 className="page-title text-dark">/ Главная</h4>

                <section className="section-home__row">
                    <Link className="section-home-link__wrapper" to="https://vk.com/hedgehogs_army" target="_blank">
                        <img src="https://sun9-60.userapi.com/impg/oEWyVY7z0mShE_4NiWZjLJRUtlblNoS-p0Ph4Q/6rgXOaV54GI.jpg?size=1080x1021&quality=95&sign=7521bfdf054e784b2b37a022c4ec2fdf&type=album" alt="link-vk" />
                        <h3>Наша группа в ВК</h3>
                    </Link>

                    <Link className="section-home-link__wrapper" to="https://www.youtube.com/@hedgehogs_army" target="_blank">
                        <img src="https://yt3.googleusercontent.com/ytc/APkrFKbaiqa1gHCWFYDqjit1-jvSEpAZwt4eQv_5aDq8=s176-c-k-c0x00ffffff-no-rj" alt="link-youtube" />
                        <h3>Мы в Youtube</h3>
                    </Link>
                </section>

                <section className="section-home__column">
                <h2>Последние видео на канале</h2>

                <iframe width="526" height="280" src="https://www.youtube.com/embed/niRy4Ygg7_g?si=CY2X1VXnpdn5SiW2" title="YouTube video player" frameBorder="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    {/* <Link className="section-home-link__wrapper" to="https://www.youtube.com/watch?v=niRy4Ygg7_g" target="_blank">
                        <img src="https://sun9-37.userapi.com/impg/MOKIKtw-uHfaNujGokcXnne6Me14b32_midRWg/PE71cB-JuYY.jpg?size=269x151&quality=96&sign=9529152907f9bba73a82161de7d87b8d&type=album" alt="link-youtube" />
                        <h3>Новое видео на канале</h3>
                    </Link> */}
                </section>
            </article>
        </>
    )
}
