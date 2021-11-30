import React from 'react'

const Error = ({ message, setError }) => {
  setTimeout(() => {
    setError('')
  }, 3000)
  return (
    <div>
      {message}
    </div>
  )
}

export default Error
