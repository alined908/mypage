import React, {useState} from 'react';
import {navigationTabs, NavigationTab, Header} from './Header';
import Main from './Main';
import Footer from './Footer';
import { useMediaQuery } from 'react-responsive'
import styles from '../styles/Header.module.scss';

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

const Layout = (props) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const [mobileHeaderOpen, setOpen] = useState(false);
    const { children } = props

    return (
      <div className='layout'>
        <Header isTabletOrMobile={isTabletOrMobile} setOpen={() => setOpen(!mobileHeaderOpen)}/>
        <Main children={children}/>
        <Footer/>
        {mobileHeaderOpen && <NavigationMobile close={() => setOpen(false)}/>}
      </div>
    );
}

export default Layout