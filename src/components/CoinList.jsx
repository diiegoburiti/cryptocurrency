import React, { useContext } from "react";
import { WatchListContext } from "../context/watchListContext";
import coinGecko from "../api/coinGecko";

const CoinList = () => {
  const [coins, setCoins] = React.useState([]);
  const { watchList } = useContext(WatchListContext);
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
    fetchData();
  }, [watchList]);

  return <div>List</div>;
};

export default CoinList;
