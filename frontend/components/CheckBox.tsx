import React from 'react';
import styles from '../styles/generic.module.scss';

const CheckBox = ({checked}) : JSX.Element => {
    return (
      <input className={styles.checkBox} type="checkbox" checked={checked} disabled/>
    )
}

export default CheckBox