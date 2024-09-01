import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './JouryPage.module.sass'

import Questions from '../../components/Questions/Questions'

function JouryPage() {
    const navigate = useNavigate()
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
        
    ];
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
                <p>Жюри</p>
            </div>
            <div className={s.about}>
                <h1>Жюри премии</h1>
                <div className={s.selectBlock}>
                <h3>КАТЕГОРИЯ: </h3>
                <select>
                    <option value="Декораторы">ДЕКОРАТОРЫ</option>
                    <option value="Декораторы">ДЕКОРАТОРЫ</option>
                    <option value="Декораторы">ДЕКОРАТОРЫ</option>
                    <option value="Декораторы">ДЕКОРАТОРЫ</option>
                </select>

                </div>
                <p className={s.par}>Жюри WEDS — признанные эксперты свадебной индустрии. Их профессионализм и независимость гарантируют объективность и высокий уровень премии.</p>
            </div>

            <div className={s.peoples} id="peoples">
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
            
            <div className={s.questions}>
                <Questions></Questions>
            </div>
    </div>
  )
}

export default JouryPage