import React from 'react'
import { Link, useNavigate } from "react-router-dom";

import navLogo from "../../assets/logo/logo.png"
import "./Nav.css"


export default function Nav() {
    let navigate = useNavigate()

    const handleLogoClick = () => {
        navigate("/")
    }

    return (
        <nav>
            <div className="nav-logo">
                <img src={navLogo} alt="nav-logo" onClick={handleLogoClick} />
            </div>
            
            <ul>
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
    )
}
