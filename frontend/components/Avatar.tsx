import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.scss';
import axios from "axios";

interface Profile {
    id: string
    name: string
    profile_image_url: string
    username: string
}

const Avatar = () => {

    const [profile, setProfile] = useState<Profile>(null);

    const getAvatar = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/avatar');
            console.log(response);
            const profile = response.data.body.data;
            setProfile(profile);
        } catch(e) {
            console.log(e);
        }
    }

    const processAvatar = () => {
        return profile ? profile.profile_image_url.replace("_normal", "") : "/me.jpg"
    }

    useEffect(() => {
        getAvatar()
    }, [])

    return (
        <div className={styles.avatar}>
            <Link href="/">
                <Image
                    src={processAvatar()}
                    alt="Twitter Profile Pic"
                    width={60}
                    height={60}
                />
            </Link>
        </div>
        
        
    )
}

export default Avatar

  