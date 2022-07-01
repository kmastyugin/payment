import React, { useState } from 'react'
import Payment from "./Payment"
import ErrorText from "../../global/errorText/ErrorText"

const Payments = (props) => {
    const [activePayment, setActivePayment] = useState(null)

    const changePayment = {
        get: activePayment,
        set: setActivePayment
    }

    // Способы оплаты
    const payments = [
        { id: 1, image: "/images/payments/qiwi.png", title: "Qiwi" },
        { id: 2, image: "/images/payments/yoomoney.png", title: "Yoomoney", paymentType: 'PC' },
        { id: 3, image: "/images/payments/beeline.png", title: "Beeline", paymentType: 'MC' },
        { id: 4, image: "/images/payments/tele2.png", title: "Tele2", paymentType: 'MC' },
        { id: 5, image: "/images/payments/visa.png", title: "Card", paymentType: 'AC' },
        { id: 6, image: "/images/payments/mts.png", title: "Mts", paymentType: 'MC' },
    ]

    return (
        <div className="payments_block">
            <p className="pick_payment">Способ оплаты:</p>

            <div className="payments_block__payments">
                {payments.map(payment => {
                    return <Payment 
                                setPaymGlobal={props.setPaym} 
                                changePayment={changePayment} 
                                key={payment.title} 
                                payment={payment}
                                error={props.error}
                            />
                })}

                {props.error.get ? <ErrorText style={{textAlign: 'center'}}>Выберите способ оплаты</ErrorText> : ""}
            </div>
        </div>
    )
}

export default Payments
