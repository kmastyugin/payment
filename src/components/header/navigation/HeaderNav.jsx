import React from 'react'
import { NavLink } from "react-router-dom"

const HeaderNav = (props) => {
    return (
        <ul className={"header__content_list_links"}>
            {props.links.map(link => {
                return <li key={link.text}>
                    <NavLink 
                        to={link.href} 
                        className={`header__content_list_links_link`}
                    >
                            {link.text}
                    </NavLink>
                </li>
            })}
        </ul>
    )
}

export default HeaderNav
