// Импорт основных библиотек
import React from "react";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import Nav from "./components/Nav/Nav"


// Импорт стилей
import "./styles/style.css";
import "./App.css";

// Импорт страниц
import Dev from "./pages/dev/dev";
import Home from "./pages/home/home";


export default function App() {
    return (
        <Router>
            <aside>
                <Nav />
            </aside>

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

                    <Route path="/dev" element={<Dev />} />
                </Routes>
            </article>
        </Router>
    )
}