import React from 'react'
import s from './Header.module.sass'
import { useLocation, useNavigate } from 'react-router-dom'

function Header() {

    const location = useLocation()
    const navigate = useNavigate()
    
  return (
    <div className={s.container}>
        <img src="/images/Logo.svg" alt="logo" className={s.logo} />
        <p className={s.par}>Главная свадебная премия Казахстана</p>
        <div className={s.links}>
            <p onClick={() => navigate('/about')} style={location && location.pathname == "/about" ? {color: '#f4444a'} : {}}>О премии</p>
            <p onClick={() => navigate('/nominations')} style={location && location.pathname == "/nominations" ? {color: '#f4444a'} : {}}>Номинации</p>
            <p onClick={() => navigate('/joury')} style={location && location.pathname == "/joury" ? {color: '#f4444a'} : {}}>Жюри</p>
            <p>Вопросы и ответы</p>
            <p onClick={() => navigate('/contacts')} style={location && location.pathname == "/contacts" ? {color: '#f4444a'} : {}}>Контакты</p>
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