import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Home.module.css';
import { Sun, Moon } from 'lucide-react';

function Home() {
    const navigate = useNavigate();
    const [dark, setDark] = useState(false);


    useEffect(() => {
        if (dark) document.body.classList.add('dark-theme');
        else document.body.classList.remove('dark-theme');
    }, [dark]);

    const toggleTheme = () => setDark(prev => !prev);

    return (
        <>
            <div className={styles.homeContainer}>
                <div className={styles.logoContainer}>
                    <img src="/src/assets/logo.svg" alt="Preguntados Logo" />
                    <h1>Preguntados</h1>
                </div>

                <p>Listo para jugar?</p>
                <button onClick={() => navigate("/game")}>Jugar</button>

                <div className={styles.footer}>
                    <p>&copy; 2024 Luis Trejos. Todos los derechos reservados. </p>
                </div>
            </div>
            <div className={styles.themeToggle}>
                <button onClick={toggleTheme} aria-label="Cambiar tema">
                    {dark ? <Moon /> : <Sun />}
                </button>
            </div>
        </>
    )
}

export default Home;