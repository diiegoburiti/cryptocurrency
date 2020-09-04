import React from "react";
import { useParams } from "react-router-dom";
import HisotryChart from "../components/Chart/HistoryChart";
import CoinData from "../components/Coin/CoinData";
import coinGecko from "../api/coinGecko";
import Loader from "../components/Helper/Loader";

const CoinDetailPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  function formatData(data) {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  }

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
        day: formatData(day.data.prices),
        weeek: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
      });
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  function renderData() {
    if (isLoading) {
      return <Loader />;
    }
    return (
      <div className="coinlist">
        <HisotryChart data={coinData} />
        <CoinData data={coinData.detail} />
      </div>
    );
  }
  return renderData();
};

export default CoinDetailPage;
