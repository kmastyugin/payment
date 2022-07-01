import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <Link to="/" className={'header__content_logo'}>
            <div className={'header__content_logo_icon'}></div>
            <div className={'header__content_logo_text'}>glasspayer</div>
        </Link>
    )
}

export default Logo
