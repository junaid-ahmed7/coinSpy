import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCatalyst } from "../reducers/catalystReducer";

const Catalyst = () => {
  const catalyst = useSelector((state) => state.catalyst.catalyst);

  const dispatch = useDispatch();

  const handleSetCatalyst = (catalyst) => {
    dispatch(setCatalyst(catalyst));
  };
  return (
    <div>
      <label htmlFor="catalyst">Catalyst Date and Time: </label>
      <input
        value={catalyst}
        type="datetime-local"
        id="catalyst"
        onChange={(event) => {
          handleSetCatalyst(event.target.value);
        }}
      />
    </div>
  );
};

export default Catalyst;
