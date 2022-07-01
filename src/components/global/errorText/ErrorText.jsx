import React from 'react'
import style from "./error.module.scss"

const ErrorText = (props) => {
    return (
        <p style={{...props.style}} className={style.error}>{props.children}</p>
    )
}

export default ErrorText
