import React, { useState } from 'react';
import s from './Joury.module.sass';

function Joury() {
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

    const [position, setPosition] = useState(0); // Начальное состояние позиции

    const moveToRight = () => {
        setPosition(-550); // Устанавливаем смещение влево
    };

    const moveToLeft = () => {
        setPosition(0); // Сбрасываем смещение на начальное положение
    };

    return (
        <div className={s.joury}>
            <h1 className={s.title}>ЖЮРИ</h1>
            <p className={s.par}>Жюри WEDS — признанные эксперты свадебной индустрии. Их профессионализм и независимость гарантируют объективность и высокий уровень премии.</p>
            <div className={s.buttons}>
                <img className={s.leftBtn} onClick={moveToLeft} style={position === 0 ? { opacity: 0.3 } : {}} src="/images/Frame 2.svg" alt="" />
                <img className={s.rightBtn} onClick={moveToRight} style={position !== 0 ? { opacity: 0.3 } : {}} src="/images/Frame 2.svg" alt="" />
            </div>

            <div className={s.peoples} style={{ transform: `translateX(${position}px)` }} id="peoples">
                {
                    peoples.map((elem, index) => (
                        <div key={index} className={s.block}>
                            <img src={elem.img} alt="" />
                            <h4>{elem.name}</h4>
                            <p>{elem.par}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Joury;
