import { AppContext } from "../App";
import Card from "../components/Card";
import React from "react";
import Info from "../components/Info";


function Favorites({onAddToFavorite, items=[]})
{
  const {favoriteItems} = React.useContext(AppContext);
    return(
        <div className='content'>
        {
          items.length > 0 ? (<><div className="content-header">
          <h1>Улюблене</h1>
        </div>        
          <div className='fruits'>
               {favoriteItems.map((obj)=>(
                      <Card
                        key={obj.name}
                        title={obj.name}
                        price={obj.price}
                        imageUrl={obj.imageUrl}
                        id = {obj.id}
                        favorited={true}
                        onFavorite={(item)=> onAddToFavorite(item)}
                      />
                    ))}
          </div></>) : (<Info title={"Немає улюблених продуктів"} 
        description={"Схоже, вам нічого не сподобалось"} 
        image={"/img/minisad.png"}/>)
        }
      </div>
    )
}

export default Favorites