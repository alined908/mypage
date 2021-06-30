import { store } from 'react-notifications-component';

const connectAccountError = () => {
    store.addNotification({
        title: "Error!",
        message: "Unable to retrieve information for address.",
        type: "danger",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
    })
}

const wrongNetworkError = () => {
    store.addNotification({
        title: "Error!",
        message: "Please switch network to Rinkeby.",
        type: "danger",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
    })
}

const burnTicketSuccess = () => {
    store.addNotification({
        title: "Success!",
        message: "Burned ticket. Message for more details.",
        type: "success",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
    })
}

const burnTicketError = () => {
    store.addNotification({
        title: "Error!",
        message: "Unable to burn ticket.",
        type: "error",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
    })
}

const mintTicketSuccess = () => {
    store.addNotification({
        title: "Success",
        message: "Minted ticket!",
        type: "success",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
    })
}

const mintTicketError = () => {
    store.addNotification({
        title: "Error",
        message: "Unable to mint ticket. Either you already have a ticket or you will need to try again.",
        type: "danger",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
    })
}

export {connectAccountError, burnTicketSuccess, burnTicketError, mintTicketSuccess, mintTicketError, wrongNetworkError}