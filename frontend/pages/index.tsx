import React, {useEffect, useRef} from 'react';
import Head from 'next/head'
import Image from 'next/image';
import styles from '../styles/Home.module.scss'
import VanillaTilt from 'vanilla-tilt';

function initTilt(elem: HTMLDivElement) {
  VanillaTilt.init(elem, {
    'max-glare': 0.1,
    glare: true,
    max: 15,
    "full-page-listening":  true,
  });
}

const TiltableImage = (props) => {
  const {children} = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    initTilt(ref.current);
  }, [ref])

  return (
    <div className={styles.tiltableimage} ref={ref}>
      {children}
    </div>
  )
}

const Home = () => {

  return (
    <>
      <Head>
        <title>alined.mirror.xyz</title>
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
            <div>
              Feel free to explore to find out what interests me.
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