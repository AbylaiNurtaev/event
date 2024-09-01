import React, { useEffect } from 'react'
import s from './AuthorizationPage.module.sass'
import { useNavigate } from 'react-router-dom'
import Questions from '../../components/Questions/Questions'

function AuthorizationPage() {

    const navigate = useNavigate()
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
    }, [])

  return (
    <div className={s.container}>
        <div className={s.innerContainer}>
            <div className={s.crumbs}>
                <img src="/images/fluent_arrow-up-28-filled.svg" alt="" />
                <p onClick={() => navigate('/')}>Вернуться назад</p>
            </div>
            <div className={s.title}>АВТОРИЗАЦИЯ</div>
            <div className={s.loginContainer}>
                <div className={s.title}>Учетная запись</div>
                <div className={s.par}>Укажите ваш рабочий Email для авторизации</div>
                <input type="text" className={s.input} placeholder='example@mail.com' />
                <button>ОТПРАВИТЬ КОД</button>
                
            </div>
        </div>
        <div className={s.questions}>

        <Questions></Questions>
        </div>
    </div>
  )
}

export default AuthorizationPage