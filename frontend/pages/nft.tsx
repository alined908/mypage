import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import Image from 'next/image';
import genericStyles from '../styles/generic.module.scss';
import nftStyles from '../styles/nft.module.scss';
import AlinedTicket from '../artifacts/AlinedTicket.json';
import { store } from 'react-notifications-component';

const ticketAddress = "0x192d6AD08d70c9a94BFF20763ca08D01D23DD8e6";
const styles = {...genericStyles, ...nftStyles};

declare let window: any;

const NFT = () => {
    const [account, setAccount] = useState(null);
    const [minted, setMinted] = useState(false);
    const [burned, setBurned] = useState(false);

    useEffect(() => {
      requestAccount();
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

    // Access to Metamask account
    async function requestAccount() {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    const connectAccount = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      
      const contract = new ethers.Contract(ticketAddress, AlinedTicket.abi, provider)
      const address = await signer.getAddress();
      try {
        const data = await contract.balanceOf(address)
        const existData = await contract.tokenIDOwnedByAddress(address);
        if (data.toNumber() === 1 || existData.toNumber() >= 1){
          setMinted(true);
        }

        if (data.toNumber() === 0 && existData.toNumber() >= 1) {
          setBurned(true);
        }
      } catch (err) {
        store.addNotification({
          title: "Error!",
          message: "Unable to retrieve information for address.",
          type: "error",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
      }

      setAccount(await signer.getAddress());
    }

    const burnTicket = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(ticketAddress, AlinedTicket.abi, provider).connect(signer)
      const address = await signer.getAddress();
      try {
        const tokenID = await contract.tokenIDOwnedByAddress(address);
        const transaction = await contract.burn(tokenID);
        await transaction.wait()
        store.addNotification({
          title: "Success!",
          message: "Burned ticket. Message to get free food.",
          type: "success",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
        setMinted(false);
        setBurned(true);
      } catch(e){
        store.addNotification({
          title: "Error!",
          message: "Unable to burn ticket.",
          type: "error",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
      }
    }

    async function mintTicket() {
      if (typeof window.ethereum !== 'undefined'){
        
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(ticketAddress, AlinedTicket.abi, provider).connect(signer)
        const address = await signer.getAddress();
        try {
          const transaction = await contract.mint(address)
          await transaction.wait()
          setMinted(true)
          store.addNotification({
            title: "Success",
            message: "Minted ticket!",
            type: "success",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          })
        } catch(e){
          store.addNotification({
            title: "Error",
            message: "Unable to mint ticket. Either you already have a ticket or you will need to try again.",
            type: "error",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          })
        }  
      }
    }

    return (
        <div className={styles.container}>
            <div className={styles.inner}>   
                <div className={styles.header}>
                    Golden Tickets
                </div>
                <div className={`${styles.responsiveImageContainer} ${styles.ticket}`}>
                  <Image 
                    src={"https://gateway.pinata.cloud/ipfs/QmbwZi3Uw3Pwh4eiMibWycc9rufxd5bEYqujaoiws9ZEvc"}
                    alt="Golden Ticket"
                    className={styles.responsiveImage}
                    layout='fill'
                  />
                </div>
                <div className={styles.nftblurb}>
                    <div>
                      <div className={styles.text}>
                        Trying something that I think could be fun. 
                        I've created a set of digital tickets (max circulating supply 50) with each ticket able to be burned in order to redeem something of value irl. Anyone can mint a token if they connect a wallet and pay a bit of gas to send the token to your wallet. Ask me if you need help with the process! 
                      </div>
                      <div className={styles.text}>
                        Rules
                        <hr/>
                        1. Rinkeby account needed with ether.
                        <br/>
                        2. Each person can hold only one ticket at a time. 
                        <br/>
                        3. Each person can only redeem one ticket.
                      </div>
                      <div className={styles.text}>
                        P.S. 
                        <hr/>
                        It's possible the set of tickets is non-fungible in that some tickets with different ids may have different monetary values or different prizes. (like yelp $, $$, $$$, $$$$). 
                      </div>
                    </div>
                    <div className={styles.wallet}>
                      {account ? 
                        (minted ? 
                          (burned ?
                            <button className={styles.buttonDisabled} disabled={true}>
                              Ticket has been minted and burned.
                            </button> 
                            :
                            <button className={styles.button} onClick={burnTicket}>
                              Burn Ticket
                            </button> 
                          )
                          : 
                          <button className={styles.button} onClick={mintTicket}>
                            Mint Ticket
                          </button> 
                        )
                        :
                        <div className={styles.button} onClick={connectAccount}>
                          Connect Wallet
                        </div>
                      }
                  </div>
                </div>
            </div>
            
        </div>
    )
    
}

export default NFT