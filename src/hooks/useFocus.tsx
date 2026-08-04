import { useEffect, type RefObject } from 'react'

export const useFocus = (ref: RefObject<HTMLInputElement | null>, dependencies: any[] = []) => {
    useEffect(() => {
        if (ref.current) {
            setTimeout(() => {
                ref.current?.focus()
            }, 0)
        }
}, dependencies)
}