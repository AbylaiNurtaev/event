import React, { useEffect, useState } from 'react'
import s from './Header.module.sass'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../axios'

function Header() {

    const location = useLocation()
    const navigate = useNavigate()

    const [burgerMenu, setBurgerMenu] = useState()
    const [user, setUser] = useState()

    const scrollDownMobile = () => {
        setBurgerMenu(false)
        window.scroll({
            behavior: "smooth",
            top: document.body.scrollHeight - 2300
        })
    }
    const scrollDown = () => {
        window.scroll({
            behavior: "smooth",
            top: document.body.scrollHeight - 1300
        })
    }


    useEffect(() => {
        axios.post('/auth/getUserByToken')
            .then(res => res.data)
            .then(data => {
                setUser(data)
    })
            .catch((err) => {})
    }, [])

    return (<>
        <div className={s.container}>
            <img src="/images/Logo.svg" onClick={() => navigate('/')} alt="logo" className={s.logo} />
            <p className={s.par}>Главная свадебная премия Казахстана</p>
            <div className={s.links}>
                <p onClick={() => navigate('/about')} style={location && location.pathname == "/about" ? { color: '#f4444a' } : {}}>О премии</p>
                <p onClick={() => navigate('/nominations')} style={location && location.pathname == "/nominations" ? { color: '#f4444a' } : {}}>Номинации</p>
                <p onClick={() => navigate('/joury')} style={location && location.pathname == "/joury" ? { color: '#f4444a' } : {}}>Жюри</p>
                <p onClick={scrollDown}>Вопросы и ответы</p>
                <p onClick={() => navigate('/contacts')} style={location && location.pathname == "/contacts" ? { color: '#f4444a' } : {}}>Контакты</p>
            </div>

            <div className={s.date} onClick={user?.name ? () => navigate('/application') : () => navigate('/login')}>
                <p className={s.dataText}>26-27</p>
                <div>
                    
                    <p>ноября</p>
                    <button>подать заявку</button>
                </div>
            </div>

            {
                user?.name ?
                    <div style={{cursor: "pointer"}} className={s.name}>
                        <h5 onClick={() => navigate(`/cabinet/${user._id}`)}>{user.name}</h5>
                        <p onClick={() => navigate('/payment')}>Баланс: 0 заявок</p>
                    </div> :
                    <div className={s.exit} onClick={() => navigate('/login')}>
                        <img src="/images/exit.svg" alt="exit" />
                        <p>ВОЙТИ</p>
                    </div>
            }
        </div>

        <div className={s.mobileContainer}>
            {/* <img src="/images/white-back.svg" className={s.light} alt="" /> */}
            <img onClick={() => navigate('/')} className={s.logo} src='/images/Logo (1).svg'></img>
            <img className={s.burgerMenuBtn} onClick={() => setBurgerMenu(true)} src='/images/nimbus_menu.svg'></img>
            {
                burgerMenu &&
                <div className={s.burgerMenu}>
                    <div className={s.inner}>
                        <div className={s.closeDiv}>

                            <img src="/images/clarity_close-line.svg" onClick={() => setBurgerMenu(false)} alt="" className={s.close} />
                        </div>
                        {
                            user?.name ?
                                <div className={s.name}>
                                    <h5 onClick={() => navigate(`/cabinet/${user._id}`)}>{user.name}</h5>
                                    <p  onClick={() => navigate('/payment')}>Баланс: 0 заявок</p>
                                </div> :
                                <div className={s.exit} onClick={() => navigate('/login')}>
                                    <img src="/images/exit.svg" alt="exit" />
                                    <p>ВОЙТИ</p>
                                </div>
                        }

                        <div className={s.links}>
                            <p onClick={() => { navigate('/about'); setBurgerMenu(false) }} style={location && location.pathname == "/about" ? { color: '#f4444a' } : {}}>О премии</p>
                            <p onClick={() => { navigate('/nominations'); setBurgerMenu(false) }} style={location && location.pathname == "/nominations" ? { color: '#f4444a' } : {}}>Номинации</p>
                            <p onClick={() => { navigate('/joury'); setBurgerMenu(false) }} style={location && location.pathname == "/joury" ? { color: '#f4444a' } : {}}>Жюри</p>
                            <p onClick={scrollDownMobile}>Вопросы и ответы</p>
                            <p onClick={() => { navigate('/contacts'); setBurgerMenu(false) }} style={location && location.pathname == "/contacts" ? { color: '#f4444a' } : {}}>Контакты</p>
                        </div>

                        <div className={s.date} onClick={() => navigate('/application')}>
                            <p className={s.dataText}>26-27</p>
                            <div>
                                <p>ноября</p>
                                <button>подать заявку</button>
                            </div>
                        </div>



                    </div>
                </div>
            }
        </div>


    </>
    )
}

export default Header