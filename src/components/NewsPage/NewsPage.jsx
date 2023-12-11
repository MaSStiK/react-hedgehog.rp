import { useEffect, useContext, useState } from "react"
import { Link } from "react-router-dom"
import { DataContext } from "../Context"
import CustomButton from "../CustomButton/CustomButton"
import Aside from "../Aside/Aside"


import "./NewsPage.css"
import "./NewsPage-phone.css"


export default function NewsPage() {
    const Context = useContext(DataContext)

    const [postsRender, setpostsRender] = useState([]);

    useEffect(() => {
        document.title = "Новости | Ежиное-РП"
    })

    useEffect(() => {
        // При обновлении контекста так же обновляется и массив
        setpostsRender([...Context.posts].reverse())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Context.posts])

    return (
        <>
            <Aside />

            <article id="article-news">
                <h4 className="page-title text-dark">/ Новости</h4>

                {postsRender.map((post) => {
                    let postAuthor = Context.users.find(user => user.country_id === post.country_id)

                    // Если автора нету - не возвращаем
                    if (postAuthor) {
                        return <section className="section-news__column" key={post.post_id}>
                            <Link to={"/countries/" + postAuthor.country_id} key={postAuthor.country_id}>
                                <CustomButton
                                    src={postAuthor.country_photo}
                                    text={postAuthor.country_title}
                                    subText={postAuthor.country_tag} 
                                />
                            </Link>
                            
                            <h3>{post.post_title}</h3>

                            {post.post_text &&
                                <p>{post.post_text}</p>
                            }
                        </section>
                    }

                    return null
                })}
            </article>
        </>
    )
}
