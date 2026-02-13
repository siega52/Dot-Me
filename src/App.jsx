import React, { useState, useRef } from 'react';
import './App.css';
import { 
  FaGithub, FaTelegram, FaInstagram, FaPlay, FaPause,
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaSass, FaBootstrap,
  FaGitAlt, FaNodeJs
} from 'react-icons/fa';
import { 
  SiTypescript, SiWebpack, SiTailwindcss, SiJest, SiVitest
} from 'react-icons/si';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const audioSrc = '/music/my-track.mp3';

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const techCategories = [
    {
      title: "Core",
      items: [
        { icon: <FaHtml5 />, name: "HTML5" },
        { icon: <FaCss3Alt />, name: "CSS3" },
        { icon: <FaJs />, name: "JavaScript (ES6+)" },
        { icon: <FaReact />, name: "React" },
        { icon: <SiTypescript />, name: "TypeScript" }
      ]
    },
    {
      title: "Styling",
      items: [
        { icon: <FaSass />, name: "SASS/SCSS" },
        { icon: <SiTailwindcss />, name: "Tailwind CSS" },
        { icon: <FaBootstrap />, name: "Bootstrap" }
      ]
    },
    {
      title: "Tools",
      items: [
        { icon: <SiWebpack />, name: "Webpack" },
        { icon: <FaNodeJs />, name: "Vite" },
        { icon: <FaGitAlt />, name: "Git Flow" }
      ]
    },
    {
      title: "Testing",
      items: [
        { icon: <SiJest />, name: "Jest" },
        { icon: <SiVitest />, name: "Vitest" }
      ]
    }
  ];

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
        {/* Аватарка */}
        <div className="avatar-container">
          <img 
            src="/src/assets/img.png"
            alt="siega52" 
            className="avatar"
          />
        </div>

        <h1 className="name">siega52</h1>
        
        <div className="bio">
          <p className="main-bio">Frontend developer with more than 2 years of experience</p>
        </div>

        {/* Технологии */}
        <div className="tech-stack">
          <h2 className="tech-title">My Technology Stack</h2>
          
          {techCategories.map((category, idx) => (
            <div key={idx} className="tech-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="tech-items">
                {category.items.map((tech, techIdx) => (
                  <div key={techIdx} className="tech-item">
                    <span className="tech-icon">{tech.icon}</span>
                    <span className="tech-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Дополнительные технологии в виде текста */}
          <div className="additional-tech">
            <p><strong>Протоколы:</strong> HTTP/HTTPS, REST</p>
            <p><strong>Форматы:</strong> JSON, XML, FormData</p>
            <p><strong>Инструменты:</strong> Fetch API, Axios</p>
            <p><strong>DevTools:</strong> Chrome/Firefox DevTools</p>
            <p><strong>Git:</strong> Git Flow, работа с ветками, rebase, merge</p>
            <p><strong>Методологии:</strong> БЭМ</p>
          </div>
        </div>

        {/* Социальные сети */}
        <div className="social-links">
          <a href="https://github.com/siega52" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://t.me/siega52" target="_blank" rel="noopener noreferrer">
            <FaTelegram />
          </a>
          <a href="https://instagram.com/siega52" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>

        {/* Музыкальный плеер */}
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