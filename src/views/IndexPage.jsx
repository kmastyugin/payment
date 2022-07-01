import React, { useState, useEffect } from 'react'
import Header from "../components/main/header/Header"
import Payments from "../components/main/payments/Payments"
import QiwiPageComp from "../components/forms/Qiwi"
import YoomoneyPageComp from "../components/forms/Yoomoney"
import RenderPayment from "../components/main/payments/RenderPayment"
import "../assets/scss/payment.scss"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

const Main = () => {
    // Объект редиректа
    const navigate = useNavigate()
    // ID товара
    const ID = +useParams().id

    // Актуальный товар
    const [product, setProduct] = useState({name: '', price: "", currency: '', id: ''})

    // Получение актуального товара
    useEffect(() => {
        console.log(typeof ID);
        if(typeof ID !== 'number') return navigate('/404')

        axios.get(`/api/goods/${ID}`)
            .then(res => {
                if(!res.data) navigate(`/404`)
                
                res = JSON.parse(res.data)
                setProduct({
                    name: res.name,
                    price: res.price,
                    id: res.id,
                    currency: "RUB"
                })
            })
            .catch(e => {
                navigate(`/404`)
            })
    }, [ID, navigate])

    // Страница оплаты Qiwi
    const [qiwiPage, setQiwiPage] = useState(false)
    // Страница оплаты Yoomoney
    const [yoomoneyPage, setYoomoneyPage] = useState(false)

    const [payment, setPayment] = useState(null)
    /**
     * @Function устанавливает текущий платеж
     * Принимает @Object
     */
    const changePayment = (data) => {
        setPayment(data)
    }


    useEffect(() => {
        if (!payment) return

        if (payment.method === "Qiwi") {
            setQiwiPage(true)
        }
        else {
            setYoomoneyPage(true)
        }
    }, [payment])

    /**
     * @Function для установки выбранной способа оплаты
     * Меняет значение @actualPayment
     * Принимает @Object
     * Передается в компонент Payments(все способы оплаты) и от туда в компонент Payment(конкретный способ оплаты)
     * В компоненте Payment устанавливается актуальный способ оплаты при клике
     */

    const setPaym = (data) => {
        setActualPayment(data)
    }

    /**
     * @Function для изменения статуса ошибки выбранного способа оплаты
     * Меняет значение @Param errorPayment 
     * Принимает @Boolean
     * Передается в компоненты Payments(все способы оплаты) от куда в Payment(конкретный способ оплаты) и RenderPayments(поля ввода email и кнопка)
     * В компоненте Payment нужно для рисовки и убирания ошибки, если выбран способ оплаты
     * В компоненте RenderPayments нужно для отображения или убирания, если при клике на кнопку Оплатить способ оплаты не выбран
     */
    const changeStatusErrorPayment = (status) => {
        setErrorPayment(status)
    }

    const [actualPayment, setActualPayment] = useState(null) /** @Object выбранного способа оплаты */
    const [errorPayment, setErrorPayment] = useState(false) /** @Boolean статуса ошибки выбранного способа оплаты */

    return (
        <div className="content">
            <div className="content__title">
                {!qiwiPage && !yoomoneyPage ? "Оплата заказа" : `Ожидание оплаты - №${payment.id}`}
            </div>


            {!qiwiPage && !yoomoneyPage ?
                <main className='product'>
                    <Header info={product} />
                    <Payments
                        setPaym={setPaym}
                        className="content__payments_payment"
                        error={{ set: changeStatusErrorPayment, get: errorPayment }}
                    />

                    <RenderPayment
                        product={product}
                        error={{ set: changeStatusErrorPayment, get: errorPayment }}
                        actualPayment={actualPayment}
                        changePayment={changePayment}
                    />
                </main>
                :
                <main className="product">
                    {qiwiPage 
                        ? <QiwiPageComp payment={payment} setQiwiPage={setQiwiPage} />
                        : <YoomoneyPageComp paymentType={actualPayment.paymentType} payment={payment} setYoomoneyPage={setYoomoneyPage} />
                    }
                    
                </main>
            }
        </div>
    )
}

export default Main
