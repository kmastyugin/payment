import React from 'react'
import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div className="content">
            <div className="product error">
                <p>Такой страницы не существует</p>

                <Link to="/">На главную</Link>
            </div>
        </div>
    )
}

export default NotFoundPage
