import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWindow } from "../reducers/catalystReducer";

const CatalystWindowInput = () => {
  const window = useSelector((state) => state.catalyst.catalystWindow);

  const dispatch = useDispatch();

  const handleSetWindow = (window) => {
    //HANDLE DECIMAL INPUTS
    const rounded = Math.floor(window);
    dispatch(setWindow(rounded));
  };
  return (
    <div>
      <label htmlFor="catalystWindowInput">Set the Catalyst Window:</label>
      <input
        value={window}
        min="0"
        type="number"
        id="catalystWindowInput"
        onChange={(event) => {
          handleSetWindow(event.target.value);
        }}
      />
    </div>
  );
};

export default CatalystWindowInput;
