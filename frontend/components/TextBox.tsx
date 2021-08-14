import React from "react";
import styles from '../styles/generic.module.scss';
import { useSpring, animated } from "react-spring";
import { Emoji } from "./Emoji";

const ContainerTextBoxes = ({textBoxes, indexOffset = 0}) => {
    return (
        <>
            {textBoxes.map((textBox, index) => 
                <AnimatedLoadDiv position={index + indexOffset}>
                    <TextBox>
                        <TextBoxSubHeader title={textBox.title}>
                            <Emoji label={textBox.emoji.label} icon={textBox.emoji.icon}/>
                        </TextBoxSubHeader>
                        <TextBoxUnorderedList>
                            {textBox.listItems.map((listItem) => 
                                <TextBoxListItem content={listItem}/>
                            )}
                        </TextBoxUnorderedList>
                    </TextBox>
                </AnimatedLoadDiv>
                
            )}
        </>
)}

const AnimatedLoadDiv = ({children, position}) : JSX.Element => {

    const props = useSpring({
        from: {opacity: 0, transform: "translate(-50px, 0px)"}, 
        to: {opacity: 1, transform: "translate(0, 0)"},
        delay: (position + 1) * 125
    })
    
    return (
        <animated.div style={props}>
            {children}
        </animated.div>   
    )
}

const TextBox = ({children}) : JSX.Element => {
    return (
        <div className={styles.textBox}>
            {children}
        </div>
    )
}

interface TextBoxSubHeaderProps {
    title: string
    children: React.ReactNode
}

const TextBoxSubHeader = ({title, children} : TextBoxSubHeaderProps) : JSX.Element => {
    return (
        <h2 className={styles.subHeader}>
            {children} <span className={styles.subHeaderTitle}>{title}</span>
        </h2>
    )
}

const TextBoxUnorderedList = ({children}) : JSX.Element => {
    return (
        <ul>
            {children}
        </ul>
    )   
}

 
const TextBoxListItem = ({children = null, content = null}) : JSX.Element => {
    return (
        <li dangerouslySetInnerHTML={content ? {__html: content} : undefined}>
           {children}
        </li>
    )
}


export {TextBox, TextBoxSubHeader, TextBoxUnorderedList, TextBoxListItem, ContainerTextBoxes, AnimatedLoadDiv}