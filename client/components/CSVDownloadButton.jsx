import React from "react";
import { CSVLink } from "react-csv";

const CSVDownloadButton = ({ sharkAccounts }) => {
  const headers = [
    { label: "Wallet Address", key: "walletaddress" },
    { label: "Timestamp of first purchase", key: "timestamp" },
    { label: "Total Buys", key: "totalbuys" },
    { label: "Total Sells", key: "totalsells" },
    { label: "Tokens Left", key: "tokensleft" },
  ];
  const data = sharkAccounts.map((account) => {
    return {
      walletaddress: account[0],
      timestamp: account[1].firstPurchase,
      totalbuys: account[1].bought,
      totalsells: account[1].sold,
      tokensleft:
        account[1].bought - account[1].sold > 0
          ? account[1].bought - account[1].sold
          : 0,
    };
  });
  return (
    <>
      <CSVLink
        data={data}
        headers={headers}
        filename={"tokenHistory.csv"}
        target="_blank"
      >
        Download Sharks
      </CSVLink>
    </>
  );
};

export default CSVDownloadButton;
