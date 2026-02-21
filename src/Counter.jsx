import axios from 'axios';
import './Counter.css';
import { useState, useEffect } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(0);


    useEffect(() => {
        const updateCounter = async () => {
            try {
                const counterKey = 'siega52-dot-me';
                const response = await axios.get('https://siega52.github.io/Dot-Me/');

                setCount(response.data.value);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка', error);
                setLoading(false);
            };
        };
        updateCounter();
    }, []);

    if (loading) return <div className="counter loading">...</div>

    return (
        <div className="visitor-counter">
            <span className="counter-text">Счётчик:{count}</span>
        </div>
    );
};

export default Counter; 