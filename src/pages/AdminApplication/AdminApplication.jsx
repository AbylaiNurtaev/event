import React, { useEffect, useState } from 'react'
import s from './AdminApplication.module.sass'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'

function AdminApplication() {
    const { id } = useParams()
    const [nomination, setNomination] = useState()
    const navigate = useNavigate()

    const [nameTitle, setNameTitle] = useState('')
    const [command, setCommand] = useState(false)
    const [multipleSelection, setMultipleSelection] = useState(false)

    const [fields, setFields] = useState([]) // Основные поля
    const [additionalFields, setAdditionalFields] = useState([]) // Дополнительные поля
    useEffect(() => {
        axios.get('/nom')
            .then((res) => res.data)
            .then(data => {
                console.log("data", data)
                console.log("id", id)
                return data.find((nomination) => nomination._id == id)
        })
            .then(nomination => {
                console.log(nomination)
                if (nomination) { // Проверяем, что nomination не undefined
                    setNomination(nomination);
                    setNameTitle(nomination.nameTitle); // Убедимся, что nameTitle существует
                    setMultipleSelection(nomination.multipleSelection); // Убедимся, что multipleSelection существует
                    setFields(nomination.fields); // Защита от отсутствия полей
                    setAdditionalFields(nomination.additionalFields); // Защита от отсутствия дополнительных полей
                    setCommand(nomination.command); // Защита от отсутствия команды
                }
            })
            .catch(error => {
                console.error('Ошибка при загрузке номинации:', error);
            });
    }, [id]);

    const handleChange = (e, setter) => {
        setter(e.target.value)
    }

    const handleChangeSelect = () => {
        setMultipleSelection((prev) => !prev)
    }

    const handleChangeCommand = () => {
        setCommand(prev => !prev)
    }

    // Логика для основных полей
    const addField = () => {
        setFields([...fields, { key: '', value: '' }])
    }

    const handleFieldChange = (index, e) => {
        const updatedFields = [...fields]
        updatedFields[index].key = e.target.value
        setFields(updatedFields)
    }

    const removeField = (index) => {
        const updatedFields = fields.filter((_, i) => i !== index)
        setFields(updatedFields)
    }

    // Логика для дополнительных полей
    const addAdditionalField = () => {
        setAdditionalFields([...additionalFields, { key: '', value: '' }])
    }

    const handleAdditionalFieldChange = (index, e) => {
        const updatedFields = [...additionalFields]
        updatedFields[index].key = e.target.value
        setAdditionalFields(updatedFields)
    }

    const removeAdditionalField = (index) => {
        const updatedFields = additionalFields.filter((_, i) => i !== index)
        setAdditionalFields(updatedFields)
    }

    const handleSave = () => {
        const dataToSave = {
            nameTitle,
            multipleSelection,
            command,
            fields: fields,
            additionalFields: additionalFields
        }
        axios.post(`/nom/modify/${id}`, dataToSave)
            .then((res) => res.data)
            .then(data => {
                if (data) {
                    alert('Успешно сохранено')
                }
            })
            .catch((err) => {
                alert('Произошла ошибка')
            })
    }

    return (
        <div className={s.container}>
            <div className={s.crumbs}>
                <img src="/images/fluent_arrow-up-28-filled.svg" alt="" />
                <p onClick={() => navigate(-1)}>Вернуться назад</p>
            </div>
            {
                nomination &&
                <div className={s.innerContainer}>
                    <div className={s.rows}>
                        <div className={s.row}>
                            <input type="checkbox" checked={multipleSelection} onChange={handleChangeSelect} />
                            <p>Возможность добавлять несколько проектов: </p>
                        </div>
                        {
                            multipleSelection &&
                            <div>
                                <p>Изменить заголовок проектов: </p>
                                <input type="text" value={nameTitle} onChange={(e) => handleChange(e, setNameTitle)} />
                            </div>
                        }

                        {
                            multipleSelection &&
                            <div className={s.title}>Дополнительные поля</div>
                        }
                        {
                            multipleSelection &&
                            additionalFields.map((field, index) => (
                                <div key={index} className={s.fieldContainer}>
                                    <p>Название дополнительного поля:</p>
                                    <input
                                        type="text"
                                        value={field.key} // Используем field.key
                                        onChange={(e) => handleAdditionalFieldChange(index, e)}
                                    />
                                    <button className={s.deleteBtn} onClick={() => removeAdditionalField(index)}>
                                        <img src="/images/54324.png" style={{ width: "30px" }} alt="Удалить поле" />
                                    </button>
                                </div>
                            ))
                        }
                        {
                            multipleSelection &&
                            <button className={s.addBtn} onClick={addAdditionalField}>Добавить дополнительное поле</button>
                        }

                    </div>
                    <div className={s.title}>Основные поля</div>

                    <div className={s.row}>
                        <input type="checkbox" checked={command} onChange={handleChangeCommand} />
                        <p>Командный проект</p>
                    </div>
                    {
                        fields.map((field, index) => (
                            <div key={index} className={s.fieldContainer}>
                                <p>Название поля:</p>
                                <input
                                    type="text"
                                    value={field.key} // Используем field.key
                                    onChange={(e) => handleFieldChange(index, e)}
                                />
                                <button className={s.deleteBtn} onClick={() => removeField(index)}>
                                    <img src="/images/54324.png" style={{ width: "30px" }} alt="Удалить поле" />
                                </button>
                            </div>
                        ))
                    }
                    <button className={s.addBtn} onClick={addField}>Добавить поле</button>

                    {/* Раздел для дополнительных полей */}

                    <button className={s.saveBtn} onClick={handleSave}>СОХРАНИТЬ</button>
                </div>
            }
        </div>
    )
}

export default AdminApplication
