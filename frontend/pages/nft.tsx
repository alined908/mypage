import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import Image from 'next/image';
import Head from 'next/head';
import genericStyles from '../styles/generic.module.scss';
import nftStyles from '../styles/nft.module.scss';
import AlinedTicket from '../artifacts/AlinedTicket.json';
import { burnTicketError, burnTicketSuccess, connectAccountError, mintTicketError, mintTicketSuccess, wrongNetworkError } from '../actions/notifications';
import SVG from '../components/SVG';
import CheckBox from '../components/CheckBox';
import { Emoji } from '../components/Emoji';
import { TextBox, TextBoxSubHeader, TextBoxUnorderedList, TextBoxListItem, ContainerTextBoxes, AnimatedLoadDiv } from '../components/TextBox';
import { SplitContainer, ContainerLeft, ContainerRight } from '../components/SplitContainer';

const ticketAddress = "0x192d6AD08d70c9a94BFF20763ca08D01D23DD8e6";
const nftImage = "https://gateway.pinata.cloud/ipfs/QmbwZi3Uw3Pwh4eiMibWycc9rufxd5bEYqujaoiws9ZEvc";
const styles = {...genericStyles, ...nftStyles};
const MetaMaskSVG = require('../public/metamask.svg');
declare let window: any;

const NFT = () => {
    const [account, setAccount] = useState(null);
    const [minted, setMinted] = useState(false);
    const [burned, setBurned] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ticket, setTicket] = useState(null);
    const [metaMaskDownloaded, setMetaMaskDownloaded] = useState(false);

    useEffect(() => {
      checkMetaMaskDownloaded();
      //requestAccount();
      //checkConnected();
    }, [])

    const isConnected = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.listAccounts();
      return accounts.length > 0;
    }

    const checkConnected = async () => {
      const isAccountConnected = await isConnected();

      if (isAccountConnected) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);
      }
    }

    const checkMetaMaskDownloaded = () : void => {
      if (typeof window.ethereum !== 'undefined'){
        setMetaMaskDownloaded(window.ethereum.isMetaMask);
      }
    }

    // Access to Metamask account
    async function requestAccount() {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    const isNetworkRinkeby = () => {
      return window.ethereum.networkVersion === '4';
    }

    const connectAccount = async () => {
      if (typeof window.ethereum !== 'undefined'){
        await requestAccount()
        if (!isNetworkRinkeby()){
          wrongNetworkError();
          return false;
        };
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ticketAddress, AlinedTicket.abi, provider)
        const address = await signer.getAddress();
        setLoading(true);

        try {
          const data = await contract.balanceOf(address);
          const existData = await contract.tokenIDOwnedByAddress(address);
          const minted = data.toNumber() === 1 || existData.toNumber() >= 1;
          const burned = data.toNumber() === 0 && existData.toNumber() >= 1;

          if (minted || burned) {
            try {
              const tokenURI = await contract.tokenURI(existData.toNumber());
              setTicket(tokenURI);
            }
            catch (e) {
              console.log(e);
            }
          }

          setMinted(minted);
          setBurned(burned);
          setAccount(await signer.getAddress());
        } catch (err) {
          connectAccountError()
        }

        setLoading(false);
      }
    }

    const burnTicket = async () => {
      if (typeof window.ethereum !== 'undefined'){
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(ticketAddress, AlinedTicket.abi, provider).connect(signer)
        const address = await signer.getAddress();
        setLoading(true)

        try {
          const tokenID = await contract.tokenIDOwnedByAddress(address);
          const transaction = await contract.burn(tokenID);
          await transaction.wait()
          burnTicketSuccess();
          setBurned(true);
        } catch(e){
          burnTicketError();
        }

        setLoading(false)
      }
    }

    const mintTicket = async () => {
      if (typeof window.ethereum !== 'undefined'){
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(ticketAddress, AlinedTicket.abi, provider).connect(signer)
        const address = await signer.getAddress();
        setLoading(true)

        try {
          const transaction = await contract.mint(address)
          await transaction.wait()
          setMinted(true)
          mintTicketSuccess()
        } catch(e){
          mintTicketError()
        }  
        
        setLoading(false)
      }
    }

    return (
      <>
        <Head>
          <title>Golden Ticket</title>
          <meta name="description" content="Personal Website" />
        </Head>
        <SplitContainer>
          <ContainerLeft>   
            <AnimatedLoadDiv position={1}>
              <div className={`${styles.textBox} ${styles.responsiveImageContainer} ${styles.ticket}`}>
                <Image 
                  src={nftImage}
                  alt="Golden Ticket"
                  className={styles.responsiveImage}
                  layout='fill'
                  placeholder="blur"
                  blurDataURL={nftImage}
                />
              </div>
            </AnimatedLoadDiv>
            <AnimatedLoadDiv position={2}>
              <TextBox>
                <TextBoxSubHeader title="Info">
                    <Emoji label="info" icon="⚠️"/>
                </TextBoxSubHeader>
                <TextBoxUnorderedList>
                    <TextBoxListItem>
                      A set of digital tickets that can be redeemed for something in real life. 
                    </TextBoxListItem>
                    <TextBoxListItem>
                      It's possible the set of tickets is non-fungible in that some tickets may have different prizes or monetary values.
                    </TextBoxListItem>
                </TextBoxUnorderedList>
              </TextBox>
            </AnimatedLoadDiv>
            <AnimatedLoadDiv position={3}>
              <TextBox>
                <TextBoxSubHeader title="Rules">
                    <Emoji label="rules" icon="📜"/>
                </TextBoxSubHeader>
                <TextBoxUnorderedList>
                    <TextBoxListItem>
                      Rinkeby account needed with ether.
                    </TextBoxListItem>
                    <TextBoxListItem>
                      Each person can hold only one ticket at a time. 
                    </TextBoxListItem>
                    <TextBoxListItem>
                      Each person can only redeem one ticket.
                    </TextBoxListItem>
                    <TextBoxListItem>
                      Max supply of 50 tickets.
                    </TextBoxListItem>
                </TextBoxUnorderedList>
              </TextBox>
            </AnimatedLoadDiv>
          </ContainerLeft>
          <ContainerRight>
            <AnimatedLoadDiv position={4}>
              <TextBox>
                <TextBoxSubHeader title="Step 1 - Download MetaMask">
                  <CheckBox checked={metaMaskDownloaded}/>
                </TextBoxSubHeader>
                {!metaMaskDownloaded && 
                  <TextBoxUnorderedList>
                    <TextBoxListItem>
                      MetaMask is a browser extension that let's you interact with Ethereum dapps and is an interface to view your wallet.  
                    </TextBoxListItem>
                    <SVG link="https://metamask.io/">
                      <MetaMaskSVG width={40} height={40} viewBox="0 0 40 40"/>
                    </SVG>
                  </TextBoxUnorderedList>
                }
            </TextBox>
           </AnimatedLoadDiv>
           <AnimatedLoadDiv position={5}>
            <TextBox>
                <TextBoxSubHeader title="Step 2 - Connect to Metamask">
                  <CheckBox checked={account}/>
                </TextBoxSubHeader>
                <TextBoxUnorderedList>
                  {metaMaskDownloaded && !account && 
                    <div className={styles.wallet}>
                      <button className={styles.button} onClick={connectAccount}>
                        {loading && <div className={styles.spinner}></div>}
                        Connect Wallet
                      </button> 
                    </div>
                  }
                </TextBoxUnorderedList>
            </TextBox>
          </AnimatedLoadDiv>
          <AnimatedLoadDiv position={6}>
            <TextBox>
              <TextBoxSubHeader title="Step 3 - Mint Ticket">
                <CheckBox checked={account && minted}/>
              </TextBoxSubHeader>
              <TextBoxUnorderedList>
                {account && !minted &&
                  <div className={styles.wallet}>
                    <button className={styles.button} onClick={mintTicket} disabled={loading}>
                      {loading && <div className={styles.spinner}></div>}
                      Mint Ticket
                    </button> 
                  </div>
                }
                {account && minted &&
                  <>
                    <TextBoxListItem>
                      You have a minted ticket! Examine it, hold it, or burn it!
                    </TextBoxListItem>
                    <TextBoxListItem>
                      IPFS JSON Hash - <a href={ticket} rel="noreferrer" target="_blank">Link</a>
                    </TextBoxListItem>
                  </>
                }
              </TextBoxUnorderedList>
            </TextBox> 
           </AnimatedLoadDiv>
           <AnimatedLoadDiv position={7}>
            <TextBox>
                <TextBoxSubHeader title="Step 4 - Burn Ticket">
                  <CheckBox checked={account && minted && burned}/>
                </TextBoxSubHeader>
                <TextBoxUnorderedList>
                  {account && minted && !burned && 
                    <div className={styles.wallet}>
                      <button className={styles.button} onClick={burnTicket} disabled={loading}>
                        {loading && <div className={styles.spinner}></div>}
                        Burn Ticket
                      </button> 
                    </div>
                  }
                  {account && minted && burned &&
                    <>
                      <TextBoxListItem>
                        You have burned a ticket! Contact me for more details!
                      </TextBoxListItem>
                  </>
                  }
                </TextBoxUnorderedList>
            </TextBox>   
          </AnimatedLoadDiv>
        </ContainerRight>     
      </SplitContainer>
    </>
  )
}

export default NFT