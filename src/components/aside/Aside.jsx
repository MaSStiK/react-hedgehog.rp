import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import imgLogo from "../../assets/logo/logo.png"
import "./Aside.css"
import "./Aside-phone.css"
import CustomButton from "../CustomButton/CustomButton"


export default function Aside() {
    let Navigate = useNavigate()

    let userData = localStorage.userData ? JSON.parse(localStorage.userData) : undefined

    return (
        <aside>
            <nav>
                <div className="nav-logo">
                    <img src={imgLogo} alt="nav-logo" onClick={() => {Navigate("/")}} />
                </div>
                
                <ul>
                    <li>
                        {userData // Если есть юзердата - рендерим кнопку профиля
                            ? <CustomButton src={userData.photo} text={userData.name} subText={"@" + userData.id} onClick={() => {Navigate("/login")}} />
                            : <button className="green" onClick={() => {Navigate("/login")}}>Авторизация</button>
                        }
                    </li>
                    
                    {userData && // Если есть юзердата - ренлерим кнопку страны
                        <li>
                            {userData.country // Если страны нету - рендерим кнопку для создания страны
                                ? <CustomButton src={userData.photo} text={userData.name} subText={"@" + userData.id} />
                                : <button className="green" onClick={() => {Navigate("/login")}}>Моя страна</button>
                            }
                        </li>
                    }

                    <div className="nav-divider"></div>

                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/news">Новости</Link></li>
                    <li><Link to="/users">Участники</Link></li>
                    <li><Link to="/countries">Страны</Link></li>
                    <li><Link to="/nations">Нации</Link></li>

                    <div className="nav-divider"></div>

                    <li><Link to="/tools">Инструменты</Link></li>
                    <li><Link to="/help">Помощь</Link></li>
                    <li><Link to="/about">О нас</Link></li>

                    <div className="nav-divider"></div>

                    <li><Link to="/dev">dev</Link></li>
                </ul>
            </nav>
        </aside> 
    )
}
