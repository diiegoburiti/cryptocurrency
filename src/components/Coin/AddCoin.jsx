import React, { useState, useContext } from "react";
import { WatchListContext } from "../../context/watchListContext";
import style from "./AddCoin.module.css";
import Button from "../Helper/Button";
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
      <Button
        className={`dropdown-toggle ${style.btn}`}
        type="button"
        onClick={() => setActive(!active)}
      >
        Add Coin
      </Button>

      <ul className={active ? "dropdown-menu show" : "dropdown-menu"}>
        {availableCoins.map((coin) => {
          return (
            <li>
              <span
                onClick={() => handleClick(coin)}
                key={coin}
                href="#"
                className="dropdown-item"
              >
                {coin}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AddCoin;
