import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTime } from "../reducers/catalystReducer";

const CatalystTimeInput = () => {
  const time = useSelector((state) => state.catalyst.catalystTime);
  const dispatch = useDispatch();

  const handleSetTime = (time) => {
    dispatch(setTime(time));
  };
  return (
    <div>
      <label htmlFor="catalystTimeInput">Set the Catalyst Time:</label>
      <input
        value={time}
        type="time"
        id="catalystTimeInput"
        onChange={(event) => {
          handleSetTime(event.target.value);
        }}
      />
    </div>
  );
};

export default CatalystTimeInput;
