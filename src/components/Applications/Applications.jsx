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
                console.log(data);
                setUsers(data);
            });

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
                        <div className={s.nomination} key={index} onClick={() => handleNominationClick(index)}>
                            <p>{nomination}</p>
                            <img src="https://cdn-icons-png.flaticon.com/512/54/54785.png" alt="toggle" />
                        </div>
                    ))}
                    {openedNomination !== null && (
                        <div className={s.nominations}>
                            {users
                                .filter(user =>
                                    user.applications.some(app => app.application_data.nomination.includes(nominations[openedNomination]))
                                ) // Filter users who applied for the selected nomination
                                .map((user, userIndex) => (
                                    <div key={userIndex}>
                                        <h3>{user.fullName}</h3>
                                        <div>
                                            {user.applications.length === 0 ? (
                                                <p>Нету поданных заявок</p>
                                            ) : (
                                                user.applications.map((app, appIndex) => (
                                                    app.application_data.nomination.includes(nominations[openedNomination]) && (
                                                        <div key={appIndex} className={s.container}>
                                                            <p>{app.application_data.nomination}</p>
                                                            <p>{app.application_data.fullName}</p>
                                                            <button onClick={() => navigate(`/applicationChecking/${app.application_id}/${user._id}`)}>
                                                                Посмотреть заявку
                                                            </button>
                                                        </div>
                                                    )
                                                ))
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>

                {/* Display users based on opened nomination */}
            </div>
        </div>
    );
}

export default Applications;
