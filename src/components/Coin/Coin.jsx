import React from "react";
import { Link } from "react-router-dom";
import style from "./Coin.module.css";

const Coin = ({ coin, deleteCoin }) => {
  console.log(coin);
  return (
    <Link to={`/coins/${coin.id}`} className="text-decoration-none my-1 coin">
      <li className={style.coinList}>
        <img
          className={style.coinListImg}
          src={coin.image}
          alt={coin.name}
          title={coin.name}
        />
        <span className={style.currentPrice}>{coin.current_price}</span>

        <span
          className={
            coin.price_change_percentage_24h < 0 ? style.red : style.green
          }
        >
          {coin.price_change_percentage_24h < 0 ? (
            <i className="fas fa-sort-down  "></i>
          ) : (
            <i className="fas fa-sort-up  "></i>
          )}
          {coin.price_change_percentage_24h}
        </span>
        <i
          onClick={(e) => {
            e.preventDefault();
            deleteCoin(coin.id);
          }}
          className={`${style.coinListIcon} far fa-times-circle `}
        ></i>
      </li>
    </Link>
  );
};

export default Coin;
