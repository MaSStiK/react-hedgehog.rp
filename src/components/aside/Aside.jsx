import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import imgLogo from "../../assets/logo/logo.png"
import imgBurger from "../../assets/icons/Burger.svg"
import imgClose from "../../assets/icons/Close.svg"
import "./Aside.css"
import "./Aside-phone.css"
import CustomButton from "../CustomButton/CustomButton"
import { useState } from 'react';


export default function Aside() {
    let Navigate = useNavigate()

    let userData = localStorage.userData ? JSON.parse(localStorage.userData) : undefined

    const [hideNavMenu, sethideNavMenu] = useState(true);

    const handleShowNavMenu = () => {
        sethideNavMenu(!hideNavMenu)    
    }

    return (
        <aside>
           <div id="nav-menu-bg" className={hideNavMenu ? "hide-nav-menu" : null} onClick={handleShowNavMenu}></div>

            <button id="nav-menu-show" className="button-icon" onClick={handleShowNavMenu}>
                <img src={imgBurger} alt="open-menu" />
            </button>

            {userData // Если есть юзердата - рендерим мобильную кнопку профиля
                ? <CustomButton
                    id="nav-phone-user"
                    type="tp"
                    src={userData.photo}
                    text={userData.name}
                    onClick={() => {Navigate("/login")}} 
                  />
                : null 
            }

            <div className={`nav-wrapper ${hideNavMenu ? "hide-nav-menu" : null}`}>
                <nav>

                    <button id="nav-menu-hide" className="button-icon" onClick={handleShowNavMenu}>
                        <img src={imgClose} alt="close-menu" />
                    </button>

                    <div className="nav-logo">
                        <img src={imgLogo} alt="nav-logo" onClick={() => {Navigate("/")}} />
                    </div>
                    
                    <ul>
                        <li>
                            {userData // Если есть юзердата - рендерим кнопку профиля
                                ? <CustomButton
                                    src={userData.photo}
                                    text={userData.name}
                                    subText={"@" + userData.id}
                                    onClick={() => {Navigate("/login")}} 
                                    style={{marginBottom: "var(--block-gap)"}}
                                  />
                                : <button className="green" onClick={() => {Navigate("/login")}}>Авторизация</button>
                            }
                        </li>
                        
                        {userData && // Если есть юзердата - ренлерим кнопку страны
                            <li>
                                {userData.country // Если страны нету - рендерим кнопку для создания страны
                                    ? <CustomButton
                                        src={userData.photo}
                                        text={userData.name}
                                        subText={"@" + userData.id} 
                                      />
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
            </div>
        </aside> 
    )
}
