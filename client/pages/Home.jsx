import React from "react";
import HistoryUpload from "../components/HistoryUpload";
import TokenInput from "../components/TokenInput";

const Home = () => {
    return (
        <React.Fragment>
        <h1 className="main__header">CoinSpy</h1>
        <TokenInput></TokenInput>
        <HistoryUpload></HistoryUpload>
        </React.Fragment>
    )
};

export default Home;