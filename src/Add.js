import React from "react";
import { Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDictionaryFB } from "./redux/modules/dictionarylist";


function Add() {
  const history = useHistory();
  const dispatch = useDispatch();
  const text = React.useRef(null);

  const addDictionaryList = () => {
    dispatch(addDictionaryFB({text : text.current.value, completed: false}));
  };



  return (
      <div>
        <input type="text" ref={text} />
        <button onClick={addDictionaryList}>저장하기</button>

      </div>
  );
}




export default Add;
