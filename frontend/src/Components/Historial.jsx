import React from 'react';
import { Sun, Moon, History, X } from 'lucide-react';
import styles from './Historial.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Historial() {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark');

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

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/results');
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        fetchResults();
    }, []);


    return (
        <>
            <div className={styles.historialContainer}>
                <div className={styles.logoContainer}>
                    <History size={50} />
                    <h1>Historial de Partidas</h1>
                </div>
                <div className={styles.resultsContainer}>
                    {results.length === 0 ? (
                        <p>No hay resultados para mostrar.</p>
                    ) : (
                        <table className={styles.resultsTable}>
                            <thead>

                                <tr>
                                    <th>Jugador</th>
                                    <th>Puntaje</th>
                                    <th>Victoria</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((result, index) => (
                                    <tr key={index}>
                                        <td>{result.userName}</td>
                                        <td>{result.score}</td>
                                        <td>{result.win ? 'Sí' : 'No'}</td>
                                        <td>{new Date(result.date).toLocaleString('es-CR')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <button className={styles.closeButton} onClick={() => navigate('/')}> <X size={32} /> </button>

            </div>
            <div className={styles.themeToggle}>
                <button onClick={toggleTheme} aria-label="Cambiar tema">
                    {dark ? <Moon /> : <Sun />}
                </button>
            </div>
        </>
    );
}

export default Historial;