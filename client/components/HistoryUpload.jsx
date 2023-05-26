import React, { useState } from "react";
const csvParse = require("papaparse");
import helperFunctions from "../helper-functions/helperFunctions";

const HistoryUpload = () => {
  const [sharkAccounts, setSharkAccounts] = useState([]);
  const [minTarget, setMinTarget] = useState(0);
  const [catalystDate, setCatalystDate] = useState(0);
  const [catalystTime, setCatalystTime] = useState(0);

  const onUpload = (event) => {
    if (!catalystDate || !catalystTime) {
      alert("Please input a Catalyst First");
      return;
    }
    const file = event.target.files[0];

    csvParse.parse(file, {
      complete: (results, file) => {
        //FIRST FILTER THROUGH ALL POTENTIAL BUYERS AND FIND THOSE WHO PURCHASED TOTAL AMOUNT ABOVE MINIMUN, BEFORE THE CATALYST TIME
        const buyerAmounts = {};
        const buyers = {};
        let catalystIndex = 1;
        for (let i = 1; i < results.data.length - 1; i++) {
          //VAR TO STORE CURRENT TRANSACTION
          const tx = results.data[i];
          //ONLY LOOK AT TRANSACTION IF ITS ANY TYPE OF SWAP OR EXECUTION
          if (
            tx[7].slice(0, 4) === "Swap" ||
            tx[7] === "Unoswap" ||
            tx[7] === "Execute"
          ) {
            //VARS TO STORE ALL DATA WE NEED FROM THE TRANSACTION
            const amount = parseFloat(tx[6].replaceAll(",", ""));
            const dateTime = tx[3];
            const splitter = dateTime.indexOf(" ");
            const date = dateTime.slice(0, splitter);
            const time = dateTime.slice(splitter);
            //WHEN WE REACH THE TRANSACTION WITH A TIME THAT IS GREATER THAN THE CATALYST TIME, WE CAN SET THE CATALYST INDEX FOR THE NEXT LOOP, AND BREAK
            if (
              !helperFunctions.compareDates(date, catalystDate) ||
              (helperFunctions.compareDates(date, catalystDate) &&
                !helperFunctions.compareTimes(time, catalystTime))
            ) {
              catalystIndex = i;
              break;
            }
            //IF BOTH DATE IS BEFORE OR SAME AS CATALYST, AND TIME IS BEFORE CATALYST, TRANSACTION WILL BE LOOKED AT
            if (
              helperFunctions.compareDates(date, catalystDate) &&
              helperFunctions.compareTimes(time, catalystTime)
            ) {
              //TRACKING HOW MUCH WAS PURCHASED BY ONE WALLET
              if (!(tx[5] in buyerAmounts)) {
                buyerAmounts[tx[5]] = amount;
              } else {
                buyerAmounts[tx[5]] += amount;
              }
              //IF AMOUNT PURCHASED EVER BECOMES GREATER THAN MIN AMOUNT, WE ADD TO BUYERS THAT WE ARE GOING TO LOOK AT LATER
              if (buyerAmounts[tx[5]] > minTarget) {
                buyers[tx[5]] = buyerAmounts[tx[5]];
              }
            }
          }
        }
        console.log(buyers, "buyers");
        console.log(catalystIndex);
        const sellers = {};
        const sharks = {};
        //LOOP ONLY ON TRANSACTIONS AFTER THE CATALYST, NOW WE SEE WHICH OF THE BUYERS SOLD
        for (let i = catalystIndex; i < results.data.length - 1; i++) {
          const tx = results.data[i];
          if (
            tx[7].slice(0, 4) === "Swap" ||
            tx[7] === "Unoswap" ||
            tx[7] === "Execute"
          ) {
            const amount = parseFloat(tx[6].replaceAll(",", ""));
            //WE ONLY WANT TO LOOK AT THOSE WHO ARE SELLING, WHO ARE IN OUR BUYERS OBJECT
            if (tx[4] in buyers) {
              if (!(tx[4] in sellers)) {
                sellers[tx[4]] = { bought: buyers[tx[4]], sold: amount };
              } else {
                sellers[tx[4]].sold += amount;
              }
            }
            // const dateTime = tx[3];
            // const splitter = dateTime.indexOf(" ");
            // const date = dateTime.slice(0, splitter);
            // const time = dateTime.slice(splitter);
            // if (
            //   helperFunctions.compareDates(date, catalystDate) &&
            //   helperFunctions.compareTimes(time, catalystTime)
            // ) {
            //   if (amount > minTarget) {
            //     if (buyers[tx[5]] !== undefined) {
            //       buyers[tx[5]] += amount;
            //     } else {
            //       buyers[tx[5]] = amount;
            //     }
            //   }
            // } else if (
            //   !helperFunctions.compareDates(date, catalystDate) ||
            //   (helperFunctions.compareDates(date, catalystDate) &&
            //     !helperFunctions.compareTimes(time, catalystTime))
            // ) {
            //   if (buyers[tx[4]] !== undefined) {
            //     if (sharks[tx[4]] !== undefined) {
            //       sharks[tx[4]] += amount;
            //     } else {
            //       sharks[tx[4]] = amount;
            //     }
            //   }
            // }
          }
        }
        const sharksArray = Object.entries(sellers);
        setSharkAccounts(sharksArray);
      },
    });
  };
  return (
    <div>
      <div>
        <label htmlFor="minTokenInput">
          Minimum Amount of Tokens to Check:
        </label>
        <input
          type="number"
          id="minTokenInput"
          onChange={(event) => {
            setMinTarget(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="catalystDateInput">Set the Catalyst Date:</label>
        <input
          type="date"
          id="catalystDateInput"
          onChange={(event) => {
            setCatalystDate(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="catalystTimeInput">Set the Catalyst Time:</label>
        <input
          type="time"
          id="catalystTimeInput"
          onChange={(event) => {
            setCatalystTime(event.target.value);
          }}
        />
      </div>
      <div id="upload__div">
        <p id="upload__text">Upload your token history below!</p>
        <input id="fileItem" type="file" onChange={onUpload} />
      </div>
      <div>
        <h2>Sharks:</h2>
        <ul>
          {sharkAccounts.map(([wallet, amounts], index) => {
            return (
              <li key={index}>
                {wallet} bought: {amounts.bought} sold: {amounts.sold}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HistoryUpload;
