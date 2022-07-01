import React from 'react'
import { NavLink } from "react-router-dom"

const BurgerNav = (props) => {
    return (
        <ul className="burger__list" onClick={e => e.stopPropagation()}>
            {props.links.map(link => {
                return <li key={link.text}>
                    <NavLink
                        className="burger__list_elem" 
                        to={link.href} 
                    >
                        {link.text}
                    </NavLink>
                </li>
            })}
        </ul>
    )
}

export default BurgerNav
