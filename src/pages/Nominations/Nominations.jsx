import React, { useEffect } from 'react'
import s from './Nominations.module.sass'
import { useNavigate } from 'react-router-dom'
import Questions from '../../components/Questions/Questions'

function Nominations() {
    const navigate = useNavigate()

    const rowList = ["все", "Организация свадьбы", "Ведущие", "Программа", "Декор", "Фотография", "Видео", "Стиль", "Локации", "Special", "Национальная культура"]
    const blockList = [
        {
            title: 'Ведущие',
            list: ["Актуальность", "Профессиональные качества", "Уровень мероприятий", "Личный бренд"]
        },
        {
            title: 'Фотографы',
            list: ["Актуальность", "Профессиональные качества", "Уровень мероприятий", "Личный бренд"]
        },
        {
            title: 'Видеографы',
            list: ["Актуальность", "Профессиональные качества", "Уровень мероприятий", "Личный бренд"]
        },
        {
            title: 'Стилисты',
            list: ["Актуальность", "Профессиональные качества", "Уровень мероприятий", "Личный бренд"]
        },
        {
            title: 'Декораторы',
            list: ["Актуальность", "Профессиональные качества", "Уровень мероприятий", "Личный бренд"]
        },
        {
            title: 'Диджеи',
            list: ["Актуальность", "Профессиональные качества", "Уровень мероприятий", "Личный бренд"]
        },
        {
            title: 'Кавер-группы',
            list: ["Актуальность", "Профессиональные качества", "Уровень мероприятий", "Личный бренд"]
        },
        {
            title: 'Площадки',
            list: ["Актуальность", "Профессиональные качества", "Уровень мероприятий", "Личный бренд"]
        },
    ]

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
                <p>Номинации</p>
            </div>
            <div className={s.about}>
                <h1>Номинации</h1>
                <p>В разделе "Номинации" мы отмечаем выдающиеся достижения в различных категориях ивентов. Эти номинации помогают выделить лучших специалистов и подчеркнуть их вклад в развитие индустрии.</p>
            </div>
            <div className={s.criterion}>
                <div className={s.title}>КРИТЕРИЙ</div>
                <p className={s.par}>Критерии для участия в премии WEDS помогают нам объективно оценить достижения и уровень профессионализма в свадебной индустрии. Они разработаны, чтобы подчеркнуть ключевые качества и достижения, которые отличают лучших специалистов и компании. Эти критерии позволяют нам не только выбрать победителей, но и продемонстрировать высокие стандарты, к которым стремится вся индустрия.</p>
                <div className={s.row}>
                    {
                        rowList.map((elem) => <h5>{elem}</h5>)
                    }
                </div>

                <div className={s.blocks}>
                    {
                        blockList.map((elem) =>
                            <div className={s.block}>
                                <h4 className={s.title}>{elem.title}</h4>
                                <div className={s.list}>
                                    {
                                        elem.list.map((par) => <p className={s.par1}>- {par}</p>)
                                    }
                                </div>
                                <button>ПОДРОБНЕЕ</button>
                            </div>

                        )
                    }
                </div>
                </div>
                <div className={s.questions}>

                    <Questions/>
                </div>
    </div>
  )
}

export default Nominations