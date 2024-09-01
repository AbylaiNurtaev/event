import React, { useEffect } from 'react'
import s from './ContactPage.module.sass'
import { useNavigate } from 'react-router-dom'
import Questions from '../../components/Questions/Questions'

function ContactPage() {
    const navigate = useNavigate()

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
    }, [])

  return (
    <div className={s.container}>
            <div className={s.crumbs}>
                <p onClick={() => navigate('/')}>Главная</p>
                <p>|</p>
                <p>Контакты</p>
            </div>
            <div className={s.about}>
                <h1>Контакты</h1>
            </div>

            <div className={s.contacts}>
                <div className={s.left}>
                    <div className={s.gray}>WEDS</div>
                    <div className={s.title}>АДРЕС</div>
                    <p>г. Астана, улица Кабанбай Батыра, 1</p>
                </div>
                <div className={s.middle}>
                    <div className={s.gray}>Редакция</div>
                    <div className={s.title}>СОФИЯ ПЕТРОВИЧ</div>
                    <p>+7-700-100-50-50</p>
                    <p>info@weds.kz</p>
                    <p>@sofia_p</p>
                </div>
                <div className={s.right}>
                    <div className={s.gray}>Реклама и спецпроекты</div>
                    <div className={s.title}>Марк Носач</div>
                    <p>+7-700-200-60-50</p>
                    <p>mark@weds.kz</p>
                    <p>@mark</p>
                </div>
            </div>

            <img className={s.img} src="/images/image (13).svg" alt="" />
            <div className={s.questions}>

                <Questions/>
            </div>
    </div>
                
  )
}

export default ContactPage