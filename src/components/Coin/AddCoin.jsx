import React, { useState, useContext } from "react";
import { WatchListContext } from "../../context/watchListContext";

const AddCoin = () => {
  const [active, setActive] = useState(false);
  const { addCoin } = useContext(WatchListContext);
  const availableCoins = [
    "bitcoin",
    "ethereum",
    "ripple",
    "tether",
    "bitcoin-cash",
    "litecoin",
    "eos",
    "okb",
    "tezos",
    "cardano",
  ];

  function handleClick(coin) {
    addCoin(coin);
    setActive(false);
  }

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        onClick={() => setActive(!active)}
      >
        Add Coin
      </button>

      <div className={active ? "dropdown-menu show" : "dropdown-menu"}>
        {availableCoins.map((coin) => {
          return (
            <a
              onClick={() => handleClick(coin)}
              key={coin}
              href="#"
              className="dropdown-item"
            >
              {coin}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default AddCoin;
