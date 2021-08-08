import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import dynamic from 'next/dynamic'
//@ts-ignore
import {useSpring, animated} from 'react-spring';

const DynamicDeck = dynamic(
  () => import('../components/Deck'),
  { ssr: false }
)

interface Card {
  src: string 
  alt: string
  name: string
}

const cards : Card[] = [
  {src: '/me.jpg', alt: 'Pic of me', name: "Daniel"},
  {src: '/15623mask.jpeg', alt: 'Mask #15623', name: "Mask #15623"},
  {src: '/punk7171.png', alt: "Punk #7171", name: "Punk #7171"},
  {src: '/pudgy8826.png', alt: "Pudgy 8826", name: "Pudgy Penguin #8826"}
]

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

const shuffledCards = shuffle(cards);

const Home = () => {
  //Shuffle deck to randomize appearance order
  const [currentCard, setCurrentCard] = useState<Card | null>(shuffledCards[shuffledCards.length - 1]);
  const [introStatus, displayIntro] = useState(false);
  const introProps = useSpring({
      opacity: introStatus ? 1 : 0,
      marginTop: introStatus ? 0 : -100
  })
  console.log(currentCard);

  useEffect(() => {
    setTimeout(() => displayIntro(true), 1200);
  }, [])

  return (
    <>
      <Head>
        <title>Alined</title>
        <meta name="description" content="Personal Website" />
      </Head>

      <div className={styles.container}>
        <div className={styles.avatar} id="avatar">
          <DynamicDeck shuffledCards={shuffledCards} setCurrentCard={setCurrentCard}/>
        </div>
        <div className={styles.welcome}>
          {introStatus && 
            <animated.div style={introProps}>
              <div className={styles.hello}>
                Hi!  I'm {currentCard ? currentCard.name : "Alined"}.
              </div>
            </animated.div>
          }
        </div>
      </div> 
    </>
  )
}

export default Home