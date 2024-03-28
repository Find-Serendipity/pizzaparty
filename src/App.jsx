import { useEffect, useState } from "react";
import "./App.css";
import { orderData } from "./data.jsx";

function App() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [nickname, setNickname] = useState("");
  const [size, setSize] = useState("");
  const [crust, setCrust] = useState("");
  const [cheese, setCheese] = useState("");
  const [toppings, setToppings] = useState([]);
  const [currenttopping, setCurrentTopping] = useState("");

  useEffect(() => {
    async function getOrderHistory() {
      try {
        let getData = orderData;
        console.log(getData);
        setOrderHistory(getData);
      } catch (err) {
        console.log(err);
      }
    }
    getOrderHistory();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // upon submission, user's order history is updated with the new order
  // on clicking an older order, show the previous order details

  return (
    <>
      <h1>Hello PizzaWorld</h1>
      <h2>Pie Builder</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Pie Nickname:
          <input
            type="text"
            placeholder={orderHistory[0]?.nickname}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>
        <label>
          Pie Size:
          <input
            type="number"
            placeholder={orderHistory[0]?.size}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </label>

        <select defaultValue={"0"} onChange={(e) => setCrust(e.target.value)}>
          <option value="0" hidden disabled>
            What kind of crust?
          </option>
          <option value="Hand-Tossed">Hand-Tossed</option>
          <option value="Deep Dish">Deep Dish</option>
          <option value="Thin Crust">Thin Crust</option>
        </select>
        <select defaultValue={"0"} onChange={(e) => setCheese(e.target.value)}>
          <option value="0" hidden disabled>
            How much cheese?
          </option>
          <option value="None">None</option>
          <option value="Regular">Regular</option>
          <option value="Extra">Extra</option>
        </select>
        <label>
          Toppings:
          <textarea
            type="textarea"
            rows="1.5"
            cols="20"
            value={currenttopping}
            placeholder={orderHistory[0]?.toppings.join(", ")}
            onChange={(e) => setCurrentTopping(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setToppings(toppings.concat(currenttopping));
                setCurrentTopping("");
              }
            }}
          />
          <button
            onClick={() => {
              setToppings(toppings.concat(currenttopping));
              setCurrentTopping("");
            }}
          >
            Add Topping
          </button>
        </label>
        <input
          type="submit"
          onClick={(e) => {
            const newOrder = {
              nickname: nickname,
              size: size,
              crust: crust,
              cheese: cheese,
              toppings: toppings,
              id: Math.floor(Math.random() * 10),
            };
            setOrderHistory(orderHistory.concat(newOrder));
            setNickname("");
            setSize("");
            setCrust("");
            setCheese("");
            setToppings([]);
          }}
        />
      </form>

      <h2>Current Creation </h2>
      <section className="currentOrder">
        <div className="currentList">{nickname}</div>
        <div className="currentList">{size}</div>
        <div className="currentList">{crust}</div>
        <div className="currentList">{cheese}</div>
        <div className="currentList">{toppings.join(", ")}</div>
      </section>

      <h2>Previous Pie Orders</h2>
      <section className="orderHistory">
        {orderHistory.map((order) => (
          <div key={order.id} className="pieHistory">
            <div className="orderList">{order.nickname}</div>
            <div className="orderList">{order.size}</div>
            <div className="orderList">{order.crust}</div>
            <div className="orderList">{order.cheese}</div>
            <div className="orderList">{order.toppings}</div>
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
