import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CSVDownloadButton from "./CSVDownloadButton";
import MinTokensInput from "./MinTokensInput";
import CatalystDateInput from "./CatalystDate";
import CatalystTimeInput from "./CatalystTime";
import CatalystWindowInput from "./CatalystWindow";
import onUpload from "../helper-functions/uploadFunction";
import SharkList from "./SharkList";

const HistoryUpload = () => {
  const catalystState = useSelector((state) => state.catalyst);
  const dispatch = useDispatch();
  const [sharkAccounts, setSharkAccounts] = useState([]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    onUpload(file, catalystState, setSharkAccounts, dispatch);
    event.target.value = "";
  };
  return (
    <div>
      <div className="inputs__container">
        <MinTokensInput />
        <CatalystDateInput />
        <CatalystWindowInput />
        <CatalystTimeInput />
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
