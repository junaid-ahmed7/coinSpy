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
    const { url } = await data.json();
    console.log(url)
    const tokenData = await fetch(url);
    const parse = await tokenData.json();
    console.log(parse);
  };
  return (
    <div>
      <label htmlFor="tokenText">Contract Address:</label>
      <input
        type="text"
        id="tokenText"
        onChange={(event) => setToken(event.target.value)}
      ></input>
      <button onClick={getURL}>Get Transactions</button>
    </div>
  );
};

export default TokenInput;
