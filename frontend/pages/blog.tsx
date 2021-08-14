import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Head from 'next/head';
import blogStyles from '../styles/blog.module.scss';
import genericStyles from '../styles/generic.module.scss';
import posts from '../constants/posts';
import { AnimatedLoadDiv } from '../components/TextBox';

const styles = {...genericStyles, ...blogStyles};

type PostProps = {
    title: string
    link: string
    date: Date,
    image: string
    description: string
    duration: number
}

const Post = ({title, link, date, image, description, duration} : PostProps) : JSX.Element => {
    
    return (
        <a href={link} rel="noreferrer" target="_blank">
            <div className={styles.post}>
                <Image
                    src={image}
                    alt={title}
                    width={350}
                    height={210}
                    placeholder="blur"
                    blurDataURL={image}
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
        <>
            <Head>
                <title>Blog</title>
                <meta name="description" content="Personal Website" />
            </Head>
            <div className={styles.container}>
                <div className={styles.posts}>   
                    {posts.map((post, index) => 
                        <AnimatedLoadDiv position={index}>
                            <Post 
                                title={post.title} 
                                link={post.link} 
                                image={post.image} 
                                date={post.date} 
                                description={post.description} 
                                duration={post.duration}
                            />
                        </AnimatedLoadDiv>
                        
                    )}
                    
                </div>
            </div>
        </>
    )
}

export default Blog