import React, { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setwatchList] = useState(["bitcoin", "ripple", "ethereum"]);

  function deleteCoin(coin) {
    setwatchList(
      watchList.filter((el) => {
        return el !== coin;
      })
    );
  }

  return (
    <WatchListContext.Provider value={{ watchList, deleteCoin }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
