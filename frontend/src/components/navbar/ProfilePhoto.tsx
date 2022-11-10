import React from 'react'
import Image from 'next/image'
import styles from '../../../styles/components/Navbar.module.css'

// May just be a placeholder for now
// Make a single profile type w/ optional params
type ProfilePhoto = {
    name: string;
    profilePhoto?: string;
}

export default function ProfilePhoto(props: ProfilePhoto) {
    const { name, profilePhoto } = props;

    return (
        <div className={styles.navbarProfile}>
            <div className={styles.navbarPhoto}>
                {profilePhoto ? 
                <Image
                    className='profile-photo'
                    src={profilePhoto}
                    alt={name}
                    width={60}
                    height={60}
                /> : 
                <div className='profile-photo'>
                    {getInitials(name)}
                </div>
                }
            </div>
            <div>
                <h3>{name.split(' ')[0]}</h3>
            </div>
        </div>
    )
}

const getInitials = (name: string) => {
    const names = name.split(' ');
    const initial = names[0].charAt(0).toUpperCase();   
    return initial;
}
