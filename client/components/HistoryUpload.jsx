import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CSVDownloadButton from "./CSVDownloadButton";
import MinTokensInput from "./MinTokensInput";
import CatalystWindowStart from "./CatalystWindowStart";
import Catalyst from "./Catalyst";
import CatalystWindowEndInput from "./CatalystWindowEnd";
import onUpload from "../helper-functions/uploadFunction";
import Reset from "./Reset";
import SharkList from "./SharkList";

const HistoryUpload = () => {
  const catalystState = useSelector((state) => state.catalyst);
  const dispatch = useDispatch();
  const sharkAccounts = catalystState.sharkAccounts;

  const handleUpload = (event) => {
    const file = event.target.files[0];
    onUpload(file, catalystState, dispatch);
    event.target.value = "";
  };
  return (
    <div>
      <div className="inputs__container">
        <MinTokensInput />
        <CatalystWindowStart />
        <Catalyst />
        <CatalystWindowEndInput />
        <Reset />
      </div>
      <div id="upload__div">
        <label htmlFor="fileItem" className="file__button">
          Upload Token History
        </label>
        <input
          id="fileItem"
          type="file"
          className="file__input"
          onChange={handleUpload}
        />
      </div>
      <CSVDownloadButton sharkAccounts={sharkAccounts} />
      <SharkList sharkAccounts={sharkAccounts} />
    </div>
  );
};

export default HistoryUpload;
