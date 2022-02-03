import React from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateDictionaryFB } from "./redux/modules/dictionarylist";

const Update = (props) => {
  const location = useLocation();
  const editId = location.state.id;
  const singleData = useSelector((state) => state.dictionary.list);
  const newSingleData = singleData.filter((filteredData, index) => {
    return filteredData.id === editId;
  });
  console.log("newSingleData : " + newSingleData);
  console.log("singleData : " + singleData);
  const history = useHistory();
  const dispatch = useDispatch();

  // const params = useParams();
  // const dictionary_id = {dictionary_id : params.dictionary_id};
  // console.log("params :" + params)

  const wordRef = React.useRef(null);
  const defRef = React.useRef(null);
  const expRef = React.useRef(null);

  // React.useEffect(() => {
  //   dispatch(singleLoadDictionaryFB(editId));
  // }, []);

  const updateDictionaryList = (dictionary_id) => {
    dispatch(
      updateDictionaryFB(dictionary_id, {
        word: wordRef.current.value,
        def: defRef.current.value,
        exp: expRef.current.value,
      })
    );
    history.push("/");
  };

  return (
    <ItemStyle>
      <ListTitle>단어</ListTitle>
      <input type="text" ref={wordRef} defaultValue={newSingleData[0].word} />
      <ListTitle>의미</ListTitle>
      <input type="text" ref={defRef} defaultValue={newSingleData[0].def} />
      <ListTitle>예문</ListTitle>
      <input type="text" ref={expRef} defaultValue={newSingleData[0].exp} />
      <Button
        type="submit"
        onClick={() => {
          updateDictionaryList(editId);
        }} style= {{cursor: "pointer"}}
      >
        수정하기
        </Button>
        </ItemStyle>
  );
};

const ItemStyle = styled.div`
  background: linear-gradient(to left, #fff978, #ffe6eb);
  padding: 40px;
  padding-top: 20x;
  margin: 30px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  text-align: center;
  width: 300px;
`;

const ListTitle = styled.div`
  color: #ff9100;
  font-weight: bold;
  text-decoration: underline;
  text-underline-position: under;
  padding: 5px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FF9614;
  background-color: #FFDFB0;
  width: 200px;
  height: 40px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 5px;
  margin: auto;
  margin-top: 20px;
`;

export default Update;
