import React from 'react'
import useSetBodyColor from '../hooks/bodyColor'
import styles from '../cssModules/HomePage.module.scss'

const HomePage = () => {

    useSetBodyColor({color: '#FFFFFF'})
    
    return (
        <main className={styles.mainHome}>
            <section className={styles.homePageHero}>
                <h1><span className={styles.my}>my</span><span className={styles.folio}>folio</span></h1>
                <p>create your personal portfolio in minutes!</p>
            </section>
        </main>
    )
}

export default HomePage