import React, {useState} from 'react';
import {navigationTabs, NavigationTab, Header} from './Header';
import Main from './Main';
import Footer from './Footer';
import { useMediaQuery } from 'react-responsive'
import styles from '../styles/Header.module.scss';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
//@ts-ignore
import {useSpring, animated} from 'react-spring';

const NavigationMobile = ({close}) => {
  return (
      <div className={styles.navigationMobile}>
          <div className={styles.close} onClick={close}>

          </div>
          <div className={styles.navigationLinks}>
              {navigationTabs.map((tab) => 
                  <NavigationTab link={tab.link} name={tab.name} responsive={true} close={close}/>
              )}
          </div>
      </div>
  )
}

const Layout = ({children}) => {
    const router = useRouter()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const [mobileHeaderOpen, setOpen] = useState(false);
    const [displayHeader, setDisplayHeader] = useState(router.pathname !== '/');
    const [displayFooter, setDisplayFooter] = useState(router.pathname !== '/');
    const headerProps = useSpring({
      opacity: displayHeader ? 1 : 0,
      marginTop: displayHeader ? 0 : -50
    })
    const footerProps = useSpring({
      opacity: displayFooter ? 1 : 0,
      marginBottom: displayFooter ? 0 : -50
    })

    useEffect(() => {
      if (displayHeader === false) {
        setTimeout(() => setDisplayHeader(true), 2000)
        setTimeout(() => setDisplayFooter(true), 3000);
      }
    }, [])

    return (
      <div className='layout'>
        <animated.div style={headerProps}>
          <Header isTabletOrMobile={isTabletOrMobile} setOpen={() => setOpen(!mobileHeaderOpen)}/>
        </animated.div>
        <Main children={children}/>
        <animated.div style={footerProps}>
          <Footer/>
        </animated.div>
        {mobileHeaderOpen && <NavigationMobile close={() => setOpen(false)}/>}
      </div>
    );
}

export default Layout