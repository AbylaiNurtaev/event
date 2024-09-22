import React, { useState } from 'react'
import s from './BalancePopup.module.sass'
import { useNavigate } from 'react-router-dom'

function 

BalancePopup() {
    const navigate = useNavigate()
    const [close, setClose] = useState(false)
  return (
    <>
{
    !close && 
    <div className={s.shadow}></div>
}    
    <div className={s.container} style={close ? {display: 'none'} : {}}>
        <div className={s.top}>
            <div className={s.title}>Ваш баланс составляет 0 тенге</div>
            <img style={{cursor: 'pointer'}} onClick={() => setClose(true)} src="/images/Frame 67.svg" alt="" />
        </div>
        <div className={s.par}>Чтобы подать заявку, пополните свой баланс.</div>
        <button onClick={() => {navigate('/payment')}}>пополнить</button>
    </div>
    </>
  )
}

export default BalancePopup