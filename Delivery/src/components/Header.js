import {Link} from 'react-router-dom';
import { AppContext } from '../App';
import React from 'react';
function Header(props){
  const {cartItems} = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum,obj) => obj.price + sum, 0);
    return(
        <header>
        <div className="headerLeft">
        <Link to='/'><img width={40} height={40} src='/img/logo.svg' alt='logo'/></Link>
        <div className='headerInfo'>
          <h3>Healthy Food</h3>
          <p>Корисно та зручно</p>
        </div>
        </div>
        
        <ul className='headerRight'>
          <li onClick={props.onClickCart}>
            <img src='/img/cart.svg' alt='cart'/>
            <span>{totalPrice} ₴</span>
          </li>
          <Link to='/favorites'>
          <li>
            <img src="/img/Favorites.svg" alt="favorites" />
          </li>
          </Link>
          <Link to='/orders'>
          <li>
          <img src='/img/user.svg' alt='user'/>
          </li>
          </Link>
          
        </ul>
        
      </header>
    );
}

export default Header;