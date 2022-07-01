import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Qiwi = (props) => {
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [goodReceived, setGoodReceived] = useState(false)
    const navigate = useNavigate();

    const [orderID, setOrderID] = useState(null)
    const [orderKEY, setOrderKEY] = useState(null)

    const interval = setInterval(() => {
        axios.post('/api/payments/qiwi', {
            payment_id: props.payment.id,
            price: props.payment.price
        })
            .then(res => {
                if(res.status === 200) nextStep(res.data)
            })
            .catch(e => console.log(e))
    }, 15000)

    function nextStep(res) {
        clearInterval(interval)
        props.setQiwiPage(false)
        setPaymentSuccess(true)
        setGoodReceived(true)
        setOrderID(res.id)
        setOrderKEY(res.code)
        navigate(`/order/${res.id}/${res.code}`)
    }

    function backPage() {
        clearInterval(interval)
        props.setQiwiPage(false)
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
                            ? <a className="button" href={props.payment.data} rel="noreferrer" target="_blank">Перейти</a>
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

export default Qiwi
