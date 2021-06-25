import React from 'react';
import Github from '../public/github.svg';
import Twitter from '../public/twitter.svg';
import Linkedin from '../public/linkedin.svg';
import Medium from '../public/medium.svg';
import styles from '../styles/Footer.module.scss';

const SVG = ({children, link}) => {

    return (
        <a href={link} rel="noreferrer" target="_blank">
            <div className={styles.svg}>
                {children}
            </div>
        </a>
        
    )
}

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.links}>
            <SVG link="https://twitter.com/_alined_">
                <Twitter width={23} height={23} viewBox="0 0 24 19.5"/>
            </SVG>
            <SVG link="https://github.com/alined908">
                <Github width={23} height={23} viewBox="0 0 24 19.5"/>
            </SVG >
            <SVG link="https://notalined.medium.com/">
                <Medium width={23} height={23} viewBox="0 0 24 19.5"/>
            </SVG>
            <SVG link="https://www.linkedin.com/in/daniel-lee-8347a6166">
                <Linkedin width={23} height={23} viewBox="0 0 24 19.5"/>
            </SVG>
        </div>
        <div>

        </div>
    </footer>
)

export default Footer