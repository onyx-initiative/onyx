import React from 'react'
import Image from 'next/image'
import styles from '../../../styles/components/Navbar.module.css'
import { useSession, signOut } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import { GET_SCHOLAR_BY_EMAIL } from '../../../graphql/queries/scholarQueries';
import { Popover, Text, Button } from '@mantine/core';
import { useRouter } from 'next/router';

// May just be a placeholder for now
// Make a single profile type w/ optional params
type ProfilePhoto = {
    name: string;
    profilePhoto?: string;
    scholar_id: string;
}

export default function ProfilePhoto(props: ProfilePhoto) {
    const { name, profilePhoto, scholar_id } = props;
    const router = useRouter();

    return (
        // @todo: Make the popover dynamic
        <Popover width='target' position="bottom-start">
            <Popover.Target>
                <div className={styles.navbarProfile}>
                    <div className={styles.navbarPhoto}>
                        {profilePhoto ? 
                        <Image
                            className={styles.navbarPic}
                            src={profilePhoto}
                            alt={name}
                            width={60}
                            height={60}
                        /> : 
                        <div className={styles.navbarPic}>
                            {getInitials(name)}
                        </div>
                        }
                    </div>
                    <div>
                        <h3>{name.split(' ')[0]}</h3>
                    </div>
                </div>
            </Popover.Target>
            <Popover.Dropdown>
                <button className={styles.profileButton} onClick={() => 
                    router.push({
                        pathname: '/Views',
                        query: { scholar_id: scholar_id }
                    })
                }>My Views</button>
                <button className={styles.profileButton} onClick={() => signOut()}>Logout</button>
          </Popover.Dropdown>
        </Popover>
    )
}

const getInitials = (name: string) => {
    const initial = name.charAt(0).toUpperCase();   
    return initial;
}
