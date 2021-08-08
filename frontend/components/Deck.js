import React, { useEffect, useState } from 'react';
import { useSprings, animated, interpolate} from 'react-spring'
import { useGesture } from 'react-use-gesture';


const toParams = (i) => ({x: 0, y: i * -10, scale: 1, rotation: -10 + Math.random() * 20, delay: i * 100})
const fromParams = (i) => ({x: 0, y: -300 * i, rotation: 0, scale: 1.5})
const trans = (r, s) => `perspective(1500px) rotateX(0deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;
const randomizeDirection = () => Math.random() < 0.5 ? 1 : -1;

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

const Deck = ({shuffledCards}) => {
  
  const [cards, setCards] = useState(shuffledCards);
  //Initialize a used Set to keep track of discarded cards
  const [used] = useState(() => new Set());
  //Initialize springs on cards, specifying to and from css params
  const [springs, setSprings] = useSprings(shuffledCards.length, index => ({to: toParams(index), from: fromParams(index)}));

  //Create draggable animated.div 
  const bind = useGesture(({ args: [index], down, delta: [xDelta, yDelta], direction: [xDir], distance, velocity }) => {
    //Check if exceed speed threshold
    const speedTrigger = velocity > 0.2;
    //Check if user tapped
    const tapped = distance < 4;
    //Random direction if tapped. Direction dragged towards if dragged.
    const dir = tapped ? randomizeDirection() : xDir < 0 ? -1 : 1;
    //If let go & speed threshold met or tapped then add to used pile
    if (!down && (speedTrigger || tapped)) {
      used.add(index);
    }
    //Control current spring movement + appearance
    setSprings(currentSpring => {
      if (index !== currentSpring) return
      const isUsed = used.has(index);
      const x = isUsed ? (100 + window.innerWidth) * dir : down ? xDelta : 0;
      const y = tapped && isUsed ? (window.innerHeight * Math.random() * randomizeDirection()) : down ? yDelta : currentSpring * -10;
      const rotation = xDelta / 100 + (isUsed ? dir * 10 * velocity : 0)
      const scale = down ? 1.1 : 1
      return {x, y, rotation, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isUsed ? 200 : 500 }}
    })
    //If all cards used, then shuffle and reset
    if (!down && used.size === shuffledCards.length) {
      setTimeout(() => {
        setCards([...shuffle(shuffledCards)]);
        used.clear();
        setSprings(i => toParams(i));
      }, 600);
    };
  })

  return (
    <>
      {springs.map(({x, y, rotation, scale}, i) => (
        <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)}}>
          <animated.div 
            {...bind(i)} 
            style={{ transform: interpolate([rotation, scale], trans), backgroundImage: `url(${cards[i].src})` }} 
          />
        </animated.div>)
      )}
    </>  
  )
}

export default Deck;