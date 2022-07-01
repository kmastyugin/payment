import React, { useState } from 'react'
import BurgerNav from '../navigation/BurgerNav'

const Burger = (props) => {
    const [burgerStatus, setBurgerStatus] = useState(false)

    window.addEventListener('click', () => {
        if(burgerStatus) setBurgerStatus(false)
    })

    const changeBurgerList = (e) => {
        e.stopPropagation()
        setBurgerStatus(!burgerStatus)
    }

    return (
        <div onClick={changeBurgerList} className={burgerStatus ? "burger active": "burger"}>
            <div className="burger__button"></div>

            <BurgerNav links={props.links} />
        </div>
    )
}

export default Burger
