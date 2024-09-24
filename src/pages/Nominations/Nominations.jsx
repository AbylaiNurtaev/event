import React, { useEffect, useState } from 'react';
import s from './Nominations.module.sass';
import { useNavigate } from 'react-router-dom';
import Questions from '../../components/Questions/Questions';
import axios from '../../axios';

function Nominations() {
    const navigate = useNavigate();

    // Стейт для списка категорий
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
                <p>Номинации</p>
            </div>
            <div className={s.about}>
                <h1>Номинации</h1>
                <p>В разделе "Номинации" мы отмечаем выдающиеся достижения в различных категориях ивентов. Эти номинации помогают выделить лучших специалистов и подчеркнуть их вклад в развитие индустрии.</p>
            </div>
            <div className={s.criterion}>
                <div className={s.title}>КРИТЕРИЙ</div>
                <p className={s.par}>Критерии для участия в премии WEDS помогают нам объективно оценить достижения и уровень профессионализма в свадебной индустрии...</p>
                
                {/* Отображение категорий */}
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

                {/* Отображение номинаций */}
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
            </div>
            <div className={s.questions}>
                <Questions />
            </div>
        </div>
    );
}

export default Nominations;
