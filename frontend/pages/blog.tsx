import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import styles from '../styles/generic.module.scss';

type PostProps = {
    title: string
    link: string
    date: Date,
    image: string
    description: string
}

const posts : PostProps[] = [
    {
        title: "THORChain Overview", 
        date: new Date(2021, 6, 20), 
        link: "https://notalined.medium.com/thorchain-overview-216d810d8e03", 
        image: '/thorchain.jpg', 
        description: "An overview on THORChain. What is it? How does it work? Diving deep into cross chain exchanges."}
]

const Post = ({title, link, date, image, description} : PostProps) => {
    return (
        <a href={link} rel="noreferrer" target="_blank">
            <div className={styles.post}>
                <Image
                    src={image}
                    alt="THORChain"
                    width={350}
                    height={210}
                />
                <div className={styles.postInfo}>
                    <div className={styles.postDate}>
                        {moment(date).format('YYYY-MM-DD')}
                    </div>
                    <div className={styles.postTitle}>
                        {title}
                    </div>
                    <div className={styles.postDescription}>
                        {description}
                    </div>
                </div>
                
            </div>
         </a>
    )
}

const Blog = () => {

    return (
        <div className={styles.container}>
            <div className={styles.inner}>   
                <div className={styles.header}>
                    
                </div>
                <div className={styles.blurb}>
                   {posts.map((post) => 
                       <Post title={post.title} link={post.link} image={post.image} date={post.date} description={post.description}></Post>
                   )}
                </div>
            </div>
           
        </div>
    )
}

export default Blog