// Импорт основных библиотек
import React from "react";
import { Routes, Route, HashRouter as Router } from "react-router-dom";

// Импорт стилей
import "./styles/style.css";
import "./App.css";
import "./App-phone.css";

// Импорт страниц
import Home from "./components/Home/Home";
import Error404 from "./components/Error404/Error404";

import Dev from "./components/Dev/Dev";

import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";



export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="*" element={<h1>Такой страницы не существует</h1>} />
                <Route path="/home" element={<Home />} />

                <Route path="/news" element={<Error404 />} />
                <Route path="/users" element={<Error404 />} />
                <Route path="/countries" element={<Error404 />} />
                <Route path="/nations" element={<Error404 />} />

                <Route path="/tools" element={<Error404 />} />
                <Route path="/help" element={<Error404 />} />
                <Route path="/about" element={<Error404 />} />

                <Route path="/dev" element={<Dev />} />

                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
            </Routes>
        </Router>
    )
}