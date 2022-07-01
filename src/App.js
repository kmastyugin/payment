import React from 'react'
import Header from './components/header/Header'
import { Routes, Route, Navigate } from "react-router-dom"

import IndexPage from "./views/IndexPage"
import NotFoundPage from "./views/NotFoundPage"
import OrderPage from "./views/OrderPage"
import StartPage from "./views/StartPage"

const App = () => {
    return (
        <>
            <Header />
            {/* <Main /> */}

            <Routes>
                <Route path="/" element={<StartPage />}/>
                <Route path="/goods/:id" element={<IndexPage />}/>
                <Route path="/404" element={<NotFoundPage />}/>
                <Route path="/order/:id/:code" element={<OrderPage />}/>
                <Route path="*" element={<Navigate to="/404" />}/>
            </Routes>
        </>
    )
}

export default App
