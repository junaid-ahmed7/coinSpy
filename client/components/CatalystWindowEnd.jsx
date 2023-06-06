import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCatalystEnd } from "../reducers/catalystReducer";

const CatalystWindowEndInput = () => {
  const catalystEnd = useSelector((state) => state.catalyst.catalystEndWindow);

  const dispatch = useDispatch();

  const handleSetCatalystEnd = (window) => {
    dispatch(setCatalystEnd(window));
  };
  return (
    <div>
      <label htmlFor="catalystEnd">
        Date & Time to end at after Catalyst:{" "}
      </label>
      <input
        value={catalystEnd}
        type="datetime-local"
        id="catalystEnd"
        onChange={(event) => {
          handleSetCatalystEnd(event.target.value);
        }}
      />
    </div>
  );
};

export default CatalystWindowEndInput;
