import React from "react";
import coinGecko from "../Api/coinGecko";

const CoinList = () => {
  const [coins, setCoint] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await coinGecko.get("/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: "bitcoin, ethereum",
        },
      });
      console.log(response.data);
    };
    fetchData();
  }, []);

  return <div>List</div>;
};

export default CoinList;
