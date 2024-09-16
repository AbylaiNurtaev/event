import React, { useEffect, useState } from 'react'
import s from './CabinetPage.module.sass'
import Questions from '../../components/Questions/Questions'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'

function CabinetPage() {

    const { id } = useParams()

    const navigate = useNavigate()
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
        

        
        axios.post('/auth/getUser', { userId: id, type: "avatar" })
        .then(res => res.data)
        .then(data => {
            console.log("effect", data);
            
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', id)
            
            setJob(data.job || "")
            setName(data.name || "")
            setCompany(data.company || "")
            setAbout(data.about || "")
            setNomination(data.nomination || "")
            setInstagram(data.instagram || "")
            setVk(data.vk || "")
            setYoutube(data.youtube || "")
            setTiktok(data.tiktok || "")
            setEmail(data.email || "")
            setRole(data.role || "")
            setSrc(data.avatar || "")
        })
        

    }, [])

    const [company, setCompany] = useState("")
    const [name, setName] = useState("")
    const [nomination, setNomination] = useState("")
    const [job, setJob] = useState("")
    const [email, setEmail] = useState("")
    const [about, setAbout] = useState("")
    const [instagram, setInstagram] = useState("")
    const [vk, setVk] = useState("")
    const [youtube, setYoutube] = useState("")
    const [tiktok, setTiktok] = useState("")
    
    const [sended, setSended] = useState(false)
    const [role, setRole] = useState("")

    const [srcImg, setSrc] = useState()

    const [file, setFile] = useState()

    const handleChange = (e, func) => {
        func(e.target.value)
    } 

    const updateInfo = () => {
        setSended(true)
        if( company.length >= 1 &&
            name.length >= 1 &&
            nomination.length >= 1 &&
            job.length >= 1 &&
            about.length >= 1
         ){
            setSended(false)
             axios.post('/auth/updateInfo', {
                 userId: id,
                 company,
                 name,
                 nomination,
                 job,
                 about
             })
             .then(res => res.data)
             .then(data => {
                 if(data){
                     alert("Данные успешно отправлены")
                 }
             })
             .catch((err) => console.log(err.message))
         }
    }


    const updateSocialInfo = () => {
             axios.post('/auth/updateSocialInfo', {
                 userId: id,
                 instagram,
                 vk,
                 youtube,
                 tiktok,
             })
             .then(res => res.data)
             .then(data => {
                 if(data){
                     alert("Данные успешно отправлены")
                 }
             })
             .catch((err) => console.log(err.message))
         
    }

    const handleFileUpload = async(e) => {
        const file = e.target.files[0];
        setFile(file)  
        e.preventDefault()

        const formData = new FormData();
        formData.append("image", file)
        await axios.post(`/uploadAvatar/${id}`, formData, {headers: {
            'Content-Type': 'multipart/form-data'
        }})
        await axios.post("/auth/getUser", {userId: id})
        .then((res) => res.data)
        .then((data) => setSrc(data.avatar))
    }


    
  return (
    <div className={s.container}>
        <div className={s.innerContainer}>
            <div className={s.crumbs}>
                <img src="/images/fluent_arrow-up-28-filled.svg" alt="" />
                <p onClick={() => navigate('/')}>Вернуться назад</p>
            </div>  
            {/* Динамический Title должен быть  */}
            <div className={s.title}>{role && role == "joury" ? "ЖЮРИ" : "НОМИНАНТ"}</div>
            <div className={s.par}>Тут вы можете управлять своими данными и настройками.</div>
            {/* <button className={s.saveBtn}>СОХРАНИТЬ</button> */}

            <div className={s.boldText}>Основная информация</div>
            <div className={s.mainInformation}>
                <div className={s.block}>
                    <p>Название компании <span>*</span> {company.length <= 1 && sended && <span><br/>заполните обязательное поле *</span>}</p>
                    
                    <input value={company} onChange={(e) => handleChange(e, setCompany)} type="text" />
                </div>
                <div className={s.block}>
                    <p>Фотография <span>*</span></p>
                    <label htmlFor='file-upload'>
                        <img
                            src={srcImg ? srcImg : "/images/male-placeholder-image.jpeg"} alt="images"
                        />
                    </label>
                    <input type="file" id='file-upload' onChange={(e) => handleFileUpload(e)} accept='image/*' hidden={true} />   
                </div>
                <div className={s.block}>
                    <p>Ваши Имя и Фамилия: <span>*</span> {name.length <= 1 && sended && <span><br/>заполните обязательное поле *</span>}</p>
                    <input value={name} onChange={(e) => handleChange(e, setName)} type="text" />
                </div>
                <div className={s.block}>
                    <p>Номинация: <span>*</span> {nomination.length <= 1 && sended && <span><br/>заполните обязательное поле *</span>}</p>
                    <input value={nomination} type="text" onChange={(e) => handleChange(e, setNomination)} />
                </div>
                <div className={s.block}>
                    <p>Должность: <span>*</span> {job.length <= 1 && sended && <span><br/>заполните обязательное поле *</span>}</p>
                    <input value={job} type="text"  onChange={(e) => handleChange(e, setJob)}/>
                </div>
                <div className={s.block}>
                    <p>Ваши Email: <span>*</span></p>
                    <input type="text" value={email} disabled={true} onChange={(e) => handleChange(e, setEmail)} />
                </div>
                <div className={s.block}>
                    <p>О себе: <span>*</span> {about.length <= 1 && sended && <span><br/>заполните обязательное поле *</span>}</p>
                    <div className={s.saveBlock}>
                        <textarea value={about} onChange={(e) => handleChange(e, setAbout)}></textarea>
                        <button className={s.saveBtn} onClick={updateInfo}>СОХРАНИТЬ</button>

                    </div>
                </div>
            </div>

            <div className={s.boldText}>Ссылки на Социальные сети</div>

            <div className={s.socialMedias}>
                <div className={s.block}>
                    <p>Ссылка на Instagram: </p>
                    <input value={instagram} onChange={(e) => handleChange(e, setInstagram)} type="text" />
                </div>
                <div className={s.block}>
                    <p>Ссылка на Youtube: </p>
                    <input value={youtube} type="text" onChange={(e) => handleChange(e, setYoutube)} />
                </div>
                <div className={s.block}>
                    <p>Ссылка на VK: </p>
                    <input value={vk} type="text" onChange={(e) => handleChange(e, setVk)} />
                </div>
                <div className={s.block}>
                    <p>Ссылка на TikTok: </p>
                    <div className={s.saveBlock}>
                        <input value={tiktok} type="text" onChange={(e) => handleChange(e, setTiktok)} />
                    </div>
                </div>
                <button className={s.saveBtn} onClick={updateSocialInfo}>СОХРАНИТЬ</button>
            </div>
        </div>
            {
                role && role == "joury" && 
            <button className={s.jouryBtn} onClick={() => navigate('/grading')}>Голосование за номинантов</button>
            }

        <div className={s.questions}>
            <Questions></Questions>
        </div>
    </div>
  )
}

export default CabinetPage
