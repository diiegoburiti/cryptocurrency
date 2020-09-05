import React from "react";
import style from "./CoinData.module.css";

const CoinData = ({ data }) => {
  const renderData = () => {
    if (data) {
      return (
        <section className={style.coinData}>
          <div>
            <div className={style.info}>
              <span>Market Cap: </span>
              <span>{data.market_cap}</span>
            </div>
            <hr />
            <div className={style.info}>
              <span>Total Supply: </span>
              <span>{data.total_supply}</span>
            </div>
          </div>

          <div>
            <div className={style.info}>
              <span>Volume(24H): </span>
              <span>{data.total_volume}</span>
            </div>
            <hr />
            <div className={style.info}>
              <span>high 24h: </span>
              <span>{data.high_24h}</span>
            </div>
          </div>

          <div className="">
            <div className={style.info}>
              <span>Circulating Supply: </span>
              <span>{data.circulating_supply}</span>
            </div>
            <hr />
            <div className={style.info}>
              <span>low 24h: </span>
              <span>{data.low_24h}</span>
            </div>
          </div>
        </section>
      );
    }
  };

  return <div>{renderData()}</div>;
};

export default CoinData;
