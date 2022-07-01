import React from 'react'

const Payment = (props) => {
    const changePayment = () => {
        props.setPaymGlobal(props.payment)
        props.changePayment.set(props.payment.id)
        props.error.set(false)
    }

    return (
        <div 
            onClick={changePayment}
            className={
                props.changePayment.get === props.payment.id
                    ? "payments_block__payments_payment active"
                    : "payments_block__payments_payment"
            }
        >
            <img title={props.payment.title} src={props.payment.image} alt={props.payment.title} />
        </div>
    )
}

export default Payment
