import Info from "./Info";
import axios from "axios";
import React from "react";
import { AppContext } from "../App";

function Drawer({onClose,onRemove ,items=[]}){
  const {cartItems, setCartItems} = React.useContext(AppContext);
  const [isComplete, setIsComplete] = React.useState(false);
  const totalPrice = cartItems.reduce((sum,obj) => obj.price + sum, 0);
  const onClickOrder = () => {
    axios.post('https://627642a215458100a6ad62f1.mockapi.io/orders',{items: cartItems})
    setIsComplete(true);
    setCartItems([]);
    axios.put('https://627642a215458100a6ad62f1.mockapi.io/cart', [])
  }
    return(
    <div className='overlay'>
    <div className='drawer'>
      <h2 className="cartHeader">Кошик<img onClick={onClose} className='remove-button' src='/img/btn-remove.svg' alt='close'/></h2>
      {
        items.length > 0 ? (<><div className='items'>
        {items.map((obj)=>(
           <div key={obj.id} className='cart-item'>
           <img width={70} height={70} src={obj.imageUrl} alt='Item'/>
           <div>
             <p>{obj.title}</p>
             <b>{obj.price} грн.</b>
           </div>
           <img className='remove-button' onClick={() => onRemove(obj.id)}src='/img/btn-remove.svg' alt='remove'/>
         </div>
        ))}
        </div><div>
        <ul className='cart-total-block'>
        <li>
          <span>До сплати:</span>
          <div></div>
          <b>{totalPrice} ₴</b>
        </li>
        <li>
          <span>Податок 5%</span>
          <div></div>
          <b>{Math.round(totalPrice * 0.05)} ₴</b>
        </li>
        <button onClick={onClickOrder} className='green-button'>Оформити замовлення <img src='/img/arrow.svg' alt = 'tobook'/> </button>
        </ul>
      </div></>) : (<Info title={isComplete ? "Замовлення оформленне!" : "Кошик порожній"} 
      description={isComplete ? "Ваше замовлення №1 обробляєтся і скоро буде надано кур'єру": "Додайте хоча б один фрукт, щоб зробити замовлення"} 
      image={isComplete ? "/img/complete.jpg" : "/img/box.png"}/>)
      }
    </div>
  </div>
  );
}

export default Drawer;