import React, { useEffect, useState } from 'react';
import s from './ApplicationPage.module.sass';
import { useNavigate } from 'react-router-dom';
import Questions from '../../components/Questions/Questions';
import axios from '../../axios'
import BalancePopup from '../../components/BalancePopup/BalancePopup';

function ApplicationPage() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        });

        axios.get('/nom')
            .then((res) => res.data)
            .then(data => {
                setNominationsSettings(data)
                const uniqueCategories = [...new Set(data.map(item => item.nomination[0]))];
                setNominations(uniqueCategories);
            })

    }, []);

    const [nominations, setNominations] = useState()
    const [nominationsSettings, setNominationsSettings] = useState()

    // Состояния для всех полей формы
    const [nomination, setNomination] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [fullName, setFullName] = useState('');
    const [city, setCity] = useState('');
    const [logo, setLogo] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [website, setWebsite] = useState('');
    const [phone, setPhone] = useState('');
    const [about, setAbout] = useState('');
    const [awards, setAwards] = useState('');
    const [service, setService] = useState('');
    const [instagram, setInstagram] = useState('');
    const [youtube, setYoutube] = useState('');
    const [vk, setVk] = useState('');
    const [tiktok, setTiktok] = useState('');

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [error, setError] = useState('');
    const [videos, setVideos] = useState([]);
    const [previews, setPreviews] = useState([])

    const [checkbox, setCheckBox] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [documents, setDocuments] = useState([])

    const application_id = Date.now()
    const [info, setInfo] = useState()
    const [inputIdx, setInputIdx] = useState(1)

    const deleteVideo = (indexToRemove) => {
        // Создаем новый массив, исключая элемент с индексом indexToRemove
        const newArray = videos.filter((_, index) => index !== indexToRemove);
        setVideos(newArray);
        const newArrayPreview = previews.filter((_, index) => index !== indexToRemove);
        setPreviews(newArrayPreview);
    };

    const handleChange = (e, setter) => {
        setter(e.target.value);
    };

    useEffect(() => {
        if (nominationsSettings) {
            const currentNomination = nominationsSettings.find((elem) => elem.nomination[0].toLowerCase() == nomination.toLowerCase())
            setInfo(currentNomination)
        }
    }, [nomination])

    const handleChangeVideos = (e, idx) => {
        const value = e.target.value;
        const updatedTitles = [...videos];  // Создаем новый массив
        updatedTitles[idx] = value;  // Обновляем нужный элемент
        setVideos(updatedTitles);  // Обновляем состояние
    }

    const handleFileUpload = async (e, setter, type) => {
        setter('/images/loadingGif.gif')
        const id = localStorage.getItem('id');
        if (id) {
            const file = e.target.files[0];
            e.preventDefault();

            const formData = new FormData();
            formData.append("image", file);
            formData.append("type", type); // Указываем тип (avatar или logo)

            await axios.post(`/uploadFile/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            await axios.post("/auth/getUser", { userId: id, type })
                .then((res) => res.data)
                .then((data) => {
                    console.log(data);
                    setter(type == "avatar" ? data.avatar : data.logo); // Устанавливаем аватар или логотип
                });
        } else {
            alert("Просим вас авторизоваться");
        }
    };


    const handleFileSelection = (e, id) => {

        
        const files = Array.from(e.target.files);
        let index = id
        console.log(id)
        if (id !== 0) {
            const str = id;
            const matchedNumber = str.match(/\d+/); // находим число
            index = matchedNumber ? parseInt(matchedNumber[0], 10) + 1 : 0; // преобразуем в число и увеличиваем на 1
            console.log(index); // выводим результат
        }
        // Ограничиваем количество файлов и их размер
        const validFiles = files.filter((file) => {
            const isValidSize = file.size <= 2 * 1024 * 1024; // Размер файла не более 2MB
            const isValidType = ['image/jpeg', 'image/png'].includes(file.type); // Только .png и .jpg
            return isValidSize && isValidType;
        });
    
        // Ограничение на количество файлов
        if (validFiles.length + selectedFiles[index]?.length > 50) {
            setError('Вы не можете загрузить более 50 файлов.');
            return;
        }
    
        // Обновляем проект с нужным индексом
        setSelectedFiles((prevFiles) => {
            const updatedFiles = [...prevFiles]; // Копируем старый массив проектов
            updatedFiles[index] = [...(updatedFiles[index] || []), ...validFiles]; // Добавляем файлы в нужный проект
            return updatedFiles;
        });
    
        setError('');
    };
    
    

    // Функция для отправки файлов на сервер
    const handleSubmit = async () => {
        const id = localStorage.getItem('id')

        if (selectedFiles.length === 0) {
            setError('Пожалуйста, выберите хотя бы один файл.');
            return;
        }

        const formData = new FormData();
        
        selectedFiles.forEach((file) => {
            for(let i = 0; i < file.length; i++){
                formData.append('images', file[i])
            }
        }); // Добавляем файлы в FormData
        formData.append("application_id", application_id)
        try {
            const response = await axios.post(`/api/uploadPortfolio/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Файлы успешно загружены:', response.data);
        } catch (error) {
            console.error('Ошибка загрузки файлов:', error);
        }
    };


    const handleSubmitDocuments = async () => {
        const id = localStorage.getItem('id')

        if (documents.length > 0) {
            const formData = new FormData();
            documents.forEach((file) => formData.append('documents', file)); // Добавляем файлы в FormData
            formData.append("application_id", application_id)
            try {
                const response = await axios.post(`/api/uploadDocuments/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Файлы успешно загружены:', response.data);
            } catch (error) {
                console.error('Ошибка загрузки файлов:', error);
            }
        }

    };




    const handlePreviewSelection = (e) => {
        setPreviews((prevFiles) => [...prevFiles, e.target.files[0]]); // Добавляем новые файлы к списку
    };

    // Функция для отправки файлов на сервер
    const handleSubmitPreview = async () => {

        const id = localStorage.getItem('id')

        const formData = new FormData();
        previews.forEach((file) => formData.append('images', file)); // Добавляем файлы в FormData
        formData.append("application_id", application_id)
        try {
            const response = await axios.post(`/api/uploadPreview/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Файлы успешно загружены:', response.data);
        } catch (error) {
            console.error('Ошибка загрузки файлов:', error);
        }
    };

    const handleCheckBox = (e) => {
        setCheckBox((prev) => !prev)
    }

    const handleDocumentChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (documents.length + selectedFiles.length > 10) {
            alert("Вы можете загрузить не более 10 файлов.");
            return;
        }

        setDocuments((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const handleDocumentRemove = (index) => {
        setDocuments((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const [additionalFields, setAdditionalFields] = useState([])

    const addAdditionalField = () => {
        setAdditionalFields(prev => [...prev, ''])
        setInputIdx(prev => prev + 1)
    }   



    const SENDINFORMATION = async () => {
        const id = localStorage.getItem('id');
        let imagesCount = []
        for (let i = 0; i < selectedFiles.length; i++){
            imagesCount.push(selectedFiles[i].length)
        }
        console.log(selectedFiles)
        if (checkbox) {
            setDisabled(true)
            await handleSubmit()
            await handleSubmitPreview()
            await handleSubmitDocuments()


            await axios.post('/createApplication', {
                application: {
                    nomination,
                    specialization,
                    fullName,
                    city,
                    logo,
                    photo,
                    website,
                    phone,
                    about,
                    awards,
                    service,
                    instagram,
                    youtube,
                    tiktok,
                    vk,
                    videos,
                    info,
                    imagesCount
                    // portfolio: selectedFiles
                }, application_id: `${application_id}`, id: id
            })
                .then((res) => {
                    alert("Ваша заявка успешно отправлена")
                    setDisabled(false)
                })
        }
        else {
            alert("Подтвердите своё согласие на публикацию")
        }
    }

    const [popUp, setPopup] = useState(true)

    const deletePortfolioImage = (projectIndex, fileIndex) => {
        setSelectedFiles((prevFiles) => 
            prevFiles.map((project, idx) => {
                if (idx === projectIndex) {
                    // Убираем файл по индексу из проекта
                    return project.filter((file, fIdx) => fIdx !== fileIndex);
                }
                return project; // Оставляем остальные проекты без изменений
            })
        );
    };
    

    const handleFieldChange = (index, e) => {
        const updatedFields = [...info.fields]; // Create a copy of the fields array
        updatedFields[index] = {
            ...updatedFields[index], // Spread existing properties
            value: e.target.value // Update the value property
        };
        setInfo({ ...info, fields: updatedFields }); // Update state with the new fields array
        console.log(info); // Log updated info for debugging
    };

    const handleAddFieldChange = (index, e) => {
        const updatedFields = [...info.additionalFields]; // Create a copy of the fields array
        updatedFields[index] = {
            ...updatedFields[index], // Spread existing properties
            value: e.target.value // Update the value property
        };
        setInfo({ ...info, additionalFields: updatedFields }); // Update state with the new fields array
        console.log(info); // Log updated info for debugging
    };
    
    return (
        <div className={s.container}>
            <div className={s.innerContainer}>
                <div className={s.crumbs}>
                    <img src="/images/fluent_arrow-up-28-filled.svg" alt="" />
                    <p onClick={() => navigate('/')}>Вернуться назад</p>
                </div>

                <div className={s.title}>Заявка на участие</div>
                <div className={s.par}>Вы сможете отредактировать текущую заявку позже до наступления дедлайна.</div>
                <div className={s.boldText}>Основная информация</div>

                <div className={s.mainInformation}>
                    <div className={s.block}>
                        <p>Номинация <span>*</span> {false && <span><br />заполните обязательное поле *</span>}</p>
                        <div className={s.selectWrapper}>
                            {
                                nominations &&
                                <select value={nomination} onChange={(e) => handleChange(e, setNomination)}>
                                    {
                                        nominations.map((elem) =>
                                            <option value={elem}>{elem}</option>
                                        )
                                    }
                                </select>
                            }
                        </div>
                    </div>
                    <div className={s.block}>
                        <p>Ваша специализация: <span>*</span> {false && <span><br />заполните обязательное поле *</span>}</p>
                        <div className={s.selectWrapper}>
                            <select value={specialization} onChange={(e) => handleChange(e, setSpecialization)}>
                                <option value="Декоратор">Декоратор</option>
                                <option value="Стиль">Стиль</option>
                                <option value="Узату той года">Узату той года</option>
                                <option value="Фото года">Фото года</option>
                                <option value="Стиль">Свадебный фотограф года</option>
                                <option value="Локации">Локации</option>
                            </select>
                        </div>
                    </div>
                    <div className={s.block}>
                        <p>Ваши Имя и Фамилия: <span>*</span> {false && <span><br />заполните обязательное поле *</span>}</p>
                        <input type="text" value={fullName} onChange={(e) => handleChange(e, setFullName)} />
                    </div>
                    <div className={s.block}>
                        <p>Город: <span>*</span> {false && <span><br />заполните обязательное поле *</span>}</p>
                        <input type="text" value={city} onChange={(e) => handleChange(e, setCity)} />
                    </div>
                    <div className={s.block}>
                        <p>Логотип: <span>*</span> {false && <span><br />заполните обязательное поле *</span>}</p>
                        <label htmlFor='logo-upload'>
                            <img
                                src={logo ? logo : "/images/male-placeholder-image.jpeg"} alt="images"
                            />
                        </label>
                        <input type="file" id='logo-upload' accept='image/*' hidden={true} onChange={(e) => handleFileUpload(e, setLogo, 'logo')} />
                    </div>
                    <div className={s.block}>
                        <p>Ваше фото: <span>*</span> {false && <span><br />заполните обязательное поле *</span>}</p>
                        <label htmlFor='photo-upload'>
                            <img
                                src={photo ? photo : "/images/male-placeholder-image.jpeg"} alt="images"
                            />
                        </label>
                        <input type="file" id='photo-upload' accept='image/*' hidden={true} onChange={(e) => handleFileUpload(e, setPhoto, 'avatar')} />
                    </div>
                    <div className={s.block}>
                        <p>Сайт: <span>*</span> {false && <span><br />заполните обязательное поле *</span>}</p>
                        <input type="text" value={website} onChange={(e) => handleChange(e, setWebsite)} />
                    </div>
                    <div className={s.block}>
                        <p>Номер телефона: <span>*</span> {false && <span><br />заполните обязательное поле *</span>}</p>
                        <input type="text" value={phone} onChange={(e) => handleChange(e, setPhone)} />
                    </div>
                    <div className={s.block}>
                        <p>о салоне/мастере: <span>*</span> {false && <span><br />заполните обязательное поле *</span>}</p>
                        <input type="text" value={about} onChange={(e) => handleChange(e, setAbout)} />
                    </div>
                    <div className={s.block}>
                        <p>Награды и достижения: <span>*</span> {false && <span><br />заполните обязательное поле *</span>}</p>
                        <input type="text" value={awards} onChange={(e) => handleChange(e, setAwards)} />
                    </div>
                    <div className={s.block}>
                        <p>Сервис для клиентов: <span>*</span> {false && <span><br />заполните обязательное поле *</span>}</p>
                        <input type="text" value={service} onChange={(e) => handleChange(e, setService)} />
                    </div>
                    {
                        info && info.fields.map((field, index) => (
                            <div key={index} className={s.block}>
                                <p>{`${field.key}`}<span> *</span></p> {/* Отображаем содержимое в <p> */}
                                <input
                                    type="text"
                                    // value={field} // Значение инпута из массива fields
                                    onChange={(e) => handleFieldChange(index, e)} // Обработчик изменения
                                />
                            </div>
                        ))
                    }
                </div>

                <div className={s.boldText}>Социальные сети</div>


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
                </div>

                <label className={s.photosBlock} htmlFor="portfolio">
                    <div className={s.boldText}>ФОТОГРАФИИ</div>
                    <input type="file" hidden={true} multiple id='portfolio' onChange={(e) => handleFileSelection(e, 0)} accept=".png, .jpg" />
                    <div className={s.inputBlock}>
                        <p>Перетащите или нажмите для загрузки фото</p>
                        <p>Ограничение не более 50 файлов весом по 2 MB (.png, .jpg)</p>
                    </div>

                </label>

                {error && <div className={s.errorMessage}>{error}</div>} {/* Отображение ошибки */}

                <div className={s.previewBlock}>
                    {selectedFiles[0] && selectedFiles[0].map((file, index) => {
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
                                <img src={URL.createObjectURL(file)} alt="preview" className={s.previewImage} />
                                <img onClick={() => deletePortfolioImage(0, index)} className={s.closeBtn} src="/images/closeBtn.svg" alt="" />
                            </div>
                        );
                    })}
                </div>


                <div className={s.addDocument}>
                    <div className={s.boldText}>Документы</div>
                    <label htmlFor='document-input' className={s.inputBlock}>
                        <p>Перетащите или нажмите для загрузки документов</p>
                        <p>Ограничение не более 10 файлов весом по 25 MB (.pdf)</p>
                    </label>

                    <input
                        id="document-input"
                        type="file"
                        multiple
                        accept=".pdf"
                        onChange={handleDocumentChange}
                        style={{ display: "none" }}
                    />
                    <ul className={s.fileList}>
                        {documents && documents.map((file, index) => (
                            <li key={index}>
                                <img src="/images/hugeicons_pdf-02.svg" alt="" />
                                <span>{file.name}</span> <span className={s.size}>{(file.size / (1024 * 1024)).toFixed(2)}MB</span>
                                <img className={s.closeBtn} onClick={() => handleDocumentRemove(index)} src="/images/ph_plus-light (1).svg" alt="" />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={s.videosBlock}>
                    <div className={s.boldText}>Видео</div>
                    {
                        videos && videos.map((elem, index) =>
                            <div className={s.videoBlock} key={index}>
                                <div className={s.left}>
                                    <div className={s.deleteBlock}>
                                        <p>Ссылка на видео</p>
                                        <p className={s.delete} onClick={() => deleteVideo(index)}>Удалить</p>
                                    </div>
                                    <input onChange={(e) => { handleChangeVideos(e, index) }} value={videos[index]} type="text" placeholder='Youtube, Vimeo' />
                                </div>
                                <label className={s.right} htmlFor={'prevInput' + index}>
                                    {
                                        previews[index] ?
                                            <img src={previews[index] ? URL.createObjectURL(previews[index]) : { display: "none" }} alt="" />
                                            : <>

                                                <p>Превью для видео</p>
                                                <p>Вес не более 2 MB (.png, .jpg)</p>
                                            </>
                                    }
                                </label>
                                <input type="file" hidden={true} id={'prevInput' + index} onChange={(e) => handlePreviewSelection(e)} />
                            </div>
                        )
                    }
                    <button className={s.addBtn} onClick={() => setVideos(prev => [...prev, ""])}><img src="/images/ph_plus-light 11.svg" alt="" />Добавить ссылку</button>
                </div>

                {additionalFields && 
                    additionalFields.map((elem, index) => 
                    <div className={s.additionalFields}>
                        {
                        info && info.additionalFields.map((field, index) => (
                            <div key={index} className={s.block}>
                                <p>{`${field.key}`}<span> *</span></p> {/* Отображаем содержимое в <p> */}
                                <input
                                    type="text"
                                    // value={field} // Значение инпута из массива fields
                                    onChange={(e) => handleAddFieldChange(index, e)} // Обработчик изменения
                                />
                            </div>
                        ))
                        }
                        <div className={s.block}>

                        </div>
                        <label className={s.photosBlock} htmlFor={`portfolio${index}`}>
                            <div className={s.boldText}>ФОТОГРАФИИ</div>
                            <input type="file" hidden={true} multiple id={`portfolio${index}`} onChange={(e) => handleFileSelection(e, `portfolio${index}`)} accept=".png, .jpg" />
                            <div className={s.inputBlock}>
                                <p>Перетащите или нажмите для загрузки фото</p>
                                <p>Ограничение не более 50 файлов весом по 2 MB (.png, .jpg)</p>
                            </div>

                        </label>
                        <div className={s.previewBlock}>
    {selectedFiles[index + 1] && selectedFiles[index + 1].map((file, fileIndex) => {
        // Определяем индекс строки
        const rowIndex = Math.floor(fileIndex / 7);
        // Определяем позицию внутри строки
        const positionInRow = fileIndex % 7;

        // Логика для определения классов
        const className =
            positionInRow < 4
                ? s.small // Первые 4 изображения в каждой строке
                : s.large; // Последние 3 изображения в каждой строке

        return (
            <div key={fileIndex} className={className}>
                <img src={URL.createObjectURL(file)} alt="preview" className={s.previewImage} />
                <img
                    onClick={() => deletePortfolioImage(index+1, fileIndex)} // Передаем и индекс проекта (index), и индекс файла (fileIndex)
                    className={s.closeBtn}
                    src="/images/closeBtn.svg"
                    alt=""
                />
            </div>
        );
    })}
</div>
                    </div>
                    )
                }
                {
                    info && info.multipleSelection &&
                    <button className={s.addProject} onClick={addAdditionalField}>Добавить {info.nameTitle}</button>
                }



                <div className={s.checkboxBlock}>
                    <input type="checkbox" id='access' onChange={(e) => handleCheckBox(e)} />
                    <label htmlFor='access'> Я подтверждаю своё согласие на публикацию предоставленных данных</label>
                </div>


                <div className={s.btnWrapper}>
                    <div className={s.sendBtn} onClick={SENDINFORMATION} disabled={disabled} style={disabled ? { backgroundColor: "#B22222", cursor: "default" } : {}}>
                        <p>ОТПРАВИТЬ ЗАЯВКУ</p>
                        <p>- 1 ед. из вашего баланса</p>
                    </div>
                    {
                        disabled && <img style={{ width: "100px" }} src='/images/loadingGif.gif' />
                    }

                </div>


            </div>
            {
                popUp &&
                <div className={s.balancePopup}>
                    <BalancePopup />
                </div>
            }

            <div className={s.questions}>
                <Questions />
            </div>
        </div>
    );
}

export default ApplicationPage;
