import React, { useState, useEffect } from 'react'
import validateEmail from "../../../utils/validateEmail"
import ErrorText from "../../global/errorText/ErrorText"
import axios from "axios"
import { useParams } from "react-router-dom"


const RenderPayments = (props) => {
    const [email, setEmail] = useState("")
    const [emailSecond, setEmailSecond] = useState("")
    const [errorEmailFirst, setErrorEmailFirst] = useState(false)
    const [errorEmailSecond, setErrorEmailSecond] = useState(false)

    const ProductId = useParams().id

    // Запрос на оплату товара
    const requestPayment = async () => {
        await axios.post('/api/payments', {
            id_good: ProductId,
            price: props.product.price,
            user_email: email,
            method: props.actualPayment.title
        })
            .then(res => {
                props.changePayment(res.data)
            })
            .catch(e => console.log(e))
    }

    // Валидация введенных данных
    const validatePayment = (e) => {
        e.preventDefault()

        let errors = false
        // Если email некорректный или email не равны - закончить
        if(!validateEmail(email)) {
            setErrorEmailFirst(true)
            errors = true
        }
        if(email !== emailSecond) {
            setErrorEmailSecond(true)
            errors = true
        }

        if(errors) return

        if(!props.actualPayment) return props.error.set(true)
        else props.error.set(false)


        requestPayment()
    }

    // Проверка на ввод корректного Email при каждом вводе символа во первую форму
    useEffect(() => {
        if(email) setErrorEmailFirst(!validateEmail(email))
        else setErrorEmailFirst(false)
    }, [email])

    // Проверка на ввод одинаковых Email при каждом вводе символа во вторую форму
    useEffect(() => {
        if(emailSecond && emailSecond === email) setErrorEmailSecond(false)
        else if(!emailSecond) setErrorEmailSecond(false)
        else setErrorEmailSecond(true)
    }, [emailSecond, email])

    return (
        <div className="render_payment">
            <form onSubmit={validatePayment}>
                <section>
                    <div className="title">Email:</div>
                    <input
                        onChange={e => setEmail(e.target.value.toLowerCase().trim())}
                        value={email}
                        placeholder="Ваш email"
                        className="input"
                        type="text"
                    />
                    {errorEmailFirst ? <ErrorText>Введите корректный Email</ErrorText>: ""}
                </section>

                <section>
                    <div className="title">Email повторно (Только ручной ввод):</div>
                    <input
                        onPaste={e => e.preventDefault()}
                        onChange={e => setEmailSecond(e.target.value.toLowerCase().trim())}
                        value={emailSecond}
                        placeholder="Ваш email"
                        className="input"
                        type="text"
                    />
                    {errorEmailSecond ? <ErrorText>Введите одинаковые Email</ErrorText>: ""}
                </section>

                <button>Оплатить</button>
            </form>
        </div>
    )
}

export default RenderPayments
