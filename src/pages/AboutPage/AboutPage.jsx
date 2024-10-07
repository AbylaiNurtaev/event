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



    const [categories, setCategories] = useState(['Все']);
    const [nominations, setNominations] = useState([]); // стейт для всех номинаций
    const [filteredNominations, setFilteredNominations] = useState([]); // стейт для отфильтрованных номинаций
    const [selectedCategory, setSelectedCategory] = useState('Все'); // выбранная категория


    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        });

        // Получение всех номинаций с сервера
        axios.get('/nom')
            .then(res => {
                const data = res.data;
                
                // Извлечение уникальных категорий из полученных данных
                const uniqueCategories = [...new Set(data.map(item => item.category))];
                
                setCategories(prev => [...prev, ...uniqueCategories]); // добавляем категории в стейт
                setNominations(data); // сохраняем все номинации
                setFilteredNominations(data); // отображаем все номинации по умолчанию
            });

        // Сброс overflow при размонтировании
        return () => {
            document.body.style.overflowY = "scroll";
        }
    }, []);

    useEffect(() => {
        // Фильтрация номинаций по выбранной категории
        if (selectedCategory === 'Все') {
            setFilteredNominations(nominations);
        } else {
            setFilteredNominations(nominations.filter(nomination => nomination.category === selectedCategory));
        }
    }, [selectedCategory, nominations]);

    const [openedPopupIndex, setOpenedPopupIndex] = useState(null);

    const togglePopup = (index) => {
        document.body.style.overflowY = "hidden";
        if (openedPopupIndex === index) {
            setOpenedPopupIndex(null); // закрыть, если тот же элемент
        } else {
            setOpenedPopupIndex(index); // открыть попап для определенного элемента
        }
    };

    const closePopup = () => {
        document.body.style.overflowY = "scroll";
        setOpenedPopupIndex(null);
    };
    
    return (
        <div className={s.container}>
            <div className={s.crumbs}>
                <p onClick={() => navigate('/')}>Главная</p>
                <p>|</p>
                <p>О премии</p>
            </div>
            <div className={s.about}>
                <h1>О ПРЕМИИ</h1>
                <p>Национальный рейтинг специалистов свадебного рынка Казахстана, основанный на оценках 100 ведущих экспертов в свадьбах и традиционной казахской культуре.</p>
            </div>

            <div className={s.history}>
                <div className={s.left}>
                    <h1>ИСТОРИЯ</h1>
                    <p>В 2019 году мы создали TOP10Astana, а в 2023 году мы впервые провели премию Wedding Awards Kz - масштабное событие с мощной обратной связью. Мы пробовали разные форматы, совершали ошибки, делали выводы и совершенствовали формат.</p>
                </div>

                <div className={s.right}>
                    <h1>ЦИФРЫ</h1>
                    <div className={s.blocks}>
                        <div className={s.block}>
                            <h1>2023</h1>
                            <p>Основание премии, начало новой эры в свадебной индустрии Казахстана.</p>
                        </div>
                        <div className={s.block}>
                            <h1>38</h1>
                            <p>Количество награжденных номинаций</p>
                        </div>
                        <div className={s.block}>
                            <h1>170+</h1>
                            <p>Количество принятых участников:</p>
                        </div>
                        <div className={s.block}>
                            <h1>100+
                            </h1>
                            <p>Количество жюри:</p>
                        </div>

                    </div>
                </div>
            </div>


            <div className={s.goals}>
                <div className={s.title}>ЦЕЛИ И ЗАДАЧИ</div>
                <p className={s.par}>Будем честны: сейчас мы доросли до действительно независимой и уникальной премии. Мы творческие и самобытные, а значит идеальный рейтинг специалистов и идеальную премию можем создать только мы сами. И нам важно, чтобы нам доверяли не просто разнообразные специалисты со всего мира... Нам должны доверять наши клиенты. 
Поэтому в 2024 году мы создали WEDS - мощную инфраструктуру для развития свадебных специалистов, которая включает в себя РЕЙТИНГ WEDS, журнал о современных свадьбах в Казахстане WEDS MEDIA, образовательный проект WEDS FORUM и многое другое. И, конечно, Церемонию награждения победителей рейтинга WEDS.
</p>
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
                <p className={s.par}>Усовершенствованная система номинаций, подачи заявок, критериев и оценки, формирования итогового рейтинга WEDS.
Прозрачность: заявки участников и итоговые оценки будут опубликованы на портале WEDS,
Отдельное внимание посвящено блоку номинаций, связанных с национальной культурой и традициями,
Оценка работ участников разносторонними специалистами из Казахстана, СНГи зарубежных стран, а также эскпертами по национальной культуре и традициям. 
Меньше формальных требований, больше профессионализма жюри.
Открытость, большое количество обратной связи от участников и жюри, которую мы активно учитываем.
Эффективный нетворкинг и мотивация к росту.
</p>
            </div>

            <div className={s.criterion}>
                <div className={s.title}>КРИТЕРИЙ</div>
                <p className={s.par}>Критерии для участия в премии WEDS помогают нам объективно оценить достижения и уровень профессионализма в свадебной индустрии. Они разработаны, чтобы подчеркнуть ключевые качества и достижения, которые отличают лучших специалистов и компании. Эти критерии позволяют нам не только выбрать победителей, но и продемонстрировать высокие стандарты, к которым стремится вся индустрия.</p>
                <div className={s.row}>
                    {categories && categories.map((category) => (
                        <h5 
                            key={category} 
                            className={selectedCategory === category ? s.active : ''} 
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </h5>
                    ))}
                </div>

                <div className={s.blocks}>
                    {filteredNominations && filteredNominations.map((elem, index) => (
                        <div key={elem._id} className={s.block}>
                            <h4 className={s.title}>{elem.nomination}</h4>
                            <div className={s.list}>
                                {elem.information && elem.information.map((elem, i) => (
                                    <p key={i} className={s.par1}>- {elem.text}</p>
                                ))}
                            </div>
                            <button onClick={() => togglePopup(index)}>ПОДРОБНЕЕ</button>
                            {openedPopupIndex === index && <div className={s.shadow}></div>}
                            {openedPopupIndex === index && (
                                <div className={s.popup}>
                                    <div className={s.topSide}>
                                        <div className={s.title}>{elem.nomination[0]}</div>
                                        <div className={s.right}>
                                            <button onClick={() => navigate('/application/new')}>ПОДАТЬ ЗАЯВКУ</button>
                                            <img src="/images/Frame 3.svg" onClick={closePopup} alt="" />
                                        </div>
                                    </div>
                                    <div className={s.topMobileSide}>
                                        <div className={s.top}>
                                            <div className={s.title}>{elem.nomination[0]}</div>
                                            <img src="/images/Frame 3.svg" onClick={closePopup} alt="" />
                                        </div>
                                        <button onClick={() => navigate('/application/new')}>ПОДАТЬ ЗАЯВКУ</button>
                                    </div>
                                    <div className={s.mainSide}>
                                        <div className={s.title}>Критерии и оценки</div>
                                        <div className={s.information} style={{marginTop: '40px'}}>
                                            {elem.information && elem.information.map((item) => 
                                                <div>— {item.text} — {item.percentage}</div>

                                            )}
                                            <p className={s.par} style={{marginTop: '40px'}}>{elem.moreText}</p>
                                        </div>
                                        <div className={s.title}>Требования</div>
                                        <div className={s.should}>
                                            <div className={s.block}>
                                                <div className={s.bold}>Анкета</div>
                                                <div className={s.par}>О себе, опыт, агентства, заказчики. Рекомендуем заполнять все поля анкеты, но если оставить поле незаполненным - оно просто не будет отображаться на странице.</div>
                                            </div>
                                            <div className={s.block}>
                                                <div className={s.bold}>Портфолио</div>
                                                <div className={s.par}>Рекомендуем загрузить до 30 фотографий. Выбирайте актуальные и качественные кадры, личные имиджевые фотосессии, отчеты с мероприятий, в которых вы принимали участие.</div>
                                            </div>
                                            <div className={s.block}>
                                                <div className={s.bold}>Промо-ролик</div>
                                                <div className={s.par}>Видео в котором можно узнать о вас, оценить ваш уровень мастерства, подачу и личный бренд. Рекомендуем загружать ролик не более 3х минут</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
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