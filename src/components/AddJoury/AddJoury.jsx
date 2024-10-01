import React, { useEffect, useState } from 'react';
import s from './AddJoury.module.sass';
import axios from '../../axios';

function AddJoury() {

  const [email, setEmail] = useState('');
  const [allJouries, setAllJouries] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [selectedNominations, setSelectedNominations] = useState({}); // для хранения выбранных номинаций
  const [activeIndex, setActiveIndex] = useState();

  useEffect(() => {
    // Получение всех жюри
    axios.get('/getJouries')
      .then(res => res.data)
      .then(data => {
        if (data) {
          setAllJouries(data);
          
          // Создаем объект для хранения номинаций каждого жюри
          const initialNominations = {};
          data.forEach(joury => {
            initialNominations[joury.email] = joury.acceptedNominations || [];
          });
          setSelectedNominations(initialNominations);
        }
      });

    // Получение всех номинаций
    axios.get('/nom')
      .then(res => res.data)
      .then(data => {
        const allNominations = [...new Set(data.map(item => item.nomination[0]))];
        setNominations(allNominations);
      });
  }, []);

  const addJoury = async () => {
    axios.post('/setJoury', { email })
      .then(res => res.data)
      .then(data => {
        alert(data.message);
        window.location.reload();
      })
      .catch(() => alert("Не удалось зарегистрировать жюри"));
  };

  const deleteJoury = async (email) => {
    axios.post('/deleteJoury', { email })
      .then(res => res.data)
      .then(data => {
        alert(data.message);
        let newJouries = allJouries.filter(joury => joury.email !== email);
        setAllJouries(newJouries);
      })
      .catch(() => alert("Не удалось удалить жюри"));
  };

  const handleChangeJoury = (e) => {
    setEmail(e.target.value);
  };

  // Обработка выбора номинаций для жюри
  const handleNominationChange = (email, nomination) => {
    setSelectedNominations((prevState) => {
      const jouryNominations = prevState[email] || [];
      return {
        ...prevState,
        [email]: jouryNominations.includes(nomination)
          ? jouryNominations.filter(n => n !== nomination)
          : [...jouryNominations, nomination],
      };
    });
  };

  // Отправка выбранных номинаций на сервер
  const saveNominations = async (email) => {
    const acceptedNominations = selectedNominations[email] || [];
    axios.post('/setJouryNomination', { email, acceptedNominations })
      .then(res => res.data)
      .then(data => {
        alert(data.message);
        setActiveIndex();
      })
      .catch(() => alert("Не удалось сохранить номинации"));
  };

  return (
    <div className={s.container}>
      <p>Введите email жюри:</p>
      <input type="text" onChange={handleChangeJoury} />
      <button onClick={addJoury} className={s.add}>Дать роль Жюри</button>

      <div className={s.blocks}>
        {allJouries && allJouries.map((elem, index) => (
          <div className={s.block} key={elem.email}>
            <div className={s.top}>
              <p onClick={() => {activeIndex >= 0 ? setActiveIndex() : setActiveIndex(index)}}>{elem.name}</p>
              <p onClick={() => deleteJoury(elem.email)}>Удалить</p>
            </div>

            <div className={s.bottom}>
              {nominations && activeIndex === index && nominations.map((nomination) => (
                <div className={s.nominations} key={nomination}>
                  <input
                    type="checkbox"
                    checked={selectedNominations[elem.email]?.includes(nomination) || false}
                    onChange={() => handleNominationChange(elem.email, nomination)}
                  />
                  <p>{nomination}</p>
                </div>
              ))}
            </div>
            {
                nominations && activeIndex === index &&
                <button onClick={() => saveNominations(elem.email)}>Сохранить номинации</button>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddJoury;
