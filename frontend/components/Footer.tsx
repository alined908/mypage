import React from 'react';
import styles from '../styles/Footer.module.scss';
import SVG from './SVG';

const Github = require('../public/github.svg');
const Twitter = require('../public/twitter.svg');
const Linkedin = require('../public/linkedin.svg');
const Medium = require('../public/medium.svg');

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.links}>
            <SVG link="https://twitter.com/alinedxyz">
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