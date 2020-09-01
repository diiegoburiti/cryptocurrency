import React, { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setwatchList] = useState(["bitcoin", "ripple", "ethereum"]);

  function addCoin(coin) {
    if (watchList.indexOf(coin) === -1) {
      setwatchList([...watchList, coin]);
    }
  }

  function deleteCoin(coin) {
    setwatchList(
      watchList.filter((el) => {
        return el !== coin;
      }),
    );
  }

  return (
    <WatchListContext.Provider value={{ watchList, deleteCoin, addCoin }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
