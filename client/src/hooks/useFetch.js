import axios from 'axios'
import { useState, useCallback } from 'react'

const useFetch = url => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)


  const doFetch = useCallback(async (options={})=> {
    setLoading(true)
    try {
      const response = await axios(url, options)
      setResponse(response.data)
      setLoading(false)
      return response.data

    } catch(e) {
      setLoading(false)
      setError(e.response.data)
    }
  }, [url])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return [ doFetch, response, loading, error, clearError ]
}

export default useFetch