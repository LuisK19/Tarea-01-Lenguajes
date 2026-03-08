import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Game.module.css';
import { Sun, Moon } from 'lucide-react';

function Game() {
    const location = useLocation();
    const navigate = useNavigate();
    const { userName } = location.state || {};
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
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

    // Si no hay userName, redirigir a home
    useEffect(() => {
        if (!userName) {
            navigate('/');
        }
    }, [userName, navigate]);

    // Cargar preguntas
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/questions/random');
                setQuestions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error loading questions:', error);
                setLoading(false);
            }
        };

        if (userName) {
            loadQuestions();
        }
    }, [userName]);

    const handleOptionSelect = async (selectedOption) => {
        setSelectedOption(selectedOption);

        try {
            const response = await axios.post('http://localhost:5000/api/questions/check', {
                questionId: questions[currentQuestionIndex].id,
                selectedOption
            });

            const { isCorrect: backendIsCorrect, correctAnswer: backendCorrect } = response.data;
            setIsCorrect(backendIsCorrect);
            setCorrectAnswer(backendCorrect);
            console.log('Backend response:', { backendIsCorrect, backendCorrect });

            if (backendIsCorrect) {
                setScore(prev => prev + 1);
            }

            setShowResult(true);

        } catch (error) {
            console.error('Error checking answer:', error);
        }
    };

    const handleNextQuestion = () => {
        setShowResult(false);
        setSelectedOption(null);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            finishGame();
        }
    };

    const handleExit = () => {
        // Terminar como pérdida
        finishGame();
    };

    const finishGame = async () => {
        const win = score >= 7; // Gana si acierta 7 o más de 10

        try {
            await axios.post('http://localhost:5000/api/results', {
                userName,
                score,
                win
            });

            navigate('/results', { state: { userName, score, win, totalQuestions: questions.length } });
        } catch (error) {
            console.error('Error saving result:', error);
            // Aún así navegar a results
            navigate('/results', { state: { userName, score, win, totalQuestions: questions.length } });
        }
    };

    if (!userName) {
        return <div className={styles.loading}>Cargando...</div>;
    }

    if (loading) {
        return <div className={styles.loading}>Cargando preguntas...</div>;
    }

    if (questions.length === 0) {
        return <div className={styles.loading}>Error al cargar preguntas</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className={styles.gameContainer}>
            <div className={styles.themeToggle}>
                <button onClick={toggleTheme} aria-label="Cambiar tema">
                    {dark ? <Moon /> : <Sun />}
                </button>
            </div>

            <div className={styles.header}>
                <h2>Pregunta {currentQuestionIndex + 1} de {questions.length}</h2>
                <p>Puntuación: {score}</p>
            </div>

            <div className={styles.questionBox}>

                <h3>{currentQuestion.question}</h3>
            </div>

            <div className={styles.optionsContainer}>
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        className={`${styles.optionButton} ${
                            showResult ? (
                                option === correctAnswer ? styles.correct :
                                selectedOption === option ? styles.incorrect : ''
                            ) : ''
                        }`}
                        onClick={() => !showResult && handleOptionSelect(option)}
                        disabled={showResult}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <button className={styles.exitButton} onClick={handleExit}>
                Salir
            </button>

            {showResult && (
                <div className={styles.resultModal}>
                    <div className={styles.resultModalContent}>
                        <h3 className={isCorrect ? styles.correct : styles.incorrect}>
                            {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                        </h3>
                        {!isCorrect && (
                            <p>La respuesta correcta es: <strong>{correctAnswer}</strong></p>
                        )}
                        <button onClick={handleNextQuestion}>
                            {currentQuestionIndex < questions.length - 1 ? 'Siguiente' : 'Ver Resultados'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Game;