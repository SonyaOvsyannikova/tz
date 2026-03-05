import {  useEffect, useRef } from 'react'

export const useOutsideClick = <T extends HTMLElement = HTMLElement> (
    callback: () => void,
)  => {
    const ref = useRef<T>(null)

    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                ref.current &&
                e.target instanceof Node &&
                !ref.current.contains(e.target)
            ) {
                savedCallback.current()
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])

    return ref ;
}
