import React, { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import dynamic from 'next/dynamic'

const DynamicDeck = dynamic(
  () => import('../components/Deck'),
  { ssr: false }
)

const cards = [
  {src: '/me.jpg', alt: 'Pic of me', name: "Daniel"},
  {src: '/15623mask.jpeg', alt: 'Mask #15623', name: "Mask #15623"},
  {src: '/punk7171.png', akt: "Punk #7171", name: "Punk #7171"}
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
  const [currentCard, setCurrentCard] = useState(shuffledCards[shuffledCards.length - 1]);

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
          <div className={styles.hello}>
            Hey! I'm {currentCard.name}.
          </div>
          <div>
            Welcome to my site.
          </div>
        </div>
      </div> 
    </>
  )
}

export default Home