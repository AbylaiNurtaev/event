import React, { useEffect, useState } from 'react'
import s from './GradingPage.module.sass'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'

function GradingPage() {

    const navigate = useNavigate()

    const id = localStorage.getItem("id")
    const [access, setAccess] = useState(false)
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
    }, [])

    useEffect(() => {

        const checkJoury = async () => {
            axios.post('/loginJoury', { id })
                .then(res => res.data)
                .then(data => {
                    if (data == 'success') {
                        setAccess(true)
                    }
                })
        }

        if (id) {
            checkJoury()
        } else {
            alert("Просим вас авторизоваться")
        }
    }, [])

    return (
        <>
            {
                access &&
                <div className={s.container}>
                    <div className={s.innerContainer}>
                        <div className={s.crumbs}>
                            <img src="/images/fluent_arrow-up-28-filled.svg" alt="" />
                            <p onClick={() => navigate('/')}>Вернуться назад</p>
                        </div>
                        <div className={s.about}>
                            <h1>номинанты</h1>
                            <div className={s.par}>Жюри WEDS — признанные эксперты свадебной индустрии. Их профессионализм и независимость гарантируют объективность и высокий уровень премии.</div>
                        </div>

                        <div className={s.boldText}>Правила голосования</div>
                        <div className={s.mainInformation}>
                            <div className={s.left}>
                            — Жюри рейтинга ежегодно формируется из числа лидеров свадебной и event индустрии, включая руководителей агентств и признанных экспертов среди ведущих, фотографов, видеографов, декораторов и стилистов. <br/><br/>

<b>— ПЕРВЫЙ ЭТАП</b> оценки осуществляется большим и executive жюри в онлайн формате.

<br/><br/><b>— ВТОРОЙ ЭТАП</b> — оффлайн встреча, на которой executive жюри утверждают первые 10 мест в каждой категории и номинации в категории Площадки. Рейтинг формируется исходя из медианного значения оценок жюри.

<br/><br/>— Жюри оценивают участников исходя из критерий <b>ПО 10-ТИ БАЛЬНОЙ ШКАЛЕ</b> (ниже указаны критерии и требования к каждой категории).
                            </div>
                            <div className={s.right}>
                            —  каждый член жюри оценивает не менее 100 номинантов. Агентствам для оценки доступны все участники, специалистов оценивают только свои категории (фотографы-только фотографов, видеографы-только видеографов)

<br/><br/>— Алгоритмы нашего сайта автоматически предлагают членам жюри оцениваютучастников <b>С НАИМЕНЬШИМ КОЛИЧЕСТВОМ ГОЛОСОВ.</b>

<br/><br/>— Если по каким-то причинам вы не можете профессионально оценить участника-вы имеете <b>ВОЗМОЖНОСТЬ ДОБРОВОЛЬНО ВОЗДЕРЖАТЬСЯ</b> от оценки и пропустить участника.

<br/><br/>— Голосование в этом году можно провести анонимно или открыто. В последнем случае ваше имя, оценки и комментарии будут предоставлены номинантам рейтинга.
                            </div>
                        </div>

                        <div className={s.categories}>
                            {/* <div className={s.category}>
                                <h3>КАТЕГОРИЯ: </h3>
                                
                                <select>
                                    <option selected value="ДЕКОРАТОРЫ">ДЕКОРАТОРЫ</option>
                                    <option value="ДЕКОРАТОРЫ">ДЕКОРАТОРЫ</option>
                                    <option value="ДЕКОРАТОРЫ">ДЕКОРАТОРЫ</option>
                                    <option value="ДЕКОРАТОРЫ">ДЕКОРАТОРЫ</option>
                                    <option value="ДЕКОРАТОРЫ">ДЕКОРАТОРЫ</option>
                                </select>
                            </div> */}
                            <div className={s.category}>
                                <h3>НОМИНАЦИЯ: </h3>
                                <select>
                                    <option selected value={s.ДЕКОРАТОРЫ}>Свадебный декоратор года</option>
                                    <option value="ДЕКОРАТОРЫ">ДЕКОРАТОРЫ</option>
                                    <option value="ДЕКОРАТОРЫ">ДЕКОРАТОРЫ</option>
                                    <option value="ДЕКОРАТОРЫ">ДЕКОРАТОРЫ</option>
                                    <option value="ДЕКОРАТОРЫ">ДЕКОРАТОРЫ</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default GradingPage