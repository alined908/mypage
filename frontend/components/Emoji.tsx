import React from 'react';

interface EmojiProps {
    label: string
    emoji: string
}

const Emoji = ({label, emoji} : EmojiProps) : JSX.Element => {
    return (
        <span role="img" aria-label={label}>
            {emoji}
        </span>
    )
}

export default Emoji