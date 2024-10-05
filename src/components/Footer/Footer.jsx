import React from 'react'
import s from './Footer.module.sass'

function Footer() {
  return (
    <div className={s.container}>
        <div className={s.left}>
            <div className={s.top}>
                <p>Положение о премии</p>
                <p>|</p>
                <p>Политика конфиденциальности</p>
            </div>
            <p className={s.bottom}>©  Главная свадебная премия Казахстана «WEDS»</p>
        </div>

        <div className={s.right}>
            <div className={s.top}>
                <p>Контакты</p>
                <p>|</p>
                <p>+7-700-100-50-50</p>
                <p>|</p>
                <p>info@weds.kz</p>
            </div>

            <div className={s.bottom}>
                <button className={s.partnerBtn} onClick={() => window.location.href = 'https://web.whatsapp.com'}>стать партнёром</button>
                <img src="/images/soc_med/instagram.svg" alt="" />
                <img src="/images/soc_med/telegram.svg" alt="" />
                <img src="/images/soc_med/youtube.svg" alt="" />
                <img src="/images/soc_med/facebook.svg" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Footer