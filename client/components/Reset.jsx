import React from "react";
import { resetState } from "../reducers/catalystReducer";
import { useDispatch } from "react-redux";

const Reset = () => {
  const dispatch = useDispatch();
  return (
    <button className="reset__button" onClick={() => dispatch(resetState())}>
      Reset
    </button>
  );
};

export default Reset;
