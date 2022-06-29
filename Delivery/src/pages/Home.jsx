import Card from '../components/Card';

import React from 'react';

function Home({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  onSearchInputValue,
  onAddToFavorite,
  onAddToCart,
  isLoading
    }){
      

      const renderItems = () =>{
        return (isLoading ? [...Array(8)] : items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())) ).map((item, index)=>(
          <Card
            key={index}
            onPlus={(obj)=> onAddToCart(obj)}
            onFavorite={(obj)=> onAddToFavorite(obj)}
            loading = {isLoading}
            {...item}
          />
        ))
      }
    return(
     <> <div class="posterBlok">
      <div class="poster">
          <p class="posterText">Унікальний магазин фруктів з усього світу.</p>
          <p class="posterText"> Доставимо найсвіжіші фрукти <br/> додому і в офіс.</p>
          <button class="green-button">Замовити</button>
      </div>
    </div>
        <div className='content'>
        <div className="content-header">
          <h1>{searchValue ? `Шукаю:  ${searchValue}` : 'Усі продукти'}</h1>
          <div className="search"> 
            <img src='/img/search.svg' alt='search' />
            <input onChange={onSearchInputValue} placeholder='Пошук...'/>
          </div>
        </div>
        
        <div className='fruits'>
          {renderItems()}
        </div>
      </div> </>
    );
}

export default Home