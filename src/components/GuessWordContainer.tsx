import React from 'react'
import './GuessWordContainer.css';

const GuessWordContainer = () => {
  return (
    <div className='container'>
        <div className="header">
          (Consigne...) Quelle est la définition du mot ?
        </div>

        <div className='body'>
            Aristocrate
        </div>

        <div className='footer'>
          <button className='postive-button'>Je sais !</button>
          <button className='negative-button'>Je sais pas</button>
        </div>
    </div>
    )
}
  
export default GuessWordContainer;