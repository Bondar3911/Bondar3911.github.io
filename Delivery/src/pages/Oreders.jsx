import { AppContext } from "../App";
import Card from "../components/Card";
import React from "react";
import axios from "axios";

function Orders() {
  const { onAddToCart, onAddToFavorite } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://627642a215458100a6ad62f1.mockapi.io/orders"
      );
      setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      setIsLoading(false);
    })();
  }, []);
  return (
    <div className="content">
      <div className="content-header">
        <h1>Замовлення</h1>
      </div>

      <div className="fruits">
        {orders.map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
