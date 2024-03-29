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

  return (
    <>
      <h1>PizzaWorld Pie Builder</h1>

      <form className="mainForm" onSubmit={handleSubmit}>
        <label>
          Pie Nickname:
          <input
            type="text"
            placeholder={orderHistory[orderHistory.length - 1]?.nickname}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>
        <label>
          Pie Size:
          <input
            type="number"
            placeholder={orderHistory[orderHistory.length - 1]?.size}
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
          Toppings:<br></br>
          <textarea
            type="textarea"
            rows="4"
            cols="20"
            value={currenttopping}
            placeholder={orderHistory[orderHistory.length - 1]?.toppings.join(
              ", "
            )}
            onChange={(e) => setCurrentTopping(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setToppings(toppings.concat(currenttopping));
                setCurrentTopping("");
              }
            }}
          />
          <br></br>
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
          className="submitButton"
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
        <div className="currentList">
          {nickname}
          <p>Pizza Nickname</p>
        </div>
        <div className="currentList">
          {size}
          <p>Pie Size</p>
        </div>
        <div className="currentList">
          {crust}
          <p>Crust Type</p>
        </div>
        <div className="currentList">
          {cheese}
          <p>Cheese Amount</p>
        </div>
        <br></br>
      </section>
      <section className="currentOrder">
        <div className="listToppings">
          <p className="toppingsPad">Added Toppings</p>
          {toppings.join(", ")}
        </div>
      </section>

      <h2>Previous Pie Orders</h2>
      <section className="orderHistory">
        {orderHistory.map((order) => (
          <div key={order.id} className="pieHistory">
            <div className="orderList">
              <h5>Pizza Nickname:</h5> {order.nickname}
            </div>
            <div className="orderList">
              <h5>Pie Size (in inches):</h5> {order.size}
            </div>
            <div className="orderList">
              <h5>Crust Type:</h5> {order.crust}
            </div>
            <div className="orderList">
              <h5>Cheese Amount:</h5> {order.cheese}
            </div>
            <div className="orderList">
              <h4>Toppings:</h4> {order.toppings.join(", ")}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
