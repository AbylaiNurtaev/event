import React, { useEffect, useState } from 'react'
import s from './AdminPage.module.sass'
import axios from '../../axios'
import AdminNominations from '../../components/AdminNominations/AdminNominations'


function AdminPage() {
    const id = localStorage.getItem('id')
    const[access, setAccess] = useState(false)
    const [header, setHeader] = useState("Номинации")

    useEffect(() => {
        if(id){
            axios.post('/loginAdmin', { id: id })
            .then((res) => res.data)
            .then(data => {
                if(data){
                    setAccess(true)
                }
            })
            .catch((err) => console.log(err.message))
        }else{
            alert("Авторизуйтесь пожалуйста")
        }

    }, [])
  return (
    <>
        {
            access && 
            <div className={s.container}>
                <div className={s.header}>
                    <p>Добавить жюри</p>
                    <p>Номинации</p>
                    <p>Сроки подачи</p>
                </div>
                <div className={s.innerContainer}>
                    {
                        header == "Номинации" && <AdminNominations/>
                    }
                </div>
            </div>
        }
    </>
  )
}

export default AdminPage