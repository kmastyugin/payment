import React, { useState, useEffect } from 'react'
import Loading from "../components/global/Loading"
import axios from "axios"
import { useParams } from "react-router-dom"

const OrderPage = () => {
    const params = useParams()

    const [success, setSuccess] = useState(true)

    const [order, setOrder] = useState(true)
    const [purchase, setPurchase] = useState(null)

    let requestInterval

    function requestGetOrder() {
        axios.post('/api/payments/order', {
                id: params.id,
                code: params.code
            })
                .then(res => {
                    if(res.data.status !== 200 && res.data.status !== 201 && res.data.status !== 505) {
                        requestInterval = setInterval(() => {
                            requestGetOrder()
                        }, 10000)
                    }
                    else {
                        setSuccess(true)
                        setPurchase(res.data.data)
                        setOrderToUser(1000)
                    }
                })
                .catch(err => {
                    setSuccess(false)
                    setPurchase("Извините за неудобства, произошел сбой. Обновите страницу через час!")
                    setOrderToUser(1000)
                })
    }

    function setOrderToUser(time) {
        clearInterval(requestInterval)
        setTimeout(() => {
            setOrder(false)
        }, time)
    }

    useEffect(() => {
        requestGetOrder()
    })

    return (
        <div className="content">
            <main className='product'>
                <Loading visible={order} />

                {!order && purchase
                    ? <div className="order-content">
                        
                        {success ? <p>Ваш выигрыш:</p> : ""}
                        
                        <div className="purchase">
                            {purchase}
                        </div>
                    </div>
                    : ""
                }
            </main>
        </div>
    )
}

export default OrderPage
