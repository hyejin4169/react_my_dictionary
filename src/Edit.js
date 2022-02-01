import React from "react";
import { Route, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateDictionaryFB } from "./redux/modules/dictionarylist";

function Edit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const text = React.useRef(null);
  const params = useParams();
  const dictionary_index = params.index;
  const dictionary_list = useSelector((state) => state.dictionary.list);

  const updateDictionaryList = (dictionary_id) => {
    dispatch(updateDictionaryFB(dictionary_id, {
      ref: {text}
    }));
    history.push("/");
  };

  return (
    <div>
      <input type="text" ref={text} />
          <button type='submit' onClick={() => {
            dispatch(updateDictionaryList(dictionary_list[dictionary_index].id));
            history.push("/");
          }}>
            수정하기
          </button>
    </div>
  );
}

export default Edit;
