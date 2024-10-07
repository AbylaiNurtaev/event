import React, { useEffect, useState } from 'react'
import s from './Applications.module.sass'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'



function Applications() {

    const [users, setUsers] = useState()
    const navigate = useNavigate()


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
        <div className={s.applications}>
            {
                
                users && users.map((elem) => 
                    <div className={s.application}>
                        {elem.applications.length >= 1 ? elem.applications.map((data) => 
                            <div className={s.container}>
                                <p>{data?.application_data.nomination}</p>
                                <p>{data?.application_data.fullName}</p>
                                {/* <img src={data?.application_data.photo} alt="" /> */}
                                <button onClick={() => navigate(`/applicationChecking/${data?.application_id}/${elem._id}`)}>Посмотреть заявку</button>
                            </div> 
                        ) : null}
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Applications