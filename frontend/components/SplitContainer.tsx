import React from 'react';
import styles from '../styles/generic.module.scss';

const SplitContainer = ({children}) => {
    return (
        <div className={styles.splitContainer}>
            {children}
        </div>
    )
}

const ContainerLeft = ({children}) => {
    return (
        <div className={styles.leftGrid}>
            {children}
        </div>
    )
}

const ContainerRight = ({children}) => {
    return (
        <div className={styles.rightGrid}>
            {children}
        </div>
    )
}

export {SplitContainer, ContainerLeft, ContainerRight}