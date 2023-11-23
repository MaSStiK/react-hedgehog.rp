import { useEffect, useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from "../Context"
import CustomInput from "../CustomInput/CustomInput"
import CustomButton from "../CustomButton/CustomButton"
import Aside from "../Aside/Aside"

import "./CountriesPage.css"

export default function CountriesPage() {
    const Context = useContext(DataContext)
    const searchRef = useRef()

    const [usersRender, setusersRender] = useState([]);

    useEffect(() => {
        document.title = "Все страны | Ежиное-РП"
    }, [])

    // useEffect(() => {
    //     // При обновлении контекста так же обновляется и массив
    //     setusersRender(Context.users)
    //     searchUsers()
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [Context.users])
    
    // const searchUsers = () => {
    //     let filteredUsers = Context.users.filter(
    //         // Если есть поисковая строка в имени юзера или в теге или в id
    //         user => user.name.toLowerCase().includes(searchRef.current.value.toLowerCase())
    //         || user.tag.toLowerCase().includes(searchRef.current.value.toLowerCase())
    //         || user.id.toLowerCase().includes(searchRef.current.value.toLowerCase())
    //     )
    //     setusersRender(filteredUsers)
    // }

    return (
        <>
            <Aside />
            
            <article id="article-users">
                <h4 className="page-title text-dark">/ Все страны</h4>

                <section className="section-countries">
                    <CustomInput label="Поиск страны">
                        <input type="text" ref={searchRef} required />
                    </CustomInput>
                    {/* {usersRender.map((user) => (
                        <Link to={"/users/" + user.id} key={user.id}>
                            <CustomButton
                                src={user.photo}
                                text={user.name}
                                subText={user.tag} 
                            />
                        </Link>
                    ))} */}
                </section>
            </article>
        </>
    )
}
