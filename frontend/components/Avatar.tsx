import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.scss';

interface Profile {
    id: string
    name: string
    profile_image_url: string
    username: string
}

const Avatar = () => {

    return (
        <div className={styles.avatar}>
            <Link href="/">
                <Image
                    src={"/tweeter.jpg"}
                    alt="Twitter Profile Pic"
                    width={60}
                    height={60}
                />
            </Link>
        </div>
        
        
    )
}

export default Avatar

  