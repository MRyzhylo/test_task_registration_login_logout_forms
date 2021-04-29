import { useCallback } from "react"

export const useErrMessage = () => {
    return useCallback ( text => {
        if ( text ) {
            document.querySelector('#error').innerHTML = text;
        }
    }, [] )
} 