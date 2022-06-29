import React from "react";
import ContentLoader from "react-content-loader";
import { AppContext } from "../App";

function Card({id, imageUrl,title,price, onFavorite, onPlus, favorited = false, loading = false}){
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({id,title,price,imageUrl});
  }
  const onClickFavorite =() =>{
    onFavorite({id,title,price,imageUrl});
    setIsFavorite(!isFavorite);
  }
      return(
        <div className='card'>
          {
            loading ?  <ContentLoader 
            speed={2}
            width={133}
            height={187}
            viewBox="0 0 150 187"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            
          >
            <rect x="0" y="0" rx="10" ry="10" width="150 " height="90" /> 
            <rect x="0" y="103" rx="10" ry="10" width="150" height="15" /> 
            <rect x="0" y="123" rx="10" ry="10" width="100" height="15" /> 
            <rect x="-1" y="160" rx="10" ry="10" width="80" height="24" /> 
            <rect x="115" y="155" rx="10" ry="10" width="32" height="32" />
          </ContentLoader> : <><div className='favorite'>
            {onFavorite && <img onClick={onClickFavorite} src={isFavorite ? '/img/heart-active.svg': '/img/heart.svg'} alt='heart' />}
          </div>
          <img  width={133} height={133} src={imageUrl} alt='fruit'/>
          <h5>{title}</h5>
          <div className='cardInfo'>
            <div className='cardPrice'>
              <span>Ціна за кг:</span>
              <b>{price} грн.</b>
            </div> 
              {onPlus && <img onClick={onClickPlus} width={32} height={32} src={isItemAdded(id) ? '/img/selected.svg': '/img/plus.svg'} alt='plus'/>}
          </div></>
          }
        </div>
    );
}
export default Card;