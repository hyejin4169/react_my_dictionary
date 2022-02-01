import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const LOAD = "dictionary/LOAD";
const CREATE = "dictionary/CREATE";
const UPDATE = "dictionary/UPDATE";
const DELETE = "dictionary/DELETE";
const LOADED = "dictionary/LOADED";

const initialState = {
  is_loaded: false,
  list: [],
};

// Action Creators (타입별로 액션 만듦)
export function loadDictionary(dictionary_list) {
    console.log("불러올거야!")
  return { type: LOAD, dictionary_list };
  }

export function createDictionary(dictionary) {
  console.log("액션을 생성할거야! : createdictionary");
  return { type: CREATE, dictionary: dictionary };
}

export function updateDictionary(dictionary_index){
  return { type: UPDATE, dictionary_index };
}

export function deleteDictionary(dictionary_index) {
  console.log("지울 사전 인덱스", dictionary_index);
  return { type: DELETE, dictionary_index };
}

export function isLoaded(loaded){
    return { type: LOADED, loaded };
  }

//middlewares
export const loadDictionaryFB = () => {
    return async function (dispatch) { //비동기통신이라 async 붙임
      const dictionary_data = await getDocs((collection(db, "dictionary"))); // 한 컬렉션 내 데이터 모두 가지고 올 수 있음
      console.log(dictionary_data);
  
      let dictionary_list = [];
  
      dictionary_data.forEach((dictionary) => {
        console.log(dictionary.data());
        dictionary_list.push({id: dictionary.id, ...dictionary.data()});
      });
  
      console.log(dictionary_list)
  
      dispatch(loadDictionary(dictionary_list));
    };
  };

export const addDictionaryFB = (dictionary) => {
    return async function (dispatch) {
      dispatch(isLoaded(false));
      const docRef = await addDoc(collection(db, "dictionary"), dictionary);
      const _dictionary = await getDoc(docRef);
      const dictionary_data = {id: _dictionary.id, ..._dictionary.data()};
  
      dispatch(createDictionary(dictionary_data));
    }
  }

  export const updateDictionaryFB = (dictionary_id) => {
    return async function (dispatch, getState) {
      const docRef = doc(db, "dictionary", dictionary_id);
      await updateDoc(docRef, { completed: true });
  
      console.log(getState().dictionary);
      const _dictionary_list = getState().dictionary.list;
      const dictionary_index = _dictionary_list.findIndex((d) => {
        return d.id === dictionary_id;
      })
      dispatch(updateDictionary(dictionary_index));
    };
  };

  export const deleteDictionaryFB = (dictionary_id) => {
    return async function (dispatch, getState) {
      if(!dictionary_id) {
        window.alert("삭제하시겠습니까?")
        return;
      }
      const docRef = doc(db, "dictionary", dictionary_id);
      await deleteDoc(docRef);
  
      const _dictionary_list = getState().dictionary.list;
      const dictionary_index = _dictionary_list.findIndex((d) => {
        return d.id === dictionary_id;
      });
  
      dispatch(deleteDictionary(dictionary_index));
    }
  }

  // Reducer 
export default function reducer(state = initialState, action = {}) {
    //파라미터에 어떤 값을 주는 것을 기본값을 주는 것이라고 한다 / 파라미터에 값이 들어오지 않으면 {} 이렇게 비워줌
    switch (action.type) {
      case "dictionary/LOAD": {
        return {list: action.dictionary_list, is_loaded: true};
      }
      case "dictionary/CREATE": {
        console.log("이제 값을 추가할거야!");
        console.log("action.dictionary : " + action.dictionary)
        console.log("state.list : " + state.list)
        const new_dictionary_list = [...state.list, ...action.dictionary]; //list에 들어갈 새로운 배열 추가
        return { ...state, list: new_dictionary_list, is_loaded: true };
      }
  
      case "dictionary/UPDATE": {
  
        const new_dictionary_list = state.list.map((l, idx) => {
          if(parseInt(action.dictionary_index) === idx){
            return {...l, completed: true};
          } else {
            return l;
          }
      });
      console.log({list: new_dictionary_list});
      return { ...state, new_dictionary_list}
    };
  
      case "dictionary/DELETE": {
          console.log(state, action);
          const new_dictionary_list = state.list.filter((l, idx) => {
              return parseInt(action.dictionary_index) !== idx;
          });
          
          return { ...state, new_dictionary_list};
      }
  
      case "dictionary/LOADED": {
        
        return { ...state, is_loaded: action.loaded} ;
    }
  
      // do reducer stuff (리듀서가 하는 일)
      default:
        return state;
    }
  }
  