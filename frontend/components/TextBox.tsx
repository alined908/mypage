import React from "react";
import styles from '../styles/generic.module.scss';

const TextBox = ({children}) : JSX.Element => {
    return (
        <div className={styles.textBox}>
            {children}
        </div>   
    )
}

interface TextBoxSubHeaderProps {
    title: string
    children: React.ReactNode
}

const TextBoxSubHeader = ({title, children} : TextBoxSubHeaderProps) : JSX.Element => {
    return (
        <h2 className={styles.subHeader}>
            {children} <span className={styles.subHeaderTitle}>{title}</span>
        </h2>
    )
}

const TextBoxUnorderedList = ({children}) : JSX.Element => {
    return (
        <ul>
            {children}
        </ul>
    )   
}
 
const TextBoxListItem = ({children}) : JSX.Element => {
    return (
        <li>
            {children}
        </li>
    )
}


export {TextBox, TextBoxSubHeader, TextBoxUnorderedList, TextBoxListItem}