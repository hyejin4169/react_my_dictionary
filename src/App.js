import React from "react";
import styled from "styled-components";
import { Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadDictionaryFB } from "./redux/modules/dictionarylist";

import DictionaryList from "./DictionaryList";
import Add from "./Add";
import Edit from "./Edit"

import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// const addDictionaryList = () => {
//   dispatch(addDictionaryFB({text : text.current.value, completed: false}));
// };

function App() {
  const [list, setList] = React.useState([
    "영화관 가기",
    "매일 책읽기",
    "수영 배우기",
  ]);
  const history = useHistory();
  const dispatch = useDispatch();
  const text = React.useRef(null);

  React.useEffect(() => {
    console.log(db);
    dispatch(loadDictionaryFB());
  }, []);

  return (
    <div className="App">
      <Title
        onClick={() => {
          history.push("/");
        }}
      >
        영어 단어장
      </Title>
      <Line />
      <Container>
        <Route path="/" exact>
          <DictionaryList list={list} />
        </Route>
        <Route path="/Add" component={Add}></Route>
        <Route path="/Edit" component={Edit}></Route>
      </Container>
      <button
        onClick={() => {
          history.push("/Add");
        }}
      >
        추가하기
      </button>
    </div>
  );
}

const Container = styled.div`
  max-width: 350px;
  min-height: 20vh;
  background: linear-gradient(to left, #ffaaaf, #ffe6eb);
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h3`
  color: #ff607f;
  text-align: center;
  font-size: 30px;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

export default App;
