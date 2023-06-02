import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../reducers/catalystReducer";

const CatalystDateInput = () => {
  const date = useSelector((state) => state.catalyst.catalystDate);
  const dispatch = useDispatch();

  const handleSetDate = (date) => {
    dispatch(setDate(date));
  };
  return (
    <div>
      <label htmlFor="catalystDateInput">Set the Catalyst Date:</label>
      <input
        value={date}
        type="date"
        id="catalystDateInput"
        onChange={(event) => {
          handleSetDate(event.target.value);
        }}
      />
    </div>
  );
};

export default CatalystDateInput;
