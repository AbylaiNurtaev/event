import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './JouryPage.module.sass'

import Questions from '../../components/Questions/Questions'
import axios from '../../axios'

function JouryPage() {
    const navigate = useNavigate()
        const [peoples, setPeoples] = useState();
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
        axios.get('/getJouriesWithAvatars')
        .then(res => res.data)
        .then(data => {
          if (data) {
            setPeoples(data);
          }
        });
        
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
                {/* <h3>КАТЕГОРИЯ: </h3>
                {/* <select>
                    <option value="Декораторы">ДЕКОРАТОРЫ</option>
                    <option value="Декораторы">ДЕКОРАТОРЫ</option>
                    <option value="Декораторы">ДЕКОРАТОРЫ</option>
                    <option value="Декораторы">ДЕКОРАТОРЫ</option>
                </select> */} 

                </div>
                <p className={s.par}>Жюри WEDS — признанные эксперты свадебной индустрии. Их профессионализм и независимость гарантируют объективность и высокий уровень премии.</p>
            </div>

            <div className={s.peoples} id="peoples">
                {   
                peoples &&
                    peoples.map((elem, index) => (
                        <div key={index} className={s.block} onClick={() => navigate(`/joury/${elem._id}`)}>
                            <img src={elem.avatarUrl} alt="" />
                            <h4>{elem.name}</h4>
                            <p>{elem.specialization}</p>
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