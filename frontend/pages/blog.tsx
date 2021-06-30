import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import postStyles from '../styles/post.module.scss';
import genericStyles from '../styles/generic.module.scss';

const styles = {...genericStyles, ...postStyles};

type PostProps = {
    title: string
    link: string
    date: Date,
    image: string
    description: string
    duration: number
}

const posts : PostProps[] = [
    {
        title: "⚡ THORChain Overview", 
        date: new Date(2021, 6, 20), 
        link: "https://notalined.medium.com/thorchain-overview-216d810d8e03", 
        image: '/thorchain.jpg', 
        description: "What is THORChain? How does it work? Why is it important?",
        duration: 7
    }
]

const Post = ({title, link, date, image, description, duration} : PostProps) : JSX.Element => {
    
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
                    <h2 className={styles.postTitle}>
                        {title}
                    </h2>
                    <div className={styles.postTime}>
                        <div className={styles.postDate}>
                            {moment(date).format('MMM Do YYYY')}
                        </div>
                        <div className={styles.separator}>
                            •
                        </div>
                        <div>
                            {duration} min read
                        </div>
                    </div>
                    
                    <div className={styles.postDescription}>
                        {description}
                    </div>
                </div>
                
            </div>
         </a>
    )
}

const Blog = () : JSX.Element => {

    return (
        <div className={styles.container}>
            <div className={styles.inner}>   

                {posts.map((post) => 
                    <Post 
                        title={post.title} 
                        link={post.link} 
                        image={post.image} 
                        date={post.date} 
                        description={post.description} 
                        duration={post.duration}
                    />
                )}
                
            </div>
        </div>
    )
}

export default Blog