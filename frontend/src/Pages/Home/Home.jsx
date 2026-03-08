import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Home.module.css';
import { Sun, Moon, User } from 'lucide-react';
import logo from '../../assets/logo.svg';

function Home() {
    const navigate = useNavigate();
    const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark');
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const [showModal, setShowModal] = useState(false);
    const [tempName, setTempName] = useState('');

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

    const handlePlay = () => {
        if (!userName) {
            setShowModal(true);
        } else {
            navigate('/game', { state: { userName } });
        }
    };

    const handleSaveName = () => {
        if (tempName.trim()) {
            localStorage.setItem('userName', tempName.trim());
            setUserName(tempName.trim());
            setShowModal(false);
            setTempName('');
            navigate('/game', { state: { userName: tempName.trim() } });
        }
    };

    const handleChangeUser = () => {
        setUserName('');
        localStorage.removeItem('userName');
        setShowModal(true);
    };

    return (
        <>
            <div className={styles.homeContainer}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="Preguntados Logo" />
                    <h1>Preguntados</h1>
                </div>

                <p>¿List@ para jugar?</p>
                <button onClick={handlePlay}>Jugar</button>
                {userName && (
                    <div className={styles.userInfo}>
                        <p>Jugando como: <strong>{userName}</strong></p>
                        <button onClick={handleChangeUser} className={styles.changeUserBtn}>
                            <User size={24} /> Cambiar Usuario
                        </button>
                    </div>
                )}
                <div className={styles.historialButtonContainer}>
                    <button onClick={() => navigate('/historial')} className={styles.historialButton}>
                        Ver Historial
                    </button>
                </div>

                <div className={styles.footer}>
                    <p>&copy; 2026 Ltrejos. Todos los derechos reservados.</p>
                </div>
            </div>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Ingresa tu nombre</h2>
                        <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            placeholder="Tu nombre"
                            onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
                        />
                        <div className={styles.modalButtons}>
                            <button onClick={handleSaveName}>Jugar</button>
                            <button onClick={() => setShowModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.themeToggle}>
                <button onClick={toggleTheme} aria-label="Cambiar tema">
                    {dark ? <Moon /> : <Sun />}
                </button>
            </div>

        </>
    )
}

export default Home;