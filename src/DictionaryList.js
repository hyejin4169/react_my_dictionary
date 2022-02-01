import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteDictionaryFB } from "./redux/modules/dictionarylist";
import { ImPencil } from "react-icons/im";
import { FiTrash2 } from "react-icons/fi";

const DictionaryList = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const dictionary_index = params.index;
  const dictionary_list = useSelector((state) => state.dictionary.list);
  console.log("props :" + props);

  const my_lists = useSelector((state) => state.dictionary.list);

  // const deleteDictionaryList = (dictionary_index) => {
  //   dispatch(deleteDictionaryFB(dictionary_list[dictionary_index].id));
  // }

  return (
    <Dictionarystyle>
      {my_lists.map((list, index) => {
        return (
          <div key={index}>
            <ItemStyle className="list_item">
              <label key={index}>
                <ImPencil
                  onClick={() => {
                    history.push("/Edit");
                  }}
                  key={index}
                  size={15}
                  style={{
                    marginRight: 3,
                    cursor: "pointer",
                  }}
                />
              </label>

              <DeleteStyle>
                <label>
                  <FiTrash2
                  onClick={(
                  ) => {
                    console.log(dictionary_list[dictionary_index])
                    console.log("dictionary_list : " + dictionary_list)
                    dispatch(deleteDictionaryFB(dictionary_list[dictionary_index].id));
                    history.goBack();
                  }}
                    className="click"
                    size={15}
                    style={{
                      marginRight: 3,
                      cursor: "pointer",
                    }}
                  />
                </label>
              </DeleteStyle>
              {list.text}
            </ItemStyle>
          </div>
        );
      })}
    </Dictionarystyle>
  );
};

const Dictionarystyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 50vh;
`;

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  color: ${(props) => (props.completed ? "#fff" : "#333")};
  background-color: ${(props) => (props.completed ? "#673ab7" : "aliceblue")};
`;

const DeleteStyle = styled.div`
  display: flex;
  justify-content: space-around;
  color: #c8386b;
`;

export default DictionaryList;
