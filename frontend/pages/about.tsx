import React from 'react';
import styles from '../styles/generic.module.scss';

const About = () => {
    return (
        <div className={styles.container}>
            <div className={styles.inner}>   
                <div className={styles.header}>
                    About Me
                </div>
                <div className={styles.blurb}>
                    Since I was young, I've always been incredibly interested in games because of the competitive nature it fosters and the ability to be immersed into a separate reality. 
                    In college, I explored my gaming passions by playing professionally in a game called Overwatch, serving as the first president of the esports program at Cal, and doing data analysis for San Francisco Shock.
                    While pursuing my gaming passions, I ended up majoring in economics and minoring in computer science, two other fields that piqued my interest.      
                    Now, much of my free time is spent trying to dive deeper what I believe is the ultimate intersection of those interests, the emerging world of crypto/defi/web3/metaverse. An open, transparent, permissionless system that empowers individuals economically sounds awesome!
                </div>
            </div>
           
        </div>
    )
}

export default About