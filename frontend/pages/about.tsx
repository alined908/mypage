import React from 'react';
import {EmojiProps}  from '../components/Emoji';
import Head from 'next/head';
import { TextBox, ContainerTextBoxes } from '../components/TextBox';
import { SplitContainer, ContainerLeft, ContainerRight } from '../components/SplitContainer';

interface ContainerJSON {
    left?: TextBox[]
    right?: TextBox[]
}

interface TextBox {
    title: string
    emoji: EmojiProps
    listItems: string[]
}

const textBoxesJSON : ContainerJSON = {
    left: [
        {
            title: "About Me", 
            emoji: { label: "about", icon: "👋"},
            listItems: ["24, Korean, from Socal", "Sometimes known as Alined"]
        },
        {
            title: "Education",
            emoji: {label: "education",icon: "🎓"},
            listItems: ["UC Berkeley 2019", "Economics Major + Computer Science Minor"]
        },
        {
            title: "Work",
            emoji: { label: "work", icon: "🛠️" },
            listItems: ["Amazon - Support Engineer", "San Francisco Shock - Data Analyst Intern", "UC Berkeley Student Affairs - Business Development Intern"]
        },
        {
            title: "Hobbies",
            emoji: { label: "hobbies", icon: "✨"},
            listItems: ["Lifting - Almost at 1000 lb club!", "Gaming - Don't play much nowadays, but sometimes Apex Legends"]
        }
    ],
    right: [
        {
            title: "Gaming + Esports",
            emoji: {label: "gaming", icon: "🎮"},
            listItems: [
                "Played professionally as a main tank for Florida Mayhem Academy in Overwatch Contenders.",
                "Analyst for San Francisco Shock, an Overwatch League team.",
                "Captained Cal Overwatch Team to two national championships and over $100,000 in scholarships won.",
                "Some roles I held on campus - President @ Cal Esports, VP Operations @ Gaming at Berkeley, NVIDIA GeForce Student Ambassador",
                "My <a class='externalLink' href='https://liquipedia.net/overwatch/Alined' rel='noreferrer' target='_blank'>liquipedia</a> :()",
                "Competitive Ladders - LoL Diamond 1 S3, CSGO ESEA Open 3rd Place, Hearthstone Top 100 Legend, Overwatch Top 10 multiple accounts, TFT 2x Challenger"
            ]
        },
        {
            title: "Current Interests",
            emoji: {label: "interests", icon: "💡"},
            listItems: [
                "DeFi - An open, transparent, permissionless financial system that helps empower individuals economically sounds awesome.",
                "Metaverse - Fascinated with the idea of an interconnected virtual world.  Gaming has always drawn me in because of alternate realities.",
                "Investing - Attempting to generate alpha. Mostly in crypto, some stocks, nfts",
                "Writing - Trying to stop decay and be a better writer"
            ]
        }
    ]
}

const About = () : JSX.Element => {

    return (
        <>
            <Head>
                <title>About Me</title>
                <meta name="description" content="Personal Website" />
            </Head>
            <SplitContainer>
                {textBoxesJSON.left && 
                    <ContainerLeft>
                        <ContainerTextBoxes textBoxes={textBoxesJSON.left}/>
                    </ContainerLeft>
                }
                {textBoxesJSON.right &&
                    <ContainerRight>
                        <ContainerTextBoxes textBoxes={textBoxesJSON.right} indexOffset={textBoxesJSON.left.length}/>
                    </ContainerRight>
                }
            </SplitContainer>
        </>
    )
}

export default About