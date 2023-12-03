import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { DataContext } from "../Context"
import CustomButton from "../CustomButton/CustomButton"
import Aside from "../Aside/Aside"
import imgBasePhoto from "../../assets/replace/base-photo-empty.png"
import { VKAPI } from '../VK-API'

import "./UserPage.css"
import "./UserPage-phone.css"


export default function UserPage() {
    const Navigate = useNavigate()
    const Context = useContext(DataContext)
    const URLparams = useParams()
    const isSelfRender = Context.userData ? Context.userData.id === URLparams.id : false

    const [userNotFound, setuserNotFound] = useState(false);
    const [showCopyMessage, setshowCopyMessage] = useState(false);
    
    const [userData, setuserData] = useState({});
    const [userDataVk, setuserDataVk] = useState({});

    useEffect(() => {
        document.title = "Участник | Ежиное-РП"
    }, [])

    const handleCopyButton = () => {
        navigator.clipboard.writeText(userData.tag)
        setshowCopyMessage(true)
        setTimeout(() => setshowCopyMessage(false), 2000)
    }

    const handleExitProfile = () => {
        delete localStorage.userData
        delete Context.userData
        Navigate("/")
        window.location.reload()
    }

    // Когда загрузились все юзеры
    useEffect(() => {
        if (!Object.keys(Context.users).length) {
            return
        }
        
        let findedUser = Context.users.find(user => user.id === URLparams.id)

        if (!findedUser) {
            setuserNotFound(true)
            return
        }

        setuserData(findedUser)
        document.title = findedUser.name + " | Ежиное-РП"
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [[], Context.users])

    useEffect(() => {
        console.log("VKAPI: users.get");

        // Находим информацию о пользователе в вк при изменении id поиска
        VKAPI('users.get', {user_id: URLparams.id, fields: "photo_200"}, (vkData) => {
            console.log("VKAPI: user received");

            if (vkData.response.length) {
                vkData = vkData.response[0]
                setuserDataVk({
                    photo: vkData.photo_200,
                    name: `${vkData.first_name} ${vkData.last_name}`
                })
            }
        })
    }, [URLparams.id])

    return (
        <>
            <Aside />
            <article id="article-user">
                <h4 className="page-title text-dark">/ Участник</h4>

                {/* Если юзер найден */}
                {Object.keys(userData).length
                    ? <section className="user-profile">
                        <div className="user-profile__top">
                            <div className="user-profile__top-photo">
                                <img src={userData.photo ? userData.photo : imgBasePhoto} alt="userpic" />
                            </div>
                            <div className="user-profile__top-name">
                                <h2>{userData.name}</h2>
                                <p onClick={handleCopyButton} className="user-profile__top-tag text-cut text-gray">{showCopyMessage ? "Скопировано" : userData.tag}</p>
                            </div>
                        </div>

                        <Link to={`https://vk.com/id${userData.id}`} target="_blank" rel="noopener noreferrer">
                            <CustomButton
                                src={userDataVk.photo}
                                text={userDataVk.name}
                            />
                        </Link>

                        {/* Если есть описание - отображаем */}
                        {userData.bio &&
                            <p className="user-profile__bio">{userData.bio}</p>
                        }

                        {/* Кнопка выхода если отображается профиль владельда страницы */}
                        {isSelfRender &&
                            <button className="red" onClick={handleExitProfile}>Выйти из профиля</button>
                        }
                    </section>
                    
                    // Если пользователь не найден, будет показан только когда будет ошибка
                    : <section className={`user-profile ${!userNotFound ? "hidden" : null}`}>
                        <h2>Участник не найден!</h2>
                        <Link to={"/users"}>
                            <button>К списку участников</button>
                        </Link>
                    </section>
                }

            </article>
        </>
    )
}
