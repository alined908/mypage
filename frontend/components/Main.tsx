import React from 'react';
import styles from '../styles/Main.module.scss';

const Main = (props) => {
    const { children } = props
    
    return (
        <main className={styles.main}>
            {children}
        </main>
    )
}

export default Main