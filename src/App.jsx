import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CoinDetailPage from "./Pages/CoinDetailPage";
import CoinSummaryPage from "./Pages/CoinSummaryPage";
import Header from "./components/Header/Header";
import "./App.css";
import { WatchListContextProvider } from "./context/watchListContext";

const App = () => {
  return (
    <div className="container">
      <WatchListContextProvider>
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={CoinSummaryPage} />
          <Route exact path="/coins/:id" component={CoinDetailPage} />
        </BrowserRouter>
      </WatchListContextProvider>
    </div>
  );
};

export default App;
