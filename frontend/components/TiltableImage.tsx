import React, {useEffect, useRef} from 'react';
import VanillaTilt from 'vanilla-tilt';
import styles from '../styles/generic.module.scss'

function initTilt(elem: HTMLDivElement) {
    VanillaTilt.init(elem, {
      'max-glare': 0.1,
      glare: true,
      max: 15,
      reverse: true,
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
      <div className={styles.tiltableImage} ref={ref}>
        {children}
      </div>
    )
}

export default TiltableImage;