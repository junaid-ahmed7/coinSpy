import React, { useState } from "react";

const TokenInput = () => {
  const [token, setToken] = useState("");
  const getURL = async () => {
    const data = await fetch("/token/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });
    const { txs } = await data.json();
    console.log(txs);
    for (let i = 0; i < txs.result.length; i++) {
      console.log(txs.result[i].hash);
      console.log(txs.result[i].to);
      console.log(txs.result[i].from);
      console.log(txs.result[i].timestamp);
      console.log(txs.result[i].tokenName);
      console.log(txs.result[i].value);
    }
    // const { url } = await data.json();
    // const tokenData = await fetch(url);
    // const parse = await tokenData.json();
  };
  return (
    <div>
      <div
        style={{
          border: "1px solid",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        <span style={{ fontWeight: "bold", color: "#888" }}>Beta Mode:</span>{" "}
        This component is currently in beta as we wait for the API response.
        <div>
          <label htmlFor="tokenText">Contract Address:</label>
          <input
            type="text"
            id="tokenText"
            onChange={(event) => setToken(event.target.value)}
          ></input>
          <button
            className="beta__button"
            //  onClick={getURL}
          >
            Get Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenInput;
