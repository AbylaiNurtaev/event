import React, { useEffect, useState } from 'react'
import s from './HomePage.module.sass'
import Joury from '../../components/Joury/Joury'
import Questions from '../../components/Questions/Questions'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'

import image from '../../Group 21.png'
function HomePage() {

    function isDateValid(selectedDate) {
        const today = new Date();
        const maxDate = new Date(today);
        
        // Установите максимальную дату (например, 7 дней с сегодняшнего дня)
        maxDate.setDate(today.getDate() + 7);
        
        // Приведем выбранную дату к объекту Date
        const selected = new Date(selectedDate);
        
        // Проверяем, является ли дата валидной
        if (selected < today || selected > maxDate) {
          return false; // Дата недействительна
        }
      
        return true; // Дата корректна
      }
      
      
        // sdadsads
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
    }, [])

    const navigate = useNavigate()
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
        <div className={s.innerContainer}>
            {/* <img src="/images/white-back.svg" className={s.light} alt="" /> */}
            <h1 className={s.title}>WEDS</h1>
            
            {/* <h1 className={s.redTitle}>НОВЫЕ ТРЕНДЫ</h1> */}

            <div className={s.mobileLines}>
                <img style={{width: "100%"}} src="/images/IMG (1).png" alt="" loading="lazy" />
            </div>


            <div className={s.buttons}>
                
                <button className={s.right} onClick={() => navigate('/application/new')}>УЧАСТВОВАТЬ<br className={s.mobileBR}/> В ПРЕМИИ - 2024</button>
                <button className={s.left}>БИЛЕТ НА ФОРУМ</button>
            </div>
        
            {/* <img className={s.images} src={image} alt="" /> */}
            {/* <div className={s.lines}>
                <img src="/images/Frame 121.svg" alt="" />
                <img src="/images/Frame 120.svg" alt="" />
            </div> */}


            <div className={s.infoBlock}>
                <div className={s.left}>
                    <div className={s.title}>О РЕЙТИНГЕ</div>
                    <p className={s.par}>Мы — независимая премия, объединяющая свадебных профессионалов и формирующая стандарты индустрии. <br/><br/><br/>
                    Победителем может стать любая компания или частное лицо, предлагающие качественные свадебные услуги. Жюри, состоящее из признанных экспертов свадебного бизнеса, ежегодно обновляется. Участие в премии — это престиж для любого свадебного профессионала!</p>
                    <button onClick={() => navigate('/about')}>ПОДРОБНЕЕ О РЕЙТНИГЕ</button>
                </div>
                <div className={s.right}>
                    <div className={s.title}>РАСПИСАНИЕ</div>
                    <div className={s.date}>{deadline.deadline} {deadline.month}</div>
                    <div className={s.subTitle}>ФОРУМ</div>
                    <p className={s.par}>г. Астана, улица Кабанбай Батыра, 1</p>
                    <div className={s.images}>
                        <img src="/images/Line 4 (1).svg" alt="" />
                        <img src="/images/—Pngtree—cute gold decoration ribbon_8438236 3 (1).svg" alt="" />
                    </div>
                    <img className={s.fetil} src="/images/Frame 23.svg" alt="" />
                    {
                        deadline &&
                    <div className={s.date1}>{deadline.deadline2} {deadline.month}</div>
                    }
                    <div className={s.subTitle}>ПРЕМИЯ</div>
                    <p className={s.par}>г. Астана, улица Кабанбай Батыра, 1</p>
                    <button>КУПИТЬ БИЛЕТ НА ЦЕРЕМОНИЮ</button>
                </div>
            </div>

            <img className={s.image} src="/images/image (4).svg" alt="" />


            {/* <div className={s.partners}>
                <h1 className={s.title}>ПАРТНЕРЫ</h1>
                <p className={s.par}>WEDS благодарит наших партнеров — лидеров свадебной индустрии, за поддержку и вклад в проведение ивента. Вместе мы создаем яркие и значимые события для всего сообщества.</p>
                

                <img className={s.row} src="/images/row.svg" alt="" />
                <div className={s.rowDiv}>
                    <img className={s.mobileRow} src="/images/row.svg" alt="" />
                </div>
                
            </div> */}
            

            <div className={s.joury}>
                <Joury></Joury>
            </div>

            <Questions></Questions>
        </div>
    </div>
  )
}

export default HomePage