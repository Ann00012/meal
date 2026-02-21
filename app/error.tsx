'use client'
type ErrorProps = {
    error: Error,
    reset: () => void
};

export default function Error({ error, reset }: ErrorProps) { 
    return (
        <div>
            <p>Error: {error.message}</p>
            <button onClick={reset} aria-label="Reset button">Try again</button>
        </div>
    )
}