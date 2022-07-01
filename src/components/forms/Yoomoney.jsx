import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Yoomoney = (props) => {
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [goodReceived, setGoodReceived] = useState(false)
    const navigate = useNavigate()

    const [orderID, setOrderID] = useState(null)
    const [orderKEY, setOrderKEY] = useState(null)

    const interval = setInterval(() => {
        axios.post('/api/payments/yoomoney/client', {
            id: props.payment.id,
            method: props.payment.method,
            price: props.payment.price
        })
            .then(res => {
                if(res.data.status === 200) {
                    nextStep(res.data)
                }
            })
            .catch(e => console.log(e))
    }, 15000)

    function nextStep(res) {
        clearInterval(interval)
        props.setYoomoneyPage(false)
        setPaymentSuccess(true)
        setGoodReceived(true)
        setOrderID(res.id)
        setOrderKEY(res.code)
        navigate(`/order/${res.id}/${res.code}`)
    }

    function backPage() {
        clearInterval(interval)
        props.setYoomoneyPage(false)
    }

    return (
        <div className='payment-page'>
            <div className="back" onClick={backPage}>
                <div className="btn"></div> Выбрать другой метод оплаты
            </div>

            <div className="sections">
                <section className="order">
                    <div className="img"></div>
                    <div className="info">
                        <div className="status">Покупка оформлена</div>
                        <div className="email">Email: <strong>{props.payment.user_email}</strong></div>
                    </div>
                </section>

                <section className="payment">
                    <div className={paymentSuccess ? "img" : "img-load"}></div>
                    <div className="info">
                        <div className="status">Оплатите покупку</div>
                        {!paymentSuccess  
                            ? <form target="_blank" rel="noreferrer" method="POST" action="https://yoomoney.ru/quickpay/confirm.xml">
                                    <input type="hidden" name="receiver" value="4100110868705510" />
                                    {/* <!-- Уникальный ID платежа --> */}
                                    <input type="hidden" name="label" value={props.payment.id} />
                                    <input type="hidden" name="quickpay-form" value="shop" />
                                    {/* <!-- Описание платежа --> */}
                                    <input type="hidden" name="targets" value={"Оплата заказа #" + props.payment.id} />
                                    {/* <!-- Сумма платежа --> */}
                                    <input type="hidden" name="sum" value={props.payment.price} data-type="number" />
                                    <input value={props.payment.user_email} type="hidden" />
                                    {/* <!-- Комментарий --> */}
                                    {/* <!-- <input type="hidden" name="comment" value="Хотелось бы получить дистанционное управление."> --> */}
                                    {/* <!-- Адрес редиректа --> */}
                                    <input type="hidden" name="successURL" value="/" />
                                    <input type="hidden" name="paymentType" value={props.paymentType} />
                                    <input className="button" type="submit" value="Перейти" />
                                    {/* <a className="button" href={props.payment.data} rel="noreferrer" target="_blank">Перейти</a> */}
                                </form>
                            : ""
                        }
                    </div>
                </section>

                <section className="payment">
                    <div className="img-load"></div>
                    <div className="info">
                        <div className="status">
                            {!paymentSuccess 
                                ? "После оплаты получите товар в этом окне"
                                : "Можно забирать товар"
                            }
                        </div>
                        {goodReceived
                            ? <a rel="noreferrer" className="button" href={`/order/${orderID}/${orderKEY}`} target="_blank">Перейти</a>
                            : ""
                        }
                    </div>
                </section>

                <section className="order">
                    <div className="img-attention"></div>
                    <div className="info">
                        <div className="status">Не закрывайте окно и не перезагружайте страницу!</div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Yoomoney
