import React from 'react'

const Loading = (props) => {
    return (
        <>
            {props.visible
            ? <div className="content-order">
                <p>Ожидание получения товара...</p>
                <div className="loading"></div>
            </div>
            : ""}
        </>
    )
}

export default Loading
