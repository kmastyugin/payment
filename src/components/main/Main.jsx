import React, { useState, useEffect } from 'react'
import Header from "./header/Header"
import Payments from "./payments/Payments"
import RenderPayment from "./payments/RenderPayment"

const Main = () => {
    const product = {
        id: 1266632,
        name: "XBOX GAME PASS ULTIMATE 12+2 (14 Месяца) +EA PLAY",
        price: 1994.18,
        currency: "RUB",
    }

    const [actualPayment, setActualPayment] = useState(null)
    const [errorPayment, setErrorPayment] = useState(false)

    const setPaym = (data) => {
        setActualPayment(data)
    }

    const changeStatusErrorPayment = (status) => {
        setErrorPayment(status)
    }

    useEffect(() => {
        console.log(actualPayment)
    }, [actualPayment])

    // Сокращение длины названия до 70 символов
    // product.name = short(product.name, 98)

    return (
        <div className="content">
            <div className="content__title">
                Оплата заказа - № {product.id}
            </div>


            <main className='product'>
                <Header info={product} />
                <Payments 
                    setPaym={setPaym} 
                    className="content__payments_payment" 
                    error={{set: changeStatusErrorPayment, get: errorPayment}} 
                />

                <RenderPayment 
                    error={{set: changeStatusErrorPayment, get: errorPayment}} 
                    actualPayment={actualPayment} 
                />
            </main>
        </div>
    )
}

export default Main
