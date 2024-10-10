import React, { useEffect, useState } from 'react'
import s from './OpenedJoury.module.sass'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'

function OpenedJoury() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [user, setUser] = useState()
    const [showAllPhotos, setShowAllPhotos] = useState(false) // State to toggle photo visibility

    useEffect(() => {
        axios.post('/auth/getAllInfoPerson', { userId: id })
            .then((res) => res.data)
            .then(data => {
                setUser(data)
            })
    }, [id])

    const handleImageClick = () => {
        setShowAllPhotos(true) // Show all photos when the fourth image is clicked
    }

    return (
        <div className={s.container}>
            <div className={s.innerContainer}>
                <div className={s.top}>
                    <div className={s.crumbs}>
                        <img src="/images/fluent_arrow-up-28-filled.svg" alt="" />
                        <p onClick={() => navigate('/joury')}>Вернуться к жюри</p>
                    </div>
                </div>

                {user && (
                    <div className={s.mainSide}>
                        <div className={s.left}>
                            <div className={s.title}>{user.name}</div>
                            {/* <div className={s.nomination}>{user.nomination}</div> */}
                            <p className={s.soc}>Соцсети:</p>
                            {user.instagram && (
                                <p className={s.socialMedia} onClick={() => window.location.href = user.instagram}>Социальная сеть 1</p>
                            )}
                            {user.vk && (
                                <p className={s.socialMedia} onClick={() => window.location.href = user.vk}>Социальная сеть 2</p>
                            )}
                            {user.youtube && (
                                <p className={s.socialMedia} onClick={() => window.location.href = user.youtube}>Социальная сеть 3</p>
                            )}
                            {user.tiktok && (
                                <p className={s.socialMedia} onClick={() => window.location.href = user.tiktok}>Социальная сеть 4</p>
                            )}
                            <div className={s.about}>{user.about}</div>
                        </div>
                        <div className={s.right}>
                            <img src={user.avatar} alt="" />
                        </div>
                    </div>
                )}

                {user && (
                    <div className={s.projectsSide}>
                        {
                            user.portfolio && user.portfolio.length >= 1 &&
                            
                            <div className={s.title}>ПРОЕКТЫ</div>
                        }
                        <div className={s.projects}>
                            {!showAllPhotos && user.portfolio && user.portfolio.slice(0, 4).map((elem, index) => (
                                <div key={index} className={s.projectImageWrapper}>
                                    <img 
                                        src={elem} 
                                        alt="project" 
                                        className={index === 3 ? s.lastImage : ''} 
                                        onClick={index === 3 ? handleImageClick : undefined} // Attach click handler
                                    />
                                    {index === 3 && user.portfolio.length > 4 && (
                                        <div className={s.overlay} onClick={handleImageClick}>
                                            <span className={s.overlayText}>+{user.portfolio.length - 4} фото</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {showAllPhotos && user.portfolio && (
                            <div className={s.projects}>
                                {user.portfolio.map((elem, index) => (
                                    <img key={index} src={elem} alt={`project ${index}`} className={s.fullImage} />
                                ))}
                                {/* <button className={s.closeButton} onClick={() => setShowAllPhotos(false)}>Закрыть</button> */}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OpenedJoury;
