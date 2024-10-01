import React, { useEffect, useState } from 'react'
import s from './CabinetPage.module.sass'
import Questions from '../../components/Questions/Questions'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'
import InputMask from 'react-input-mask';

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
                localStorage.setItem('id', id)

                localStorage.setItem('token', data.token)


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
                setPhone(data.phone || "")
                setSait(data.sait || "")
                setCity(data.city || "")
                setAvatarSrc(data.avatar || '/images/male-placeholder-image.jpeg');
                setApplications(data.applications)
                console.log(data.portfolio)
                if(data.portfolio.length > 0){
                    setIsNew(false)
                    axios.post('/auth/getUser', { userId: id, type: "portfolio" })
                    .then(res => res.data)
                    .then(data => {
                        console.log("port", data.portfolio)
                        setSelectedFiles((prev) => [...prev, ...data.portfolio])
                    })
                }

            
            })

    }, [])

    const [company, setCompany] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState('')
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

    const [avatarSrc, setAvatarSrc] = useState(''); // URL для аватарки с сервера
    const [localFile, setLocalFile] = useState(null); // Для загруженного файла

    const [applications, setApplications] = useState()
    const [sait, setSait] = useState()
    const [city, setCity] = useState('');
    const [error, setError] = useState()

    const [isNew, setIsNew] = useState(true)
    const [localPortfolioFiles, setLocalPortfolioFiles] = useState([]);


    const cities = [
        'Нур-Султан',
        'Алматы',
        'Шымкент',
        'Караганда',
        'Актобе',
        'Тараз',
        'Павлодар',
        'Усть-Каменогорск',
        'Семей',
        'Костанай',
        'Атырау',
        'Кызылорда',
        'Актау',
        'Темиртау',
        'Уральск',
        'Петропавловск',
        'Экибастуз',
        'Туркестан',
        'Кокшетау',
        'Талдыкорган'
        // Добавьте другие города при необходимости
    ];


    const handleChange = (e, func) => {
        func(e.target.value)
    }

    const deletePortfolioImage = (fileIndex) => {
        setSelectedFiles((prevFiles) => 
            prevFiles.filter((_, idx) => idx !== fileIndex) // Убираем файл по индексу
        );
    };

    const updateInfo = async () => {
        setSended(true);
    
        if (
            company.length >= 1 &&
            name.length >= 1 &&
            nomination.length >= 1 &&
            job.length >= 1 &&
            about.length >= 1
        ) {
            // Создаем экземпляр FormData
            const formData = new FormData();
            formData.append('userId', id);
            formData.append('company', company);
            formData.append('name', name);
            formData.append('nomination', nomination);
            formData.append('job', job);
            formData.append('about', about);
            formData.append('phone', phone);
            formData.append('sait', sait);
            formData.append('city', city);
    
            // Добавляем каждый файл в FormData
            selectedFiles.forEach((file) => {
                formData.append('portfolio', file); // Здесь используем 'portfolio' как имя поля
            });
            
            localPortfolioFiles.forEach((file) => {
                formData.append('portfolio', file); // Здесь используем 'portfolio' как имя поля
            });
    
            try {
                const response = await axios.post('/auth/updateInfo', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Указываем, что это форма с файлами
                    }
                });
                alert("Данные успешно отправлены");
                console.log("Response data:", response.data);
            } catch (err) {
                console.error("Ошибка во время запроса:", err.message);
            } finally {
                setSended(false); // Сбрасываем состояние после запроса
            }
        } else {
            alert("Пожалуйста, заполните все обязательные поля.");
            setSended(false); // Сбрасываем состояние если не все поля заполнены
        }
    };
    
    
    
    


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
                if (data) {
                    alert("Данные успешно отправлены")
                }
            })
            .catch((err) => console.log(err.message))

    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setLocalFile(file); // Сохраняем локальный файл для отображения предпросмотра

        // Отправка файла на сервер
        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', 'avatar');

        axios.post(`/uploadFile/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => {
                // Вы можете добавить логику успешной загрузки
            })
            .catch(err => console.log(err.message));
    };

    const [selectedFiles, setSelectedFiles] = useState([]);


    const handleFileSelection = (e, id) => {
        
        
        const files = Array.from(e.target.files);

        const validFiles = files.filter((file) => {
            const isValidSize = file.size <= 2 * 1024 * 1024; // Размер файла не более 2MB
            const isValidType = ['image/jpeg', 'image/png'].includes(file.type); // Только .png и .jpg
            return isValidSize && isValidType;
        });
        
        // Ограничение на количество файлов
        if (validFiles.length + selectedFiles?.length > 50) {
            setError('Вы не можете загрузить более 50 файлов.');
            return;
        }
        setLocalPortfolioFiles((prevFiles) => [...prevFiles, ...validFiles.map(file => URL.createObjectURL(file))]); 

        // Обновляем проект с нужным индексом
        // setSelectedFiles((prevFiles) => {
        //     return [...prevFiles, ...validFiles]; // Добавляем новые файлы к предыдущему списку файлов
        // });
        
        
        setError('');
    };


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
                        <p>Название компании <span>*</span> {company.length <= 1 && sended && <span><br />заполните обязательное поле *</span>}</p>

                        <input value={company} onChange={(e) => handleChange(e, setCompany)} type="text" />
                    </div>
                    <div className={s.block}>
                        <p>Фотография <span>*</span></p>
                        <label htmlFor='file-upload'>
                            <img
                                src={localFile ? URL.createObjectURL(localFile) : avatarSrc} // Локальный файл или серверный URL
                                alt="Avatar"
                            />
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            onChange={handleFileUpload}
                            accept="image/*"
                            hidden={true}
                        />
                    </div>
                    <div className={s.block}>
                        <p>Ваши Имя и Фамилия: <span>*</span> {name.length <= 1 && sended && <span><br />заполните обязательное поле *</span>}</p>
                        <input value={name} onChange={(e) => handleChange(e, setName)} type="text" />
                    </div>
                    <div className={s.block}>
                        <p>Номинация: <span>*</span> {nomination.length <= 1 && sended && <span><br />заполните обязательное поле *</span>}</p>
                        <input value={nomination} type="text" onChange={(e) => handleChange(e, setNomination)} />
                    </div>
                    <div className={s.block}>
                        <p>Должность: <span>*</span> {job.length <= 1 && sended && <span><br />заполните обязательное поле *</span>}</p>
                        <input value={job} type="text" onChange={(e) => handleChange(e, setJob)} />
                    </div>
                    <div className={s.block}>
                        <p>Ваш Сайт: <span>*</span></p>
                        <input type="text" value={sait} onChange={(e) => handleChange(e, setSait)} />
                    </div>
                    <div className={s.block}>
                        <p>Ваш номер телефона: <span>*</span></p>
                        <InputMask
                            mask="+7 (999) 999-99-99"
                            value={phone}
                            onChange={(e) => handleChange(e, setPhone)}
                            placeholder="+7 (___) ___-__-__"
                            alwaysShowMask={false}
                            className={s.block}
                        >
                            {(inputProps) => <input {...inputProps} type="tel" />}
                        </InputMask>
                    </div>

                    <div className={s.block}>
                        <p>Выберите город: <span>*</span></p>
                        <select id="city-select" value={city} onChange={(e) => handleChange(e, setCity)}>
                            <option value="">Выберите...</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={s.block}>
                        <p>Ваш Email: <span>*</span></p>
                        <input type="text" value={email} disabled={true} onChange={(e) => handleChange(e, setEmail)} />
                    </div>
                    {
                        role && role == "joury" &&
                    <div className={s.block} style={{width: '100%', flexDirection: 'column'}}>
                    <label className={s.photosBlock} htmlFor="portfolio">
                            <div className={s.boldText}>ФОТОГРАФИИ ПРОЕКТОВ</div>
                            <input type="file" hidden={true} multiple id='portfolio' onChange={(e) => handleFileSelection(e, 0)} accept=".png, .jpg" />
                            <div className={s.inputBlock}>
                                <p>Перетащите или нажмите для загрузки фото</p>
                                <p>Ограничение не более 50 файлов весом по 2 MB (.png, .jpg)</p>
                            </div>

                        </label>
                        <div className={s.previewBlock}>
                            {localPortfolioFiles && localPortfolioFiles.map((file, index) => {
                                // Определяем индекс строки
                                const rowIndex = Math.floor(index / 7);
                                // Определяем позицию внутри строки
                                const positionInRow = index % 7;

                                // Логика для определения классов
                                const className =
                                    positionInRow < 4
                                        ? s.small // Первые 4 изображения в каждой строке
                                        : s.large; // Последние 3 изображения в каждой строке

                                return (
                                    <div key={index} className={className}>
                                        <img src={isNew ? URL.createObjectURL(file) : file} alt="preview" className={s.previewImage} />
                                        <img onClick={() => deletePortfolioImage(index)} className={s.closeBtn} src="/images/closeBtn.svg" alt="" />
                                    </div>
                                );
                                // 1 - вариант: Создать внутри User поле для жюри куда буду закидываться фотки и сделать гет запрос отдельный в index js
                                // 2 - вариант: Закидывать портфолио как на апликейшн и пользоваться этими функциями готовыми
                            })}
                            {selectedFiles && selectedFiles.map((file, index) => {
                                // Определяем индекс строки
                                const rowIndex = Math.floor(index / 7);
                                // Определяем позицию внутри строки
                                const positionInRow = index % 7;

                                // Логика для определения классов
                                const className =
                                    positionInRow < 4
                                        ? s.small // Первые 4 изображения в каждой строке
                                        : s.large; // Последние 3 изображения в каждой строке

                                return (
                                    <div key={index} className={className}>
                                        <img src={isNew ? URL.createObjectURL(file) : file} alt="preview" className={s.previewImage} />
                                        <img onClick={() => deletePortfolioImage(index)} className={s.closeBtn} src="/images/closeBtn.svg" alt="" />
                                    </div>
                                );

                            })}
                        </div>
                    </div>
                    }
                    <div className={s.block}>
                        <p>О себе: <span>*</span> {about.length <= 1 && sended && <span><br />заполните обязательное поле *</span>}</p>
                        
                        <div className={s.saveBlock}>
                            <textarea value={about} onChange={(e) => handleChange(e, setAbout)}></textarea>
                            <button className={s.saveBtn} onClick={updateInfo}>СОХРАНИТЬ</button>
                            <button className={s.exitBtn} onClick={() => { localStorage.clear(); navigate('/'); window.location.reload(); }}>Выйти</button>

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

                    <div className={s.boldText}>Поданные заявки</div>
                    <div className={s.applications}>
                        {
                            applications && applications.map((elem) =>
                                <div className={s.application}>
                                    <p className={s.nom}>Номинация: {elem.application_data.nomination ? elem.application_data.nomination : ""}</p>
                                    <p className={s.spec}>{elem.application_data.specialization ? elem.application_data.specialization : ""}</p>
                                    <button onClick={() => navigate(`/application/${elem.application_id}`)}>Изменить</button>
                                </div>
                            )
                        }
                    </div>
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
