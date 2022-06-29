import React from 'react'
import { AppContext } from '../App';

const Info = ({image , title, description}) => {
  const {setCartOpened} = React.useContext(AppContext)
  return (
   
    <div className="cartEmpty">
        <img src={image} alt="box" className="cartEmptyBox" />
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => setCartOpened(false)} className="green-button"><img src='/img/arrow.svg' alt = 'tobook'/>Повернутися назад</button>
    </div>
  )
}

export default Info;