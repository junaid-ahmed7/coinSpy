import React from "react";

const SharkList = ({ sharkAccounts }) => {
  return (
    <div>
      <h2>Sharks (cumulative buys/sells):</h2>
      <ul>
        {sharkAccounts.map(([wallet, amounts], index) => {
          const url = `https://etherscan.io/address/${wallet}`;
          return (
            <li key={index}>
              Wallet:{" "}
              <a href={url} target="_blank" rel="noopener noreferrer">
                {wallet}
              </a>{" "}
              Bought: {amounts.bought} sold: {amounts.sold}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SharkList;
