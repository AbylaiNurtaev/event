import React, { useEffect, useState } from 'react'
import s from './OpenedJoury.module.sass'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'

function OpenedJoury() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [user, setUser] = useState()

    console.log(id)
    useEffect(() => {
        axios.post('/auth/getAllInfoPerson', { userId: id })
        .then((res) => res.data)
        .then(data => {
            console.log(data)
            setUser(data)
        })
    }, [id])    

  return (
    <div className={s.container}>
         <div className={s.innerContainer}>
            <div className={s.top}>
                <div className={s.crumbs}>
                    <img src="/images/fluent_arrow-up-28-filled.svg" alt="" />
                    <p onClick={() => navigate('/joury')}>Вернуться к жюри</p>
                </div>  
                {/* <button>Баланс 0 тг.</button> */}
            </div>

            {
                user &&
                <div className={s.mainSide}>
                    <div className={s.left}>
                        <div className={s.title}>{user.name}</div>
                        <div className={s.nomination}>{user.nomination}</div>
                        <p className={s.soc}>Соцсети:</p>
                        {
                            user.instagram && 
                            <p className={s.socialMedia} onClick={() => window.location.href = user.instagram}>Instagram</p>
                        }
                        {
                            user.vk && 
                            <p className={s.socialMedia} onClick={() => window.location.href = user.vk}>Vk</p>
                        }
                        {
                            user.youtube && 
                            <p className={s.socialMedia} onClick={() => window.location.href = user.youtube}>Youtube</p>
                        }
                        {
                            user.tiktok && 
                            <p className={s.socialMedia} onClick={() => window.location.href = user.tiktok}>Tiktok</p>
                        }
                        <div className={s.about}>{user.about}</div>
                    </div>
                    <div className={s.right}>
                        <img src={user.avatar} alt="" />
                    </div>
                </div>
            }

            {
                user && 
                <div className={s.projectsSide}>
                    <div className={s.title}>ПРОЕКТЫ</div>
                </div>
            }
         </div>
    </div>
  )
}

export default OpenedJoury