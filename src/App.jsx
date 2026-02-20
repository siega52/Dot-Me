import { useState, useRef, useEffect } from 'react';
import './App.css';
import video from './assets/video.mp4';
import video2 from './assets/video2.mp4';
import video3 from './assets/video3.mp4';

import track1 from './music/music.mp3';
import track2 from './music/music2.mp3';
import track3 from './music/music3.mp3';

import { 
  FaGithub, FaTelegram, FaInstagram, FaPlay, FaPause,
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaSass, FaBootstrap,
  FaGitAlt, FaNodeJs, FaChevronLeft, FaChevronRight,
  FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeDown, FaVolumeMute
} from 'react-icons/fa';
import { 
  SiTypescript, SiWebpack, SiTailwindcss, SiJest, SiVitest
} from 'react-icons/si';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [previousVolume, setPreviousVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const videos = [video, video2, video3];
  const tracks = [
    { src: track1, title: "home", artist: ".diedlonely, Jay Karin" },
    { src: track2, title: "FOCUS", artist: "quietshadow" },
    { src: track3, title: "Take a Deep Bright", artist: "Kubsxyz" }
  ];

  const nextVideo = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const newIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const prevVideo = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const newIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    setCurrentVideoIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const nextTrack = () => {
    const newIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(newIndex);
    setCurrentTime(0);
    if (isPlaying) {
      setTimeout(() => audioRef.current.play(), 100);
    }
  };

  const prevTrack = () => {
    const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(newIndex);
    setCurrentTime(0);
    if (isPlaying) {
      setTimeout(() => audioRef.current.play(), 100);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = previousVolume;
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      audioRef.current.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    audioRef.current.currentTime = seekTime;
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateTime = () => {
      if (!isSeeking) {
        setCurrentTime(audio.currentTime);
      }
    };
    
    const updateDuration = () => {
      setDuration(audio.duration);
    };
    
    const handleTrackEnd = () => {
      nextTrack();
    };
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleTrackEnd);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleTrackEnd);
    };
  }, [currentTrackIndex, isSeeking]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, []);

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
      <div className={`video-wrapper ${isTransitioning ? 'fade-transition' : ''}`}>
        <video 
          ref={videoRef}
          key={currentVideoIndex}
          autoPlay
          loop 
          muted 
          playsInline
          className="background-video"
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          {/* Если видео не загрузится, покажем градиентный фон */}
          <div className="animated-bg">
            <div className="gradient-orbe"></div>
            <div className="gradient-orbe"></div>
            <div className="gradient-orbe"></div>
          </div>
        </video>
      </div>

      <div className="video-overlay"></div>

      <button onClick={prevVideo} className="video-nav-button video-nav-prev" disabled={isTransitioning}>
        <FaChevronLeft />
      </button>
      
      <button onClick={nextVideo} className="video-nav-button video-nav-next" disabled={isTransitioning}>
        <FaChevronRight />
      </button>

      <div className="video-indicator">
        {videos.map((_, index) => (
          <span 
            key={index} 
            className={`video-dot ${index === currentVideoIndex ? 'active' : ''}`}
            onClick={() => {
              if (!isTransitioning && index !== currentVideoIndex) {
                setIsTransitioning(true);
                setCurrentVideoIndex(index);
                setTimeout(() => setIsTransitioning(false), 1000);
              }
            }}
          />
        ))}
      </div>

      <div className="glass-card">
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

          <div className="additional-tech">
            <p><strong>Протоколы:</strong> HTTP/HTTPS, REST</p>
            <p><strong>Форматы:</strong> JSON, XML, FormData</p>
            <p><strong>Инструменты:</strong> Fetch API, Axios</p>
            <p><strong>DevTools:</strong> Chrome/Firefox DevTools</p>
            <p><strong>Git:</strong> Git Flow, работа с ветками, rebase, merge</p>
            <p><strong>Методологии:</strong> БЭМ</p>
          </div>
        </div>

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

        <div className="advanced-player">
          <audio 
            ref={audioRef} 
            src={tracks[currentTrackIndex].src}
            preload="metadata"
          />
          
          <div className="track-info">
            <div className="track-title">{tracks[currentTrackIndex].title}</div>
            <div className="track-artist">{tracks[currentTrackIndex].artist}</div>
          </div>

          <div className="progress-container">
            <span className="time-current">{formatTime(currentTime)}</span>
            <input
              type="range"
              className="progress-bar"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              onMouseDown={handleSeekStart}
              onMouseUp={handleSeekEnd}
              onTouchStart={handleSeekStart}
              onTouchEnd={handleSeekEnd}
            />
            <span className="time-total">{formatTime(duration)}</span>
          </div>

          <div className="player-controls">
            <button onClick={prevTrack} className="control-button">
              <FaStepBackward />
            </button>
            
            <button onClick={togglePlay} className="play-pause-button">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            
            <button onClick={nextTrack} className="control-button">
              <FaStepForward />
            </button>
          </div>

          <div className="volume-control">
            <button onClick={toggleMute} className="volume-button">
              {isMuted || volume === 0 ? <FaVolumeMute /> : volume < 0.5 ? <FaVolumeDown /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;