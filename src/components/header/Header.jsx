import React from 'react'
// import BurgerComp from './burger/Burger'
// import HeaderNavComp from './navigation/HeaderNav'
import LogoComp from './logo/Logo'
import '../../assets/scss/header.scss'

const Header = () => {

    // const links =[
    //     { text: "покупки", href: '/q' },
    //     { text: "промо-коды", href: '/w' },
    //     { text: "подарочные карты", href: '/e' },
    // ]

    return (
        <header className={'header'}>
            <div className={'header__content'}>
                <LogoComp />
                
                {/* <div className={'header__content_list'}>
                    <BurgerComp links={links} />

                    <HeaderNavComp links={links} />
                </div> */}
            </div>
        </header>
    )
}

export default Header