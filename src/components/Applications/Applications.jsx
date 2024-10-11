import React, { useEffect, useState } from 'react';
import s from './Applications.module.sass';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

function Applications() {
    const [users, setUsers] = useState([]);
    const [nominations, setNominations] = useState([]);
    const [openedNomination, setOpenedNomination] = useState(null); // Track opened nomination
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/getAllUsers')
            .then(res => res.data)
            .then(data => {
                let allNominations = data.map(user => 
                    user.applications 
                        ? user.applications.map((elem) => ({
                            ...elem.application_data, // Копируем все данные из application_data
                            userId: user._id, // Добавляем user._id как поле userId
                            applicationId: elem.application_id // Добавляем application_id как поле applicationId
                        })) 
                        : null
                );
                console.log(allNominations.filter(nomination => nomination && nomination.length >= 1).flat());
                setUsers(allNominations.filter(nomination => nomination && nomination.length >= 1).flat())});
                

        axios.get('/nom')
            .then(res => res.data)
            .then(data => {
                if (data) {
                    let tempNominations = [];
                    for (let i = 0; i < data.length; i++) {
                        tempNominations.push(data[i].nomination[0]); // Get the first nomination
                    }
                    setNominations(tempNominations);
                }
            });
    }, []);

    // Click handler to toggle opened nomination
    const handleNominationClick = (index) => {
        setOpenedNomination(openedNomination === index ? null : index); // Toggle nomination index
    };

    return (
        <div className={s.container}>
            <div className={s.applications}>
                {/* Display nominations */}
                <div className={s.nominations}>
                    {nominations && nominations.map((nomination, index) => (
                        <div className={s.nomination} style={{cursor: "pointer"}} key={index} onClick={() => handleNominationClick(index)}>
                            <p>{nomination}</p>
                            <img src="https://cdn-icons-png.flaticon.com/512/54/54785.png" alt="toggle" />
                        </div>
                    ))}

                    {openedNomination !== null && (
                        <div className={s.container}>
                            <img src="/images/Frame 3.svg" onClick={() => setOpenedNomination(null)} style={{cursor: "pointer"}} alt="" />
                            <p>{nominations[openedNomination]}</p>
                            {
                                users.filter((elem) => elem.nomination.toLowerCase() == nominations[openedNomination].toLowerCase()).map((elem) =>
                                <div className={s.nomination} style={{paddingBottom: "10px"}}>
                                    <p style={{marginTop: "20px"}}>{elem.fullName}</p>
                                    <button onClick={() => navigate(`/applicationChecking/${elem.applicationId}/${elem.userId}`)}>Посмотреть заявку</button>
                                </div> )
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Applications;
