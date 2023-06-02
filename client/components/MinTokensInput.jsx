import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTokens } from "../reducers/catalystReducer";

const MinTokensInput = () => {
  const minTokens = useSelector((state) => state.catalyst.minTokens);
  const dispatch = useDispatch();

  const handleSetTokens = (tokens) => {
    //HANDLE DECIMAL INPUTS
    const rounded = Math.floor(tokens);
    dispatch(setTokens(rounded));
  };

  return (
    <div>
      <label htmlFor="minTokenInput">Minimum Amount of Tokens to Check:</label>
      <input
        type="number"
        min="0"
        value={minTokens}
        id="minTokenInput"
        onChange={(event) => handleSetTokens(Number(event.target.value))}
      />
    </div>
  );
};

export default MinTokensInput;
