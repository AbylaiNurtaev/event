import React, { useEffect, useState } from 'react'
import s from './AboutPage.module.sass'
import { useNavigate } from 'react-router-dom'
import Questions from '../../components/Questions/Questions'
import Joury from '../../components/Joury/Joury'
import axios from '../../axios'

function AboutPage() {
    const rowList = ["все", "Организация свадьбы", "Ведущие", "Программа", "Декор", "Фотография", "Видео", "Стиль", "Локации", "Special", "Национальная культура"]
    const navigate = useNavigate()
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

    const peoples = [
        {
            name: "Арман и Аскар",
            par: "Elite Wedding Studio",
            img: "/images/jouries/jour-1.svg"
        },
        {
            name: "Анна Исаева",
            par: "Shine Bright Events",
            img: "/images/jouries/jour-2.svg"
        },
        {
            name: "Аяжан и Альмира",
            par: "Crystal Moments",
            img: "/images/jouries/jour-3.svg"
        },
        {
            name: "Марат Садыков",
            par: "Marsa Events",
            img: "/images/jouries/jour-4.svg"
        },
        {
            name: "Марьям Сыздыкова",
            par: "Glamour Events",
            img: "/images/jouries/image (2).svg"
        },
        {
            name: "Весь список жюри",
            par: "Еще 23",
            img: "/images/jouries/jour-6.svg"
        },
    ];

    const persons = [
        {
            name: "Айгерим Сулейменова",
            img: '/images/organizators/image (5).svg',
            par: "Координатор мероприятий"
        },
        {
            name: "Мадина Касымова",
            img: '/images/organizators/image (6).svg',
            par: "Руководитель по работе с партнерами"
        },
        {
            name: "Айгерим Сулейменова",
            img: '/images/organizators/image (7).svg',
            par: "PR-менеджер"
        },
        {
            name: "Айгерим Сулейменова",
            img: '/images/organizators/image (8).svg',
            par: "Дизайнер и арт-директор"
        },
        {
            name: "Айгерим Сулейменова",
            img: '/images/organizators/image (9).svg',
            par: "Технический директор"
        },
        {
            name: "Айгерим Сулейменова",
            img: '/images/organizators/image (10).svg',
            par: "Менеджер по работе с клиентами"
        },
        {
            name: "Айгерим Сулейменова",
            img: '/images/organizators/image (11).svg',
            par: "Специалист по маркетингу"
        },
        {
            name: "Айгерим Сулейменова",
            img: '/images/organizators/image (12).svg',
            par: "Куратор программы ивента"
        },
    ]

    const [position, setPosition] = useState(0); // Начальное состояние позиции

    const moveToRight = () => {
        setPosition(-550); // Устанавливаем смещение влево
    };

    const moveToLeft = () => {
        setPosition(0); // Сбрасываем смещение на начальное положение
    };

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
    }, [])

    const [deadline, setDeadline] = useState("")

    useEffect(() => {
        axios.get('/getDeadline')
        .then(res => res.data)
        .then(data => {
            
            setDeadline(data[data.length-1])
    })
    }, [])
    
    return (
        <div className={s.container}>
            <div className={s.crumbs}>
                <p onClick={() => navigate('/')}>Главная</p>
                <p>|</p>
                <p>О премии</p>
            </div>
            <div className={s.about}>
                <h1>О ПРЕМИИ</h1>
                <p>Национальный рейтинг свадебных профессионалов и площадок для мероприятий в Казахстане, который ежегодно формируется жюри из 100 ведущих экспертов индустрии.</p>
            </div>

            <div className={s.history}>
                <div className={s.left}>
                    <h1>ИСТОРИЯ</h1>
                    <p>WEDS создана в 2015 году и быстро стала ключевым событием в свадебной индустрии, привлекая сотни участников и поддерживаемая более 200 партнерами.</p>
                </div>

                <div className={s.right}>
                    <h1>ЦИФРЫ</h1>
                    <div className={s.blocks}>
                        <div className={s.block}>
                            <h1>2015</h1>
                            <p>Основание премии, начало новой эры в свадебной индустрии Казахстана.</p>
                        </div>
                        <div className={s.block}>
                            <h1>1 000+</h1>
                            <p>Награжденных профессионалов за годы существования премии.</p>
                        </div>
                        <div className={s.block}>
                            <h1>200+</h1>
                            <p>Партнеров и спонсоров, поддерживающих наши мероприятия.</p>
                        </div>
                        <div className={s.block}>
                            <h1>10 Лет</h1>
                            <p>Успешного проведения премии, устанавливающей стандарты качества.</p>
                        </div>

                    </div>
                </div>
            </div>


            <div className={s.goals}>
                <div className={s.title}>ЦЕЛИ И ЗАДАЧИ</div>
                <p className={s.par}>Основные цели и задачи WEDS — повышение стандартов свадебной индустрии, поддержка профессионалов и продвижение лучших практик через признание и награждение лучших в отрасли.</p>
                <div className={s.schedule}>Расписание</div>

                <div className={s.dates}>
                    <div className={s.date}>
                        {
                            deadline &&
                        <div className={s.title}>{deadline.deadline} {deadline.month}</div>
                        }
                        <div className={s.subTitle}>Форум</div>
                        <p>г. Астана, ул. Кабанбай Батыра, 1</p>
                    </div>
                    <img className={s.desktopArrow} src="/images/strelka.svg" alt="" />
                    <img className={s.mobileStrelka} src="/images/Line 4 (1).svg" alt="" />
                    <div className={s.date} style={{ marginLeft: "56px" }}>
                    {
                            deadline &&
                        <div className={s.title}>{deadline.deadline2} {deadline.month}</div>
                        }
                        <div className={s.subTitle}>ПРЕМИЯ</div>
                        <p>г. Астана, ул. Кабанбай Батыра, 1</p>
                    </div>
                </div>


            </div>

            <div className={s.redBlock}>
                <div className={s.title}>Преимущества премии</div>
                <p className={s.par}>Участие в премии предоставляет возможность получить признание в индустрии, привлечь внимание к вашему проекту и расширить деловые связи. Победители получат ценные призы и возможности для дальнейшего сотрудничества.</p>
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

                <div className={s.joury}>
                <Joury></Joury>
                </div>


                <div className={s.organizers}>
                    <h1 className={s.title}>ОРГАНИЗАТОРЫ</h1>
                    <div className={s.citation}>
                            <img src="/images/leftScobe.svg" alt="" />
                            <p>Мы, организаторы премии WEDS, с особым вниманием подходим к каждому аспекту этого значимого события. Наша задача — создать атмосферу, где лучшие представители свадебной индустрии смогут блеснуть своим мастерством. Мы гордимся тем, что каждый год делаем церемонию по-настоящему запоминающейся, отражающей престиж и важность премии для всех участников.</p>
                            <img src="/images/rightScobe.svg" alt="" />
                    </div>
                    <div className={s.mainPerson}>
                        <img src="/images/kanat.svg" alt="" />
                        <h5>КАНАТ АЯГАНОВ</h5>
                        <p>Организатор премии WEDS</p>
                    </div>
                    <div className={s.persons}>
                    {   
                        persons.map((elem) => 
                            <div className={s.person}>
                                <img src={elem.img} alt="" />
                                <h5>{elem.name}</h5>
                                <p>{elem.par}</p>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>



            <div className={s.partners}>
                <h1 className={s.title}>ПАРТНЕРЫ</h1>
                <p className={s.par}>WEDS благодарит наших партнеров — лидеров свадебной индустрии, за поддержку и вклад в проведение ивента. Вместе мы создаем яркие и значимые события для всего сообщества.</p>
                <img className={s.row} src="/images/row.svg" alt="" />
                <div className={s.rowDiv}>
                    <img className={s.rowMobile} src="/images/row.svg" alt="" />
                </div>
            </div>
            <div className={s.questions}>
            <Questions></Questions>
            </div>

        </div>
    )
}

export default AboutPage