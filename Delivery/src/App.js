import './App.css';
import axios from 'axios';
import React from 'react';
import { Route, Routes }  from "react-router-dom";
import Home from './pages/Home';

import Drawer from './components/Drawer';
import Header from './components/Header';
import Favorites from './pages/Favorites';
import Orders from './pages/Oreders';

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened ,setCartOpened] = React.useState(false);
  const [isLoading ,setIsLoading] = React.useState(true);

  React.useEffect(() => {
  async function fetchData(){
    setIsLoading(true);
    const favoritesResponse = await axios.get('https://627642a215458100a6ad62f1.mockapi.io/favorites');
    const cartResponse = await axios.get('https://627642a215458100a6ad62f1.mockapi.io/cart');
    const itemsResponse = await axios.get('https://627642a215458100a6ad62f1.mockapi.io/items');
    
    setIsLoading(false);
    
    setCartItems(cartResponse.data);
    setFavorites(favoritesResponse.data);
    setItems(itemsResponse.data);
    
  }
  fetchData();

  },[]);

  const onAddToCart = (obj) => {
    console.log(obj)
    try{
      if (cartItems.find((item) => item.id === obj.id)){
        axios.delete(`https://627642a215458100a6ad62f1.mockapi.io/cart/${obj.id}`);
        setCartItems(prev => prev.filter(item =>item.id !== obj.id));
      }
      else{
      axios.post('https://627642a215458100a6ad62f1.mockapi.io/cart', obj);
      setCartItems(prev => [...prev,obj]);
      }
    }
    catch(error){
      alert("EROOR")
    }
  }

  const onAddToFavorite = async (obj) => {
    console.log(obj)
    try{
      if (favoriteItems.find((favObj) => Number(favObj.id) === Number(obj.id))){
        axios.delete(`https://627642a215458100a6ad62f1.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    }
    else{
      const {data} = await axios.post('https://627642a215458100a6ad62f1.mockapi.io/favorites', obj);
      setFavorites(prev => [...prev, data]);
    }
    }
    catch(error){
      alert('EROOOOR')
    }
    }
  

  const onSearchInputValue = (event) =>{
    setSearchValue(event.target.value)
  }

  const onRemoveItem = (id) =>{
    axios.delete(`https://627642a215458100a6ad62f1.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const isItemAdded = (id) =>{
    return cartItems.some(obj => Number(obj.id) === Number(id) )
  }

  return (
    <AppContext.Provider value ={{items, cartItems, favoriteItems, isItemAdded, setCartOpened, setCartItems,}} >
      <div className="wrapper">
      {cartOpened ? <Drawer items ={cartItems}  onClose={() => setCartOpened(false)} onRemove={onRemoveItem} /> : null}
     
      <Header onClickCart={() => setCartOpened(true)}/>
      
      <Routes>
          <Route path="/" element={<Home  items={items} 
                                          cartItems = {cartItems}
                                          searchValue={searchValue} 
                                          setSearchValue={setSearchValue}
                                          onSearchInputValue = {onSearchInputValue}
                                          onAddToFavorite = {onAddToFavorite}
                                          onAddToCart = {onAddToCart}
                                          isLoading = {isLoading}
                                  />}/>
          <Route path='/favorites' element={<Favorites  onAddToFavorite = {onAddToFavorite} items={favoriteItems}/>}/>
          <Route path='/orders' element={<Orders/>}/>
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
