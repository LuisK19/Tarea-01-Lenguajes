import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Results.module.css';
import { Sun, Moon } from 'lucide-react';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, totalQuestions, userName, win } = location.state || { score: 0, totalQuestions: 0, userName: 'Jugador', win: false };
    const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark');

    // Aplicar tema
    useEffect(() => {
        if (dark) document.body.classList.add('dark-theme');
        else document.body.classList.remove('dark-theme');
    }, [dark]);

    const toggleTheme = () => {
        setDark(prev => {
            const newDark = !prev;
            localStorage.setItem('theme', newDark ? 'dark' : 'light');
            return newDark;
        });
    };

    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const isWinner = win;

    const handlePlayAgain = () => {
        navigate('/');
    };

    return (
        <div className={styles.resultsContainer}>
            <div className={styles.themeToggle}>
                <button onClick={toggleTheme} aria-label="Cambiar tema">
                    {dark ? <Moon /> : <Sun />}
                </button>
            </div>

            <div className={styles.resultsCard}>
                <h1>¡Juego Terminado!</h1>
                <h2>Hola, {userName}</h2>
                <div className={styles.scoreDisplay}>
                    <p className={styles.scoreText}>Tu puntaje: {score} / {totalQuestions}</p>
                    <p className={styles.percentageText}>{percentage}% de aciertos</p>
                </div>
                <div className={`${styles.resultMessage} ${isWinner ? styles.winner : styles.notWinner}`}>
                    {isWinner ? '¡Felicitaciones! ¡Respondiste todas correctamente!' : '¡Buen intento! Sigue practicando.'}
                </div>
                <button className={styles.playAgainButton} onClick={handlePlayAgain}>
                    Jugar de Nuevo
                </button>
            </div>
        </div>
    );
};

export default Results;