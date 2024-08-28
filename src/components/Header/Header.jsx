import React from 'react'
import s from './Header.module.sass'

function Header() {
  return (
    <div className={s.container}>
        <img src="/images/Logo.svg" alt="logo" className={s.logo} />
        <p className={s.par}>Главная свадебная премия Казахстана</p>
        <div className={s.links}>
            <p>О премии</p>
            <p>Номинации</p>
            <p>Жюри</p>
            <p>Вопросы и ответы</p>
            <p>Контакты</p>
        </div>

        <div className={s.date}>
            <p className={s.dataText}>26-27</p>
            <div>
                <p>ноября</p>
                <button>подать заявку</button>
            </div>
        </div>

        <div className={s.exit}>
            <img src="/images/exit.svg" alt="exit" />
            <p>ВОЙТИ</p>
        </div>
    </div>
  )
}

export default Header