import React, { useState, useEffect } from 'react';
import s from './AdminNominations.module.sass';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

function AdminNominations() {
    const [allNominations, setAllNominations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // Состояние для редактирования
    const [info, setInfo] = useState([{ text: '', percentage: '' }]);

    const navigate = useNavigate()
    const [newNomination, setNewNomination] = useState({
        nomination: '',
        category: '',
        information: []
    });
    const [editNomination, setEditNomination] = useState(null); // Состояние для текущей редактируемой номинации

    useEffect(() => {
        axios.get('/nom')
            .then(res => res.data)
            .then(data => {
                setAllNominations(data);
                const uniqueCategories = [...new Set(data.map(item => item.category))];
                setCategories(uniqueCategories);
            });
    }, []);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => {
        setIsPopupOpen(false);
        setInfo([{ text: '', percentage: '' }]);
    };

    const openEditPopup = (nomination) => {
        setEditNomination(nomination);
        setInfo(nomination.information); // Установить информацию для редактирования
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
        setEditNomination(null);
        setInfo([{ text: '', percentage: '' }]);
    };

    const handleChange = (e) => {
        setNewNomination({
            ...newNomination,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditChange = (e) => {
        setEditNomination({
            ...editNomination,
            [e.target.name]: e.target.value,
        });
    };

    const handleInfoChange = (index, e) => {
        const { name, value } = e.target;
        const updatedInfo = [...info];
        updatedInfo[index][name] = value;
        setInfo(updatedInfo);
    };

    const addInfoField = () => {
        setInfo([...info, { text: '', percentage: '' }]);
    };

    const removeInfoField = (index) => {
        const updatedInfo = info.filter((_, i) => i !== index);
        setInfo(updatedInfo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/nom', { ...newNomination, information: info });
            setAllNominations([...allNominations, response.data]);
            setNewNomination({ nomination: '', category: '', information: [] });
            closePopup();
        } catch (error) {
            console.error('Ошибка при добавлении номинации:', error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/nom/update/${editNomination._id}`, { ...editNomination, information: info });
            const updatedNominations = allNominations.map((nom) =>
                nom._id === editNomination._id ? { ...editNomination, information: info } : nom
            );
            setAllNominations(updatedNominations);
            closeEditPopup();
        } catch (error) {
            console.error('Ошибка при редактировании номинации:', error);
        }
    };

    const deleteNomination = (id) => {
        axios.delete(`/nom/${id}`)
        .then(res => res.data)
        .then(data => {
            if (data) {
                let filtered = allNominations.filter((elem) => elem._id !== id);
                setAllNominations(filtered);
            }
        });
    };

    return (
        <div className={s.container}>
            <div className={s.innerContainer}>
                <div className={s.top}>
                    <h2>Номинации</h2>
                    <button onClick={openPopup}>Добавить номинацию</button>
                </div>
                <div className={s.nominations}>
                    {categories.map((category, index) => (
                        <div key={index} className={s.categoryBlock}>
                            <h3>{category}</h3>
                            <div className={s.nominationList}>
                                {allNominations
                                    .filter(nomination => nomination.category === category)
                                    .map((nomination, idx) => (
                                        <div key={idx} className={s.nomination}>
                                            <p onClick={() => openEditPopup(nomination)}>{nomination.nomination}</p>
                                            <p onClick={() => navigate(`/adminApplication/${nomination._id}`)}>Управление</p>
                                            <p onClick={() => deleteNomination(nomination._id)}>Удалить</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popup для добавления новой номинации */}
            {isPopupOpen && (
                <div className={s.popupBackground}>
                    <div className={s.popup}>
                        <h3>Добавить новую номинацию</h3>
                        <form onSubmit={handleSubmit}>
                            <div className={s.formGroup}>
                                <label>Номинация</label>
                                <input
                                    type="text"
                                    name="nomination"
                                    value={newNomination.nomination}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={s.formGroup}>
                                <label>Категория</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={newNomination.category}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={s.formGroup}>
                                <label>Информация</label>
                                {info.map((elem, index) => (
                                    <div key={index} className={s.infoItem}>
                                        <div className={s.inputs}>
                                            <input
                                                type="text"
                                                name="text"
                                                placeholder="Текст"
                                                value={elem.text}
                                                onChange={(e) => handleInfoChange(index, e)}
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="percentage"
                                                placeholder="Процент"
                                                value={elem.percentage}
                                                onChange={(e) => handleInfoChange(index, e)}
                                                required
                                            />
                                        </div>
                                        <button type="button" className={s.remove} onClick={() => removeInfoField(index)}><img src='/images/54324.png'></img></button>
                                    </div>
                                ))}
                                <button type="button" className={s.add} onClick={addInfoField}>Добавить информацию</button>
                            </div>

                            <div className={s.buttons}>
                                <button type="submit">Добавить</button>
                                <button type="button" onClick={closePopup}>Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Popup для редактирования номинации */}
            {isEditPopupOpen && (
                <div className={s.popupBackground}>
                    <div className={s.popup}>
                        <h3>Редактировать номинацию</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className={s.formGroup}>
                                <label>Номинация</label>
                                <input
                                    type="text"
                                    name="nomination"
                                    value={editNomination.nomination}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>
                            <div className={s.formGroup}>
                                <label>Категория</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={editNomination.category}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>
                            <div className={s.formGroup}>
                                <label>Информация</label>
                                {info.map((elem, index) => (
                                    <div key={index} className={s.infoItem}>
                                        <div className={s.inputs}>
                                            <input
                                                type="text"
                                                name="text"
                                                placeholder="Текст"
                                                value={elem.text}
                                                onChange={(e) => handleInfoChange(index, e)}
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="percentage"
                                                placeholder="Процент"
                                                value={elem.percentage}
                                                onChange={(e) => handleInfoChange(index, e)}
                                                required
                                            />
                                        </div>
                                        <button type="button" className={s.remove} onClick={() => removeInfoField(index)}><img src='/images/54324.png'></img></button>
                                    </div>
                                ))}
                                <button type="button" className={s.add} onClick={addInfoField}>Добавить информацию</button>
                            </div>

                            <div className={s.buttons}>
                                <button type="submit">Сохранить</button>
                                <button type="button" onClick={closeEditPopup}>Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminNominations;
