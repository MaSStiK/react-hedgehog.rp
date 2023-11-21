// Импорт основных библиотек
import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { DataContext } from "./components/Context"
import { GSAPI } from "./components/GS-API";
import { setPageLoading } from "./components/Global";

// Импорт стилей
import "./styles/style.css";
import "./App.css";
import "./App-phone.css";

// Импорт страниц
import Login from "./components/LoginPage/LoginPage";
import Registration from "./components/RegistrationPage/RegistrationPage";

import Home from "./components/HomePage/HomePage";
import User from "./components/UserPage/UserPage";
import Users from "./components/UsersPage/UsersPage";
import NotFound from "./components/NotFoundPage/NotFoundPage";

import Dev from "./components/DevPage/DevPage";



export default function App() {
    const Navigate = useNavigate()
    const Context = useContext(DataContext) // Помять приложения, устанавливаем при запуске приложения

    // Передаем в контекст юзердату и его сеттер
    let userData = localStorage.userData ? JSON.parse(localStorage.userData) : null
    const [ContextUserData, setContextUserData] = useState(userData);
    Context.userData = ContextUserData
    Context.setuserData = setContextUserData

    // Ставим в контекст isAdmin
    const [ContextIsAdmin, setContextIsAdmin] = useState(userData ? userData.id === "291195777" : false);
    Context.isAdmin = ContextIsAdmin
    Context.setisAdmin = setContextIsAdmin

    // Передаем в контекст массив всех юзеров
    const [ContextUsers, setContextUsers] = useState([]);
    Context.users = ContextUsers
    Context.setusers = setContextUsers

    useEffect(() => {
        // Анимация загрузки страницы
        setPageLoading()

        // После загрузки приложения делаем проверку токена, если он изменился - требуем залогинится заного
        if (Context.userData) {
            try {
                GSAPI("authorize", {token: Context.userData.token}, (data) => {
                    console.log("GSAPI: authorize");
                    if (data.success) { // Если все успешно
                        let newUserData = {...data.data}
                        newUserData.token = Context.userData.token
                        localStorage.userData = JSON.stringify(newUserData)
                        setContextUserData(newUserData)
                        return
                    }

                    delete localStorage.userData
                    delete Context.userData
                    Navigate("/login")
                })
            } catch(error) {
                // Если произошла какая то ошибка, то удаляем юзердату и требуем залогинится заного
                delete localStorage.userData
                delete Context.userData
                alert(`Произошла непредвиденная ошибка:\n${error}`)
                Navigate("/login")
                return
            }
        }

        // Загрузка всех юзеров
        try {
            GSAPI("GETusers", {}, (data) => {
                console.log("GSAPI: users received");
        
                // Фильтр юзеров в алфавитном порядке
                let usersSorted = data.sort((a,b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                })
    
                // После получения всех юзеров обновляем список в контексте
                setContextUsers(usersSorted)
                setPageLoading(false)
            })
        } catch {
            // Если вдруг произошла ошибка - останавливаем загрузку
            setPageLoading(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <DataContext.Provider value={Context}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />

                <Route path="/home" element={<Home />} />

                <Route path="/news" element={<NotFound />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/countries" element={<NotFound />} />
                <Route path="/nations" element={<NotFound />} />

                <Route path="/tools" element={<NotFound />} />
                <Route path="/help" element={<NotFound />} />
                <Route path="/about" element={<NotFound />} />

                <Route path="/dev" element={
                    <ProtectedRoute isAllowed={Context.isAdmin}>
                        <Dev />
                    </ProtectedRoute>
                }/>

                <Route exact path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </DataContext.Provider>
    )
}