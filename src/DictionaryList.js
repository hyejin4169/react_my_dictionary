import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteDictionaryFB } from "./redux/modules/dictionarylist";
import { ImPencil } from "react-icons/im";
import { FiTrash2 } from "react-icons/fi";
import { BiFolderPlus } from "react-icons/bi";

const DictionaryList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const my_lists = useSelector((state) => state.dictionary.list);
  console.log("my_lists :" + my_lists);

  // const params = useParams(); 파라미터로 보내려면 주소에 파라미터를 보내야 하는데 그런게 없어서 쓸 필요가 없음(예: /:good)
  // console.log("params : " + params)
  // const dictionary_index = params.index;
  // const dictionary_list = useSelector((state) => state.dictionary.list);

  // const deleteDictionaryList = (dictionary_index) => {
  //   dispatch(deleteDictionaryFB(dictionary_list[dictionary_index].id));
  // }

  return (
    <Dictionarystyle>
      {my_lists.map((list, index) => {
        return (
          <div key={index}>

            <ItemStyle className="list_item">

              <IconStyle>
                <label key={index}>
                  <ImPencil
                    onClick={() => {
                      history.push({
                        pathname: "/Edit",
                        state: { id: list.id },
                      });
                    }}
                    key={index}
                    size={20}
                    style={{
                      marginRight: 3,
                      cursor: "pointer",
                    }}
                  />
                </label>

                <label>
                  <FiTrash2
                    onClick={() => {
                      dispatch(deleteDictionaryFB(list.id));
                    }}
                    className="click"
                    size={20}
                    style={{
                      marginRight: 3,
                      cursor: "pointer",
                    }}
                  />
                </label>
              </IconStyle>

              <ListTitle>단어</ListTitle>
              <ListContent>{list.word}</ListContent>
              <ListTitle>의미</ListTitle>
              <ListContent>{list.def}</ListContent>
              <ExpTitle>예문</ExpTitle>
              <ExpContent>{list.exp}</ExpContent>
            </ItemStyle>
          </div>
        );
      })}

      <PlusIconstyle>
        <label>
          <BiFolderPlus
            onClick={() => {
              history.push("/Add");
            }}
            size={50}
            style={{
              cursor: "pointer",
            }}
          />
        </label>
      </PlusIconstyle>

    </Dictionarystyle>
  );
};

const Dictionarystyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 50vh;
`;

const ItemStyle = styled.div`
  background: linear-gradient(to left, #fff978, #ffe6eb);
  padding: 40px;
  padding-top: 20x;
  margin: 30px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  text-align: center;
`;

const IconStyle = styled.div`
  color: #a48654;
  display: flex;
  justify-content: flex-end;
`;

const ListTitle = styled.div`
  color: #ff9100;
  font-weight: bold;
  text-decoration: underline;
  text-underline-position: under;
`;

const ListContent = styled.div`
  color: #ff9100;
  padding: 5px;
`;

const ExpTitle = styled.div`
  color: #3296d7;
  font-weight: bold;
  text-decoration: underline;
  text-underline-position: under;
`;

const ExpContent = styled.div`
  color: #3296d7;
  width: 200px;
  height: 10px;
  padding: 5px;
  margin-bottom: 13px;
  align-items: center;
`;

const PlusIconstyle = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  color: #FFB900;
  background-color: #FDF5D2;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  bottom: 10px;
  right: 10px;
  box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px; 
`;

export default DictionaryList;
