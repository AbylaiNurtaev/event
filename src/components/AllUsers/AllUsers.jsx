import React, { useEffect, useState } from 'react'
import s from './AllUsers.module.sass'
import axios from '../../axios'

function AllUsers() {

    const [users, setUsers] = useState([])
    const [opened, setOpened] = useState(null) // null вместо undefined

    useEffect(() => {
        axios.get('/getAllUsers')
        .then(res => res.data)
        .then(data => {
            console.log(data)
            setUsers(data)
        })
    }, [])

    return (
        <div className={s.container}>
            <div className={s.users}>
                {
                    users && users.map((user, index) => 
                        <React.Fragment key={index}> {/* React.Fragment вместо пустого тега */}
                            <div className={s.people} onClick={() => opened !== index ? setOpened(index) : setOpened(null)}>
                                <p className={s.name}>{user.name}</p>
                                <img src="https://cdn-icons-png.flaticon.com/512/54/54785.png" alt="toggle" />
                            </div>
                            {
                                opened === index && (
                                    <div className={s.nominations}>
                                        {
                                            user.applications.length === 0 
                                                ? <p>Нету поданных заявок</p>
                                                : user.applications.map((elem, i) => <p key={i}>{elem.application_data.nomination}</p>)
                                        }
                                    </div>
                                )
                            }
                        </React.Fragment>
                    )
                }
            </div>
        </div>
    )
}

export default AllUsers
