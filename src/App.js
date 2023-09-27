// Импорт основных библиотек
import React from "react";
import { Routes, Link, Route, HashRouter as Router } from "react-router-dom";
import navLogo from "./assets/logo/logo.png"


// Импорт стилей
import "./styles/style.css";
import "./App.css";
import "./styles/nav/nav.css"

// Импорт страниц
import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";


export default function App() {
    return (
        <Router>
            <nav>
                <div className="nav-content">
                    <div className="nav-logo">
                        <img src={navLogo} alt="nav-logo" />
                    </div>
                    <ul>
                        <li>
                            <Link to="/">Главная</Link>
                        </li>
                        <li>
                            <Link to="/news">Новости</Link>
                        </li>
                        <li>
                            <Link to="/users">Участники</Link>
                        </li>
                        <li>
                            <Link to="/countries">Страны</Link>
                        </li>
                        <li>
                            <Link to="/nations">Нации</Link>
                        </li>
                        <div className="nav-divider"></div>
                        <li>
                            <Link to="/tools">Инструменты</Link>
                        </li>
                        <li>
                            <Link to="/help">Помощь</Link>
                        </li>
                        <li>
                            <Link to="/about">О нас</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <article>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="*" element={<h1>Такой страницы не существует</h1>} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/news" element={<h1>Эта страница еще не сделана</h1>} />
                    <Route path="/users" element={<h1>Эта страница еще не сделана</h1>} />
                    <Route path="/countries" element={<h1>Эта страница еще не сделана</h1>} />
                    <Route path="/nations" element={<h1>Эта страница еще не сделана</h1>} />
                    <Route path="/tools" element={<h1>Эта страница еще не сделана</h1>} />
                    <Route path="/help" element={<h1>Эта страница еще не сделана</h1>} />
                    <Route path="/about" element={<h1>Эта страница еще не сделана</h1>} />

                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </article>
        </Router>
    )
}