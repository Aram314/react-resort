import React from 'react'
import loadingGif from '../images/gif/loading-arrow.gif'

function Loading() {
    return (
        <div className='loading'>
            <h4>Loading...</h4>
            <img src={loadingGif} alt="Loading images"/>
        </div>
    )
}

export default Loading