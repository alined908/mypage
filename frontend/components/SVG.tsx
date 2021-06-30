import React from 'react';
import styles from '../styles/generic.module.scss';

const SVG = ({children, link}) => {

    return (
        <a href={link} rel="noreferrer" target="_blank">
            <div className={styles.svg}>
                {children}
            </div>
        </a>
        
    )
}

export default SVG