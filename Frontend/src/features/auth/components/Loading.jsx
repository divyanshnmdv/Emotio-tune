import React from 'react'
import '../style/loding.scss'

const Loading = () => {
  return (
    <div className="loading-page">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  )
}

export default Loading
