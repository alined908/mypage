import React from 'react';

export interface EmojiProps {
    label: string
    icon: string
}

export const Emoji = ({label, icon} : EmojiProps) : JSX.Element => {
    return (
        <span role="img" aria-label={label}>
            {icon}
        </span>
    )
}