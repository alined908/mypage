import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import Image from 'next/image';
import genericStyles from '../styles/generic.module.scss';
import nftStyles from '../styles/nft.module.scss';
import AlinedTicket from '../artifacts/AlinedTicket.json';
import { store } from 'react-notifications-component';
import Emoji from '../components/Emoji';
import { TextBox, TextBoxSubHeader, TextBoxUnorderedList, TextBoxListItem } from '../components/TextBox';
import { SplitContainer, ContainerLeft, ContainerRight } from '../components/SplitContainer';

const ticketAddress = "0x192d6AD08d70c9a94BFF20763ca08D01D23DD8e6";
const styles = {...genericStyles, ...nftStyles};

declare let window: any;

interface buttonJSON {
  text: string
  style: string
  disabled: boolean
  onClick: () => void
}

const NFT = () => {
    const [account, setAccount] = useState(null);
    const [minted, setMinted] = useState(false);
    const [burned, setBurned] = useState(false);
    const [loading, setLoading] = useState(false);
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
      setMetaMaskDownloaded(window.ethereum.isMetaMask);
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
        const data = await contract.balanceOf(address);
        const existData = await contract.tokenIDOwnedByAddress(address);
        if (data.toNumber() === 1 || existData.toNumber() >= 1){
          setMinted(true);
        }

        if (data.toNumber() === 0 && existData.toNumber() >= 1) {
          setBurned(true);
        }
      } catch (err) {
        console.log(err);
        store.addNotification({
          title: "Error!",
          message: "Unable to retrieve information for address.",
          type: "danger",
          insert: "bottom",
          container: "top-left",
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

    const determineButton = () : buttonJSON => {
 
      if (account) {
        if (minted) {
          if (burned) {
            return {text: "Ticket has been minted and burned.", style: styles.buttonDisabled, disabled: true, onClick: null} 
          } else {
            return {text: "Burn Ticket", style: styles.button, disabled: false, onClick: burnTicket};
          }
        } else  {
          return {text: "Mint Ticket", style: styles.button, disabled: false, onClick: mintTicket};
        }
      }

      return {text: "Connect Wallet", style: styles.button, disabled: false, onClick: connectAccount};
    }

    return (
        <SplitContainer>
          <ContainerLeft>   
            <div className={`${styles.textBox} ${styles.responsiveImageContainer} ${styles.ticket}`}>
              <Image 
                src={"https://gateway.pinata.cloud/ipfs/QmbwZi3Uw3Pwh4eiMibWycc9rufxd5bEYqujaoiws9ZEvc"}
                alt="Golden Ticket"
                className={styles.responsiveImage}
                layout='fill'
              />
            </div>
            <TextBox>
              <TextBoxSubHeader title="Info">
                  <Emoji label="info" emoji="⚠️"/>
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
           <TextBox>
              <TextBoxSubHeader title="Rules">
                  <Emoji label="rules" emoji="📜"/>
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
          </ContainerLeft>
          <ContainerRight>
            <TextBox>
              <TextBoxSubHeader title="Step 1">
                  <Emoji label="step1" emoji="📜"/>
              </TextBoxSubHeader>
              <TextBoxUnorderedList>
                  <TextBoxListItem>
                    <input type="checkbox" id="step1" name="step1" value="Bike"/>
                    <label htmlFor="step1">Download Metamask</label>
                  </TextBoxListItem>
              </TextBoxUnorderedList>
           </TextBox>
           <TextBox>
              <TextBoxSubHeader title="Step 1">
                  <Emoji label="step1" emoji="📜"/>
              </TextBoxSubHeader>
              <TextBoxUnorderedList>
                  <TextBoxListItem>
                    <input type="checkbox" id="step2" name="step2" value="Bike"/>
                    <label htmlFor="step1">Connect to Metamask</label>
                    <div className={styles.wallet}>
                      <button className={determineButton().style} disabled={determineButton().disabled} onClick={determineButton().onClick}>
                        {loading && <div className={styles.spinner}></div>}
                        {determineButton().text}
                      </button> 
                    </div>
                  </TextBoxListItem>
              </TextBoxUnorderedList>
           </TextBox>
            <TextBox>
              <TextBoxSubHeader title="Step 3">
                  <Emoji label="step3" emoji="📜"/>
              </TextBoxSubHeader>
              <TextBoxUnorderedList>
                  <TextBoxListItem>
                    <input type="checkbox" id="step3" name="step3" value="Bike"/>
                    <label htmlFor="step2">Mint Ticket</label>
                  </TextBoxListItem>
              </TextBoxUnorderedList>
           </TextBox>  
          </ContainerRight>     
        </SplitContainer>
    )
}

export default NFT