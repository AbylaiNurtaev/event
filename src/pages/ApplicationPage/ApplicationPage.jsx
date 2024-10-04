import React, { useEffect, useState } from 'react';
import s from './ApplicationPage.module.sass';
import { useNavigate, useParams } from 'react-router-dom';
import Questions from '../../components/Questions/Questions';
import axios from '../../axios'
import BalancePopup from '../../components/BalancePopup/BalancePopup';

function ApplicationPage() {
    const navigate = useNavigate();
    const { applicationId } = useParams()

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
    const [isNew, setIsNew] = useState(true)

    useEffect(() => {
        if(applicationId != 'new'){
            setPopup(false)
            setIsNew(false)
            const userId = localStorage.getItem('id')
            axios.post('/auth/getAllInfo', {
                userId,
                application_id: applicationId
            })
            .then((res) => res.data)
            .then(data => {
                setLogo(data.user.logo)
                setPhoto(data.user.avatar)
                setDocuments(data.documents)
                setPreviews(data.previews)
                setVideos(data.application_data.videos)

                const photos = data.portfolio
                const counts = data.application_data.imagesCount
                const result = groupPhotos(photos, counts);
                setSelectedFiles(result)

            })
            .catch((err) => console.log(err))
            axios.post('/getApplication', {
                id: userId,
                application_id: applicationId
            })
            .then(res => res.data)
            .then(data => {
                console.log("INFFOO", data.application_data.info)
                setAbout(data.application_data.about)
                setSpecialization(data.application_data.specialization)
                setFullName(data.application_data.fullName)
                setNomination(data.application_data.nomination)
                setCity(data.application_data.city)
                setWebsite(data.application_data.website)
                setPhone(data.application_data.phone)
                setService(data.application_data.about)
                setAwards(data.application_data.awards)
                setInstagram(data.application_data.instagram)
                setVk(data.application_data.vk)
                setYoutube(data.application_data.youtube)
                
                setTiktok(data.application_data.tiktok)
                setInfo(data.application_data.info);
                setAdditionalFields(data.application_data.info.additionalFields)
                // setCheckBox(true)
                // console.log(data)
            })
            .catch((err) => console.log(err))
        }
    }, [applicationId])

    const[btnDisabled, setBtnDisabled] = useState(true)

    useEffect(() => {
        const id = localStorage.getItem('id')
        axios.post('/auth/getBalance', {id})
        .then((res) => res.data)
        .then(data => {
            if(data.message == "success"){
                setPopup(false)
                setBtnDisabled(false)
                axios.get('/getDeadline')
        .then((res) => res.data)
        .then(data => {
            if (data && data.length > 0) {
                const today = new Date();
                const todayFormatted = today.toISOString().split('T')[0]; // "YYYY-MM-DD"
                const deadlineDate = data[data.length - 1].date;
                console.log("TRUE болуы керек", deadlineDate < todayFormatted);
                
                if (deadlineDate < todayFormatted) {
                    // alert("Сроки подачи заявки истекли")
                    setBtnDisabled(true);  // Ставим кнопку неактивной, если дата прошла
                } else {
                    setBtnDisabled(false); // Активируем кнопку, если дата в будущем
                }
            }
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
            }else if(data.message == "no money"){
                setPopup(true)
                setBtnDisabled(true)
            }
        })

    }, [])


    const [nominations, setNominations] = useState()
    const [nominationsSettings, setNominationsSettings] = useState()

    // Состояния для всех полей формы
    const [nomination, setNomination] = useState('');
    const [specialization, setSpecialization] = useState('Декоратор');
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
    const [info, setInfo] = useState(null)
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
        if (nominationsSettings && nominationsSettings.length > 0) {
    
            // Проверяем, пустой ли info (null, undefined, пустая строка, пустой массив или объект)
            if (!info || (Array.isArray(info) && info.length === 0) || (typeof info === 'object' && Object.keys(info).length === 0)) {
                console.log('Пустой info, устанавливаем данные из nominationsSettings[0]');
                const currentNomination = nominationsSettings[0]; // Берем первый элемент в списке
                setInfo(currentNomination);
            } else {
                // Если info не пустой, ищем текущую номинацию по значению nomination
                const currentNomination = nominationsSettings.find((elem) =>
                    elem.nomination[0].toLowerCase() === nomination.toLowerCase()
                );
    
                if (currentNomination) {
                    setInfo(currentNomination);
                } else {
                    console.warn('Номинация не найдена:', nomination);
                }
            }
        } else {
            console.warn('nominationsSettings пустой или не загружен');
        }
    }, [nomination, nominationsSettings, info]);


    
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
        if(isNew){

            formData.append("application_id", application_id)
        }else{
            formData.append("application_id", applicationId)
        }
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
    
    function groupPhotos(photos, counts) {
        let groupedPhotos = [];
        let currentIndex = 0;
      
        for (let count of counts) {
          // Извлекаем подмассив фотографий на основе числа в counts
          let group = photos.slice(currentIndex, currentIndex + count);
          groupedPhotos.push(group);
      
          // Обновляем текущий индекс для следующей группы
          currentIndex += count;
        }
      
        return groupedPhotos;
      }
    
    const handleSubmitDocuments = async () => {
        const id = localStorage.getItem('id')
        
        if (documents.length > 0) {
            const formData = new FormData();
            documents.forEach((file) => formData.append('documents', file)); // Добавляем файлы в FormData
            if(isNew){

                formData.append("application_id", application_id)
            }else{
                formData.append("application_id", applicationId)
            }
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
        if(isNew){

            formData.append("application_id", application_id)
        }else{
            formData.append("application_id", applicationId)
        }
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
        setAdditionalFields(prev => [
            ...prev,
            { key: `Field ${prev.length + 1}`, value: '' } // Добавляем новый объект с ключом и пустым значением
        ]);
    };
    
    
    const SENDINFORMATION = async () => {
        console.log("ОТПРАВ ИНФО", info)
        if(btnDisabled){
            alert("Пополните баланс")
        }else{
            const id = localStorage.getItem('id');
            let imagesCount = []
            for (let i = 0; i < selectedFiles.length; i++){
                imagesCount.push(selectedFiles[i].length)
            }
            if (checkbox) {
                setDisabled(true)
                await handleSubmit()
                await handleSubmitPreview()
                await handleSubmitDocuments()
                
                if(isNew){
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
                        }, application_id: `${application_id}`, id: id, isNew
                    })
                    .then((res) => {
                        alert("Ваша заявка успешно отправлена")
                        setDisabled(false)
                        // window.location.href = window.location.href
                    })
                }else{
                    await axios.post('/updateApplication', {
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
                        }, application_id: `${applicationId}`, id: id
                    })
                    .then((res) => {
                        alert("Ваша заявка успешно обновлена")
                        setDisabled(false)
                        window.location.href = window.location.href
                    })
                }
                
            }
            else {
                alert("Подтвердите своё согласие на публикацию")
            }
        }
        
    }
    
    const [popUp, setPopup] = useState(false)
    
    
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
        const updatedFields = [...info.fields];
        updatedFields[index] = {
            ...updatedFields[index],
            value: e.target.value // обновляем значение для конкретного поля
        };
        
        setInfo({
            ...info, // сохраняем остальные поля объекта info
            fields: updatedFields // обновляем массив fields
        });
    };

    const handleAddFieldChange = (outerIndex, innerIndex, e) => {
        setInfo(prevInfo => {
            // Проверяем, что у нас есть нужные данные
            if (!prevInfo || !prevInfo.additionalFields) {
                console.error('Проблема с данными в info или additionalFields');
                return prevInfo;
            }
    
            // Обновляем поля в соответствии с переданными индексами
            const updatedFields = prevInfo.additionalFields.map((fields, i) => {
                if (i === outerIndex) {
                    return fields.map((field, j) => {
                        if (j === innerIndex) {
                            return {
                                ...field,
                                value: e.target.value // Обновляем только нужное поле
                            };
                        }
                        return field; // Возвращаем остальное без изменений
                    });
                }
                return fields; // Возвращаем остальные массивы без изменений
            });
    
            // Возвращаем обновленный объект
            return {
                ...prevInfo,
                additionalFields: updatedFields // Обновляем только additionalFields
            };
        });
    
        console.log('Updated Info:', info); // Для проверки обновлённого состояния
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
                        <p>Номинация <span>*</span> {nomination.length == 0 && <span><br />выберите номинацию *</span>}</p>
                        <div className={s.selectWrapper}>
                            {
                                nominations &&
                                <select value={nomination} onChange={(e) => handleChange(e, setNomination)}>
                                    {
                                        nominations.map((elem, index) =>
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
                                <option selected value="Декоратор">Декоратор</option>
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
                                    value={field.value || ''} // Значение инпута из массива fields
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
                                <img src={isNew ? URL.createObjectURL(file) : file} alt="preview" className={s.previewImage} />
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
                            <li key={index} onClick={() => window.location.href = file}>
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
                                            <img src={previews[index] && isNew ? URL.createObjectURL(previews[index]) : previews[index]} alt="" />
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
                    <div className={s.additionalFields} key={index}>
{
    info && info.additionalFields.map((field, idx) => (
        <div key={`additional-${idx}`} className={s.additionalFields}>
            <div className={s.block}>
                <p>{`${field.key}`}<span> *</span></p>
                <input
                    type="text"
                    value={field.value || ''} // Значение инпута
                    onChange={(e) => handleAddFieldChange(index, idx, e)} // Обработчик изменения
                />
            </div>
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
            <div key={fileIndex} className={className} style={{marginTop: '20px'}}>
                <img src={isNew ? URL.createObjectURL(file) : file} alt="preview" className={s.previewImage} />
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
                    <input type="checkbox" id='access' value={checkbox} onChange={(e) => handleCheckBox(e)} />
                    <label htmlFor='access'> Я подтверждаю своё согласие на публикацию предоставленных данных</label>
                </div>


                <div className={s.btnWrapper}>
    <button
        className={s.sendBtn}
        onClick={SENDINFORMATION}
        disabled={disabled || btnDisabled} // Прямое использование свойства "disabled"
        style={(disabled || btnDisabled) ? { backgroundColor: "#DCA9A9", cursor: "default" } : {}}
    >
        {isNew ? <p>ОТПРАВИТЬ ЗАЯВКУ</p> : <p>СОХРАНИТЬ</p>}
        {isNew ? <p>- 1 ед. из вашего баланса</p> : null}
    </button>
    {disabled && <img style={{ width: "100px" }} src='/images/loadingGif.gif' />}
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
