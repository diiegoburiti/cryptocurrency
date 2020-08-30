import React, { useContext } from "react";
import { WatchListContext } from "../../context/watchListContext";
import coinGecko from "../../api/coinGecko";
import Coin from "./Coin";

const CoinList = () => {
  const [coins, setCoins] = React.useState([]);
  const { watchList, deleteCoin } = useContext(WatchListContext);
  const [isLoading, setIsLoading] = React.useState(false);

  console.log(watchList);
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await coinGecko.get("/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: watchList.join(","),
        },
      });
      setCoins(response.data);
      setIsLoading(false);
    };
    if (watchList.length > 0) {
      fetchData();
    } else setCoins([]);
  }, [watchList]);

  function renderCoins() {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <ul className="coinlist list-group mt-2">
        {coins.map((coin) => (
          <Coin key={coin.id} coin={coin} deleteCoin={deleteCoin} />
        ))}
      </ul>
    );
  }

  return <div>{renderCoins()}</div>;
};

export default CoinList;
