import React from "react";
import { useParams } from "react-router-dom";
import HisotryChart from "../components/HistoryChart";
import CoinData from "../components/CoinData";
import coinGecko from "../api/coinGecko";

const CoinDetailPage = () => {
  const { id } = useParams();
  const [coinDate, setCoinData] = React.useState({});

  React.useEffect(() => {
    async function fetchData() {
      const [day, week, year] = await Promise.all([
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
      ]);

      setCoinData({
        day: day.data.prices,
        weeek: week.data.prices,
        year: year.data.prices,
      });
    }
    fetchData();
  }, [id]);

  function renderData() {
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
