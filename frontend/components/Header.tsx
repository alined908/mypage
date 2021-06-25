import React, { useState } from 'react';
import Link from 'next/link';
import Avatar from './Avatar';
import styles from '../styles/Header.module.scss';


export const navigationTabs = [
    {link: '/about', name: 'About'},
    {link: '/blog', name: 'Blog'},
    {link: '/nft', name: 'NFT'}
]

type NavigationTabProps = {
    link: string,
    name: string,
    responsive: boolean
    close: () => void
}

export const NavigationTab = ({link, name, close}: NavigationTabProps) => (
    <Link href={link}>
        <div className={styles.navigationTab} onClick={close}>
            {name}
        </div>
    </Link>
)

const NavigationSection = ({setOpen}) => (

    <div className={styles.navigation}>
        {navigationTabs.map((tab) => 
            <NavigationTab link={tab.link} name={tab.name} responsive={false} close={null}/>
        )}

        <div className={styles.burger} onClick={setOpen}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
)

const ProfileSection = () => (
    <div className={styles.profile}>
        <Avatar></Avatar>
        <div className={styles.names}>
            <div className={styles.name}>
                Daniel Lee
            </div>
            <div className={styles.link}>
                alined.eth
            </div>
        </div>
    </div>
)

export const Header = ({isTabletOrMobile, setOpen}) => {
    
    return (
        <div className={styles.header}>
            <ProfileSection/>
            <NavigationSection setOpen={setOpen}/>
        </div>
    )
}