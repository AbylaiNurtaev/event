import React, { useEffect, useState } from 'react';
import s from './Joury.module.sass';

function Joury() {
    const peoples = [
        { name: "Арман и Аскар", par: "Elite Wedding Studio", img: "/images/jouries/jour-1.svg" },
        { name: "Анна Исаева", par: "Shine Bright Events", img: "/images/jouries/jour-2.svg" },
        { name: "Аяжан и Альмира", par: "Crystal Moments", img: "/images/jouries/jour-3.svg" },
        { name: "Марат Садыков", par: "Marsa Events", img: "/images/jouries/jour-4.svg" },
        { name: "Марьям Сыздыкова", par: "Glamour Events", img: "/images/jouries/image (2).svg" },
        { name: "Весь список жюри", par: "Еще 23", img: "/images/jouries/jour-6.svg" },
    ];
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia('(max-width: 767px)'); // Определяем мобильные устройства по ширине экрана
  
      const handleDeviceChange = (e) => {
        setIsMobile(e.matches);
      };
  
      // Проверяем начальное состояние
      setIsMobile(mediaQuery.matches);
  
      // Добавляем слушатель для отслеживания изменений
      mediaQuery.addListener(handleDeviceChange);
  
      // Удаляем слушатель при размонтировании компонента
      return () => {
        mediaQuery.removeListener(handleDeviceChange);
      };
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);

    const moveToRight = () => {
        if(isMobile){

            setCurrentIndex(prevIndex => (prevIndex + 1) % peoples.length);
        }
        else{
            setCurrentIndex(prevIndex => (prevIndex + 3) % peoples.length)
        }
    };

    const moveToLeft = () => {
        if(isMobile){

            setCurrentIndex(prevIndex => (prevIndex - 1 + peoples.length) % peoples.length);
        }
        else{
            setCurrentIndex(prevIndex => (prevIndex - 3 + peoples.length) % peoples.length)
        }
    };

    return (
        <div className={s.joury}>
            <h1 className={s.title}>ЖЮРИ</h1>
            <p className={s.par}>Жюри WEDS — признанные эксперты свадебной индустрии. Их профессионализм и независимость гарантируют объективность и высокий уровень премии.</p>
            <div className={s.buttons}>
                <img className={s.leftBtn} onClick={moveToLeft} src="/images/Frame 2.svg" alt="Left" />
                <img className={s.rightBtn} onClick={moveToRight} src="/images/Frame 2.svg" alt="Right" />
            </div>

            <div className={s.peoples}>
                {peoples.map((elem, index) => (
                    <div
                        key={index}
                        className={`${s.block} ${index === currentIndex ? s.active : ''}`}
                        style={{ transform: `translateX(${(index - currentIndex) * 66.66}%)` }}
                    >
                        <img src={elem.img} alt="" />
                        <h4>{elem.name}</h4>
                        <p>{elem.par}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Joury;
