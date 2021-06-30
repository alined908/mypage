import React from 'react';
import Emoji from '../components/Emoji';
import { TextBox, TextBoxSubHeader, TextBoxUnorderedList, TextBoxListItem } from '../components/TextBox';
import { SplitContainer, ContainerLeft, ContainerRight } from '../components/SplitContainer';
import styles from '../styles/generic.module.scss';

const About = () : JSX.Element => {
    return (
        <SplitContainer>
            <ContainerLeft>
                <TextBox>
                    <TextBoxSubHeader title="About Me">
                        <Emoji label="about" emoji="👋"/>
                    </TextBoxSubHeader>
                    <TextBoxUnorderedList>
                        <TextBoxListItem>
                            24, Korean, from Socal
                        </TextBoxListItem>
                        <TextBoxListItem>
                            Sometimes known as Alined
                        </TextBoxListItem>
                    </TextBoxUnorderedList>
                </TextBox>  
                <TextBox>
                    <TextBoxSubHeader title="Education">
                        <Emoji label="education" emoji="🎓"/>
                    </TextBoxSubHeader>
                    <TextBoxUnorderedList>
                        <TextBoxListItem>
                            UC Berkeley 2019
                        </TextBoxListItem>
                        <TextBoxListItem>
                            Economics Major + Computer Science Minor
                        </TextBoxListItem>
                    </TextBoxUnorderedList>
                </TextBox>
                <TextBox>
                    <TextBoxSubHeader title="Work">
                        <Emoji label="work" emoji="🛠️"/>
                    </TextBoxSubHeader>
                    <TextBoxUnorderedList>
                        <TextBoxListItem>
                            Amazon - Support Engineer
                        </TextBoxListItem>
                        <TextBoxListItem>
                            San Francisco Shock - Data Analyst Intern
                        </TextBoxListItem>
                        <TextBoxListItem>
                            UC Berkeley Student Affairs - Business Development Intern
                        </TextBoxListItem>
                    </TextBoxUnorderedList>
                </TextBox>
                <TextBox>
                    <TextBoxSubHeader title="Hobbies">
                        <Emoji label="hobbies" emoji="✨"/>
                    </TextBoxSubHeader>
                    <TextBoxUnorderedList>
                        <TextBoxListItem>
                            Lifting - Almost at 1000 lb club!
                        </TextBoxListItem>
                        <TextBoxListItem>
                            Gaming - Don't play much nowadays, but sometimes Apex Legends
                        </TextBoxListItem>
                    </TextBoxUnorderedList>
                </TextBox>
            </ContainerLeft>
           <ContainerRight>
                <TextBox>
                    <TextBoxSubHeader title="Gaming + Esports">
                        <Emoji label="gaming" emoji="🎮"/>
                    </TextBoxSubHeader>
                    <TextBoxUnorderedList>
                        <TextBoxListItem>
                            Played professionally as a main tank for Florida Mayhem Academy in Overwatch Contenders.
                        </TextBoxListItem>
                        <TextBoxListItem>
                            Analyst for San Francisco Shock, an Overwatch League team.
                        </TextBoxListItem>
                        <TextBoxListItem>
                            Captained Cal Overwatch Team to two national championships and over $100,000 in scholarships won.
                        </TextBoxListItem>
                        <TextBoxListItem>
                            Some roles I held on campus - President @ Cal Esports, VP Operations @ Gaming at Berkeley, NVIDIA GeForce Student Ambassador
                        </TextBoxListItem>
                        <TextBoxListItem>
                            My <a className={styles.externalLink} href='https://liquipedia.net/overwatch/Alined' rel="noreferrer" target="_blank">liquipedia</a> :()
                        </TextBoxListItem>
                        <TextBoxListItem>
                            Top 100 Legend in Hearthstone, D1 S3 in League of Legends, ESEA Open 3rd Place in CSGO, 2x Challenger in Teamfight Tactics, Top 10 multiple accounts in Overwatch
                        </TextBoxListItem>
                    </TextBoxUnorderedList>
                </TextBox>
                <TextBox>
                    <TextBoxSubHeader title="Current Interests">
                        <Emoji label="interests" emoji="💡"/>
                    </TextBoxSubHeader>
                    <TextBoxUnorderedList>
                        <TextBoxListItem>
                            DeFi - An open, transparent, permissionless financial system that helps empower individuals economically sounds awesome.
                        </TextBoxListItem>
                        <TextBoxListItem>
                            Metaverse - Fascinated with the idea of an interconnected virtual world.  Gaming has always drawn me in because of alternate realities.
                        </TextBoxListItem>
                        <TextBoxListItem>
                            Investing - Attempting to generate alpha. Mostly in crypto, some stocks, potentially nfts.
                        </TextBoxListItem>
                        <TextBoxListItem>
                            Writing - Trying to stop decay and be a better writer
                        </TextBoxListItem>
                    </TextBoxUnorderedList>
                </TextBox>
           </ContainerRight>
        </SplitContainer>
    )
}

export default About