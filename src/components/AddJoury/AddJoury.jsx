import React, { useState } from 'react'
import s from './AddJoury.module.sass'
import axios from '../../axios'

function AddJoury() {

    const[email, setEmail] = useState('')

    const addJoury = async() => {
        console.log('добав')
        axios.post('/setJoury', { email })
        .then((res) => res.data)
        .then(data => {
            alert(data.message)
        })
        .catch((err) => alert("не удалось зарегестрировать жюри"))
    }
    const handleChangeJoury = (e) => {
        setEmail(e.target.value)
    }
  return (
    <div className={s.container}>
        {/* <div className={s.title}>Добавление жюри</div> */}
        <p>Введите email жюри:</p>
        <input type="text" onChange={(e) => handleChangeJoury(e)} />
        <button onClick={addJoury} className={s.add}>Дать роль Жюри</button>
        <button className={s.delete}>Убрать роль Жюри</button>
    </div>
  )
}

export default AddJoury