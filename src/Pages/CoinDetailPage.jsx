import React from "react";
import { useParams } from "react-router-dom";
import HisotryChart from "../components/HistoryChart";
import CoinData from "../components/Coin/CoinData";
import coinGecko from "../api/coinGecko";

const CoinDetailPage = () => {
  const { id } = useParams();
  const [coinDate, setCoinData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const [day, week, year, detail] = await Promise.all([
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "1",
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "7",
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "365",
          },
        }),
        coinGecko.get("/coins/markets", {
          params: {
            vs_currency: "usd",
            ids: id,
          },
        }),
      ]);

      setCoinData({
        day: day.data.prices,
        weeek: week.data.prices,
        year: year.data.prices,
        detail: detail.data,
      });
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  function renderData() {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="coinlist">
        <HisotryChart />
        <CoinData />
      </div>
    );
  }
  return renderData();
};

export default CoinDetailPage;
