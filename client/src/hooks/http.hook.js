import {useCallback, useState} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, SetError] = useState(null)
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try{
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const responce = await fetch(url, {method, body, headers})
            const data = await responce.json()

            if (!responce.ok) {
                throw new Error( data.message || "Something going wrong!" )
            }
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            SetError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(()=> SetError(null), [])

    return {loading, request, error, clearError}
}