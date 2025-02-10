import React from 'react'

type gameOver = {
    text: string
}
const GameOver: React.FC<gameOver> = ({ text }) => {
    return (
        <>
            <h1
                className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-6xl text-center text-[#A5E169] underline decoration-skip-ink-none underline-offset-2"
            >
                {text.toUpperCase()}
            </h1>
        </>
    )
}

export default GameOver
