type PostProps = {
    title: string
    link: string
    date: Date,
    image: string
    description: string
    duration: number
}

const posts : PostProps[] = [
    {
        title: "⚡ THORChain Overview", 
        date: new Date(2021, 6, 20), 
        link: "https://notalined.medium.com/thorchain-overview-216d810d8e03", 
        image: '/thorchain.jpg', 
        description: "What is THORChain? How does it work? Why is it important?",
        duration: 7
    },
    {
        title: "Fashion Meets Web3",
        date: new Date(2021, 7, 25),
        link: "https://maybealined.medium.com/fashion-meets-web3-3a6e5cc19b22",
        image: '/cryptopunk.png',
        description: "An idea on physical, digi-physical, metaverse apparel",
        duration: 5
    }
]

export default posts