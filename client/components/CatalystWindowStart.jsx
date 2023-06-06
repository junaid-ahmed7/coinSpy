import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCatalystStart } from "../reducers/catalystReducer";

const CatalystWindowStartInput = () => {
  const catalystStart = useSelector(
    (state) => state.catalyst.catalystStartWindow
  );

  const dispatch = useDispatch();

  const handleSetCatalystStart = (window) => {
    dispatch(setCatalystStart(window));
  };
  return (
    <div>
      <label htmlFor="catalystStart">
        Date & Time to start at before Catalyst:{" "}
      </label>
      <input
        value={catalystStart}
        type="datetime-local"
        id="catalystStart"
        onChange={(event) => {
          handleSetCatalystStart(event.target.value);
        }}
      />
    </div>
  );
};

export default CatalystWindowStartInput;
