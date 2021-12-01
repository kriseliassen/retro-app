import React, { useEffect } from 'react'

const Error = ({ message, setError }) => {
  useEffect(() => {
    const delay = setTimeout(() => {
      setError('')
    }, 3000)
    return () => {
      clearTimeout(delay)
    }
  }, [])
  return (
    <div>
      {message}
    </div>
  )
}

export default Error
