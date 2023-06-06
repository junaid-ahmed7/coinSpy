const csvParse = require("papaparse");
import { setSharkAccounts } from "../reducers/catalystReducer";
import { dateTimeUtils } from "./dateTimeUtils";

const onUpload = (file, catalystState, dispatch) => {
  //GRAB RELEVENT PARTS OF THE STATE
  const { minTokens, catalyst, catalystStartWindow, catalystEndWindow } =
    catalystState;
  if (
    catalystStartWindow === "2023-06-01T00:00" ||
    catalystEndWindow === "2023-06-01T00:00" ||
    catalyst === "2023-06-01T00:00"
  ) {
    alert("Please input a Catalyst First");
    return;
  }

  if (!file) {
    alert("Invalid file uploaded");
    return;
  }
  //IF CATALYST IS AFTER THE END WINDOW, OR IF START WINDOW IS AFTER THE END WINDOW, OR IF START WINDOW IS AFTER THE CATALYST, TIME COMPARISONS ARE INVALID
  if (
    dateTimeUtils.compareDateTimes(catalyst, catalystEndWindow) ||
    dateTimeUtils.compareDateTimes(catalystStartWindow, catalystEndWindow) ||
    dateTimeUtils.compareDateTimes(catalystStartWindow, catalyst)
  ) {
    alert("Invalid Catalyst Timings");
    return;
  }

  csvParse.parse(file, {
    complete: (results) => {
      //FIRST FILTER THROUGH ALL POTENTIAL BUYERS AND FIND THOSE WHO PURCHASED TOTAL AMOUNT ABOVE MINIMUN, BEFORE THE CATALYST TIME
      const buyerAmounts = {};
      const buyers = {};
      let catalystIndex = 1;
      if (!results.data || results.data.length <= 1) {
        alert("Invalid file uploaded");
        return;
      }
      if (
        !Array.isArray(results.data) ||
        !Array.isArray(results.data[0]) ||
        results.data[0][0] !== "Txhash"
      ) {
        alert("Invalid CSV File");
        return;
      }
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
          //DATETIME FROM TRANSACTION CONVERTED TO JS DATE OBJECT FOR COMPARISON WITH CATALYSTS
          const dateTime = dateTimeUtils.convertStringToDate(tx[3]);
          //WHEN WE REACH THE TRANSACTION WITH A TIME THAT IS GREATER THAN THE CATALYST TIME, OR A DATE GREATER, WE CAN SET THE CATALYST INDEX FOR THE NEXT LOOP, AND BREAK
          if (dateTimeUtils.compareDateTimes(dateTime, catalyst)) {
            catalystIndex = i;
            break;
          }
          //IF LAST CHECK WASNT TRUE, CURRENT DATE TIME IS BEFORE THE CATALYST TIME, SO NEED TO CHECK IF THE CURRENT DATETIME IS AFTER THE CATALYST START WINDOW
          if (dateTimeUtils.compareDateTimes(dateTime, catalystStartWindow)) {
            //TRACKING HOW MUCH WAS PURCHASED BY ONE WALLET
            if (!(tx[5] in buyerAmounts)) {
              buyerAmounts[tx[5]] = {
                bought: amount,
                firstPurchase: dateTime.toString(),
              };
            } else {
              buyerAmounts[tx[5]].bought += amount;
            }
            //IF AMOUNT PURCHASED EVER BECOMES GREATER THAN MIN AMOUNT, WE ADD TO BUYERS THAT WE ARE GOING TO LOOK AT LATER
            if (buyerAmounts[tx[5]].bought > Number(minTokens)) {
              buyers[tx[5]] = buyerAmounts[tx[5]];
            }
          }
        }
      }
      const sellers = {};
      //LOOP ONLY ON TRANSACTIONS AFTER THE CATALYST, NOW WE SEE WHICH OF THE BUYERS SOLD
      for (let i = catalystIndex; i < results.data.length - 1; i++) {
        const tx = results.data[i];
        if (
          tx[7].slice(0, 4) === "Swap" ||
          tx[7] === "Unoswap" ||
          tx[7] === "Execute"
        ) {
          const amount = parseFloat(tx[6].replaceAll(",", ""));
          const dateTime = dateTimeUtils.convertStringToDate(tx[3]);
          //IF CURRENT TRANSACTION TIME IS AFTER THE CATALYST END WINDOW, NO MORE TRANSACTIONS TO LOOK AT, SO WE BREAK
          if (dateTimeUtils.compareDateTimes(dateTime, catalystEndWindow)) {
            break;
          }
          //WE ONLY WANT TO LOOK AT THOSE WHO ARE SELLING, WHO ARE IN OUR BUYERS OBJECT
          if (tx[4] in buyers) {
            if (!(tx[4] in sellers)) {
              sellers[tx[4]] = { ...buyers[tx[4]], sold: amount };
            } else {
              sellers[tx[4]].sold += amount;
            }
          }
        }
      }
      const sharksArray = Object.entries(sellers);
      dispatch(setSharkAccounts(sharksArray));
    },
  });
};

export default onUpload;
