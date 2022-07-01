import React from 'react'

const Header = (props) => {
    return (
        <header className="product__header">
            <div title={props.info.name} className="product__header_name">
                {props.info.name}
            </div>

            <div className="product__header_price">
                {props.info.price} <span className="currency">{props.info.currency}</span>
            </div>
        </header>
    )
}

export default Header
