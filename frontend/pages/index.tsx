import React from 'react';
import Head from 'next/head'
import Image from 'next/image';
import styles from '../styles/Home.module.scss'
import TiltableImage from '../components/TiltableImage';

const Home = () => {

  return (
    <>
      <Head>
        <title>Alined</title>
        <meta name="description" content="Personal Website" />
      </Head>

      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.avatar}>
            <TiltableImage>
              <Image
                src="/me.jpg"
                alt="Pic of me"
                width={300}
                height={400}
              />
            </TiltableImage>
          </div>
          <div className={styles.welcome}>
            <div className={styles.hello}>
              Hi! I'm Daniel.
            </div>
            <div className={styles.hello}>
              Welcome to my corner of the internet.
            </div>
            <div className={styles.contact}>
              DM on Twitter if you'd like to talk.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home