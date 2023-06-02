const csvParse = require("papaparse");
import helperFunctions from "./helperFunctions";
import { resetState } from "../reducers/catalystReducer";

const onUpload = (file, catalystState, setSharkAccounts, dispatch) => {
  //GRAB RELEVENT PARTS OF THE STATE
  const { minTokens, catalystDate, catalystTime, catalystWindow } =
    catalystState;

  if (!catalystDate || !catalystTime) {
    alert("Please input a Catalyst First");
    dispatch(resetState());
    return;
  }

  if (!file) {
    alert("Invalid file uploaded");
    dispatch(resetState());
    return;
  }

  if (
    helperFunctions.checkTimeValidity(catalystTime, catalystWindow) === false
  ) {
    alert("Inputted catalyst window makes time invalid");
    dispatch(resetState());
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
        dispatch(resetState());
        return;
      }
      //GET THE NEW TIMES, AFTER ACCOUNTING FOR THE PASSED IN WINDOW
      const catalystStartWindow = helperFunctions.decrementTime(
        catalystTime,
        catalystWindow
      );
      const catalystEndWindow = helperFunctions.incrementTime(
        catalystTime,
        catalystWindow
      );
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
          //WHEN WE REACH THE TRANSACTION WITH A TIME THAT IS GREATER THAN THE CATALYST TIME, OR A DATE GREATER, WE CAN SET THE CATALYST INDEX FOR THE NEXT LOOP, AND BREAK
          if (
            !helperFunctions.compareDates(date, catalystDate) ||
            (helperFunctions.compareDateEquality(date, catalystDate) &&
              !helperFunctions.compareTimes(time, catalystTime))
          ) {
            catalystIndex = i;
            break;
          }
          //IF BOTH DATE IS SAME AS CATALYST, AND TIME IS BEFORE CATALYST TIME, AND TIME IS AFTER THE CATALYST START WINDOW, TRANSACTION WILL BE LOOKED AT
          if (
            helperFunctions.compareDateEquality(date, catalystDate) &&
            helperFunctions.compareTimes(time, catalystTime) &&
            !helperFunctions.compareTimes(time, catalystStartWindow)
          ) {
            //TRACKING HOW MUCH WAS PURCHASED BY ONE WALLET
            if (!(tx[5] in buyerAmounts)) {
              buyerAmounts[tx[5]] = { bought: amount, firstPurchase: dateTime };
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
          const dateTime = tx[3];
          const splitter = dateTime.indexOf(" ");
          const date = dateTime.slice(0, splitter);
          const time = dateTime.slice(splitter);
          if (
            helperFunctions.compareTimes(time, catalystEndWindow) &&
            helperFunctions.compareDateEquality(date, catalystDate)
          ) {
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
      }
      const sharksArray = Object.entries(sellers);
      setSharkAccounts(sharksArray);
      //RESET STATE OF INPUT FIELDS UPON COMPLETION
      dispatch(resetState());
    },
  });
};

export default onUpload;
