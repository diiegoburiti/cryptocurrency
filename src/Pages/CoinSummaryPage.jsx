import React from "react";
import AddCoin from "../components/Coin/AddCoin";
import CoinList from "../components/Coin/CoinList";
import style from "./CoinSummaryPage.module.css";

const CoinSummaryPage = () => {
  return (
    <div className={style.coinSummaryPage}>
      <AddCoin />
      <CoinList />
    </div>
  );
};

export default CoinSummaryPage;
