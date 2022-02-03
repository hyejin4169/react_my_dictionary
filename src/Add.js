import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addDictionaryFB } from "./redux/modules/dictionarylist";

function Add() {
  const history = useHistory();
  const dispatch = useDispatch();
  const wordRef = React.useRef(null);
  const defRef = React.useRef(null);
  const expRef = React.useRef(null);

  const addDictionaryList = () => {
    dispatch(
      addDictionaryFB({
        word: wordRef.current.value,
        def: defRef.current.value,
        exp: expRef.current.value,
        completed: false,
      })
    );
    history.push("/");
  };

  return (
    <ItemStyle>
      <ListTitle>단어</ListTitle>
      <input type="text" ref={wordRef} />
      <ListTitle>의미</ListTitle>
      <input type="text" ref={defRef} />
      <ListTitle>예문</ListTitle>
      <input type="text" ref={expRef} />
      <Button onClick={addDictionaryList} style= {{cursor: "pointer"}}>저장하기</Button>
    </ItemStyle>
  );
}

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

export default Add;
