import React, { useState, useRef } from 'react';
import './App.css';

import { FaGithub, FaTelegram, FaYoutube, FaPlay, FaPause, FaSpotify } from 'react-icons/fa';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const audioSrc = '/music/track.mp3';

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="app">
      {/* Анимированный фон */}
      <div className="animated-bg">
        <div className="gradient-orbe"></div>
        <div className="gradient-orbe"></div>
        <div className="gradient-orbe"></div>
      </div>

      {/* Основная карточка с блюром */}
      <div className="glass-card">
        <h1 className="name">Siega52</h1>
        
        <div className="bio">
          <p>Frontend developer. With more than 2 years of experience</p>
          <p>HTML5; CSS3; JavaScript (ES6+); React; TypeScript; Препроцессоры: SASS/SCSS; Методологии: БЭМ; CSS-фреймворки: Bootstrap, Tailwind CSS; 
            Сборщики (Bundlers): Webpack, Vite; Протоколы: HTTP/HTTPS, знание REST; Форматы: JSON, XML, FormData; Инструменты: Fetch API, Axios; Юнит-тесты: Jest, Vitest; DevTools: Chrome/Firefox DevTools; 
            Git: Git Flow, работа с ветками, rebase, merge</p>
        </div>

        <div className="social-links">
          <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://t.me/yourprofile" target="_blank" rel="noopener noreferrer">
            <FaTelegram />
          </a>
          <a href="https://youtube.com/@yourprofile" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
          <a href="https://guns.lol/you" target="_blank" rel="noopener noreferrer">
            <FaSpotify /> 
          </a>
        </div>

        <div className="music-player">
          <audio ref={audioRef} src={audioSrc} loop />
          <button onClick={togglePlay} className="play-button">
            {isPlaying ? <FaPause /> : <FaPlay />}
            <span>{isPlaying ? 'Пауза' : 'Слушать мой трек'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;