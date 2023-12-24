// import React from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./app/App";
// import { store } from "app/store";
// import { Provider } from "react-redux";
//
// const root = createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// );

//===============================================================================================//

// В каком случае возникают конфликты при слиянии веток ?//

//===============================================================================================//
// import { createRoot } from "react-dom/client";
// import React, { useState } from "react";
//
// export const Jpegs = () => {
//   const [fileURL, setFileURL] = useState<any>();
//
//   const onChange = (e: any) => {
//     const maybeFile = e.target.files?.[0];
//     if (maybeFile) {
//       if (maybeFile.type === "image/jpeg") {
//         setFileURL(URL.createObjectURL(maybeFile));
//         return;
//       } else alert("not .jpg!");
//     }
//     setFileURL("");
//   };
//
//   return (
//     <div>
//       <input type={"file"} onChange={onChange} />
//       {fileURL && <img src={fileURL} alt={"avatar"} />}
//     </div>
//   );
// };
//
// const root = createRoot(document.getElementById("root") as HTMLElement);
// root.render(<Jpegs />);

// 📜 Описание:
// Не отображается картинка при выборе.
// В качестве ответа укажите исправленную версию строки кода
//
// 🖥 Пример ответа: value={fileURL}

//===============================================================================================//
// import ReactDOM from 'react-dom/client';
// import React, { FC, ReactNode } from 'react'
//
// const quizStyle: React.CSSProperties = {
//   background: 'lightgreen',
//   padding: '10px',
//   margin: '10px'
// }
//
// type BtnPropsType = {
//   question: ReactNode
//   children: ReactNode
// }
//
// const Block: FC<BtnPropsType> = ({question, children}) => {
//   return (
//     <div style={{display: 'flex', alignItems: 'center'}}>
//       {question} = {children}
//     </div>
//   )
// }
//
//
// const quiz = [
//   {id: 1, question: '1 + 1', answer: '2'},
//   {id: 2, question: '2 + 2', answer: '4'},
//   {id: 3, question: '3 + 3', answer: '6'},
// ]
//
// const App = () => {
//
//   return (
//     <div>
//       {quiz.map((q) => {
//         return (
//           <Block question={'❗❗❗ XXX ❗❗❗'}>
//             ❗❗❗ YYY ❗❗❗
//           </Block>
//         )
//       })}
//     </div>
//   )
// }
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<App/>);

// 📜 Описание:
// Что необходимо написать вместо XXX и YYY, чтобы на экране отобразились вопросы и ответы из массива quiz.
// 1 + 1 = 2
// 2 + 2 = 4
// 3 + 3 = 6
// ❗ Вопрос и ответ должны быть тегом h2 и к ним должен быть прикреплен стиль quizStyle
// ❗ Ответ дайте через пробел

// 🖥 Пример ответа: quiz[0]=yes redux=h2

//===============================================================================================//
// import ReactDOM from "react-dom/client";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import React, { FC, useEffect } from "react";
// import axios from "axios";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
//
// // Styles
// const table: React.CSSProperties = {
//   borderCollapse: "collapse",
//   width: "100%",
//   tableLayout: "fixed",
// };
//
// const th: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
//   background: "lightgray",
//   cursor: "pointer",
// };
//
// const td: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
// };
//
// const thActive: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
//   background: "lightblue",
//   cursor: "pointer",
// };
//
// // Types
// type UserType = {
//   id: string;
//   name: string;
//   age: number;
// };
//
// type UsersResponseType = {
//   items: UserType[];
//   totalCount: number;
// };
//
// type ParamsType = {
//   sortBy: string | null;
//   sortDirection: "asc" | "desc" | null;
// };
//
// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });
//
// const api = {
//   getUsers(params?: ParamsType) {
//     return instance.get<UsersResponseType>("users", { params });
//   },
// };
//
// // Reducer
// const initState = {
//   users: [] as UserType[],
//   activeColumn: null as string | null,
//   params: {
//     sortBy: "name",
//     sortDirection: "asc",
//   } as ParamsType,
// };
// type InitStateType = typeof initState;
//
// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//   switch (action.type) {
//     case "SET_USERS":
//       return { ...state, users: action.users };
//     case "SET_PARAMS":
//       return { ...state, params: { ...state.params, ...action.payload } };
//     case "SET_ACTIVE_COLUMN":
//       return { ...state, activeColumn: action.value };
//     default:
//       return state;
//   }
// };
//
// // Store
// const rootReducer = combineReducers({ app: appReducer });
//
// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// const setUsersAC = (users: UserType[]) => ({ type: "SET_USERS", users }) as const;
// const setParamsAC = (payload: ParamsType) => ({ type: "SET_PARAMS", payload }) as const;
// const setActiveColumnAC = (value: string) => ({ type: "SET_ACTIVE_COLUMN", value }) as const;
// type ActionsType =
//   | ReturnType<typeof setUsersAC>
//   | ReturnType<typeof setParamsAC>
//   | ReturnType<typeof setActiveColumnAC>;
//
// // Thunk
// const getUsersTC = (): AppThunk => (dispatch, getState) => {
//   const params = getState().app.params;
//   api.getUsers(params).then((res) => dispatch(setUsersAC(res.data.items)));
// };
//
// export const Users = () => {
//   const users = useAppSelector((state) => state.app.users);
//   const sortBy = useAppSelector((state) => state.app.params.sortBy);
//   const sortDirection = useAppSelector((state) => state.app.params.sortDirection);
//
//   const dispatch = useAppDispatch();
//
//   useEffect(() => {
//     dispatch(getUsersTC());
//   }, [sortBy, sortDirection]);
//
//   const sortHandler = (sortBy: string) => {
//     const direction = sortDirection === "asc" ? "desc" : "asc";
//     dispatch(setParamsAC({ sortBy, sortDirection: direction }));
//     dispatch(setActiveColumnAC(sortBy));
//   };
//
//   return (
//     <div>
//       <h1>👪 Список пользователей</h1>
//       <table style={table}>
//         <thead>
//           <tr>
//             <Th name={"name"} sortHandler={sortHandler} />
//             <Th name={"age"} sortHandler={sortHandler} />
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => {
//             return (
//               <tr key={u.id}>
//                 <td style={td}>{u.name}</td>
//                 <td style={td}>{u.age}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };
//
// type ThPropsType = {
//   name: string;
//   sortHandler: (name: string) => void;
// };
//
// const Th: FC<ThPropsType> = ({ name, sortHandler }) => {
//   const activeColumn = useAppSelector((state) => state.app.activeColumn);
//   const sortBy = useAppSelector((state) => state.app.params.sortBy);
//   const sortDirection = useAppSelector((state) => state.app.params.sortDirection);
//
//   const condition1 = name === sortBy;
//   const condition2 = activeColumn === name;
//   const condition3 = sortDirection === "desc";
//
//   return (
//     <th style={condition1 ? thActive : th} onClick={() => sortHandler(name)}>
//       {name}
//       {condition1 && condition2 && (condition3 ? <span> ⬆</span> : <span> ⬇</span>)}
//     </th>
//   );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <Provider store={store}>
//     <Users />
//   </Provider>,
// );

// 📜 Описание:
// Перед вами таблица с пользователями.
// Покликайте по вкладкам age и name и убедитесь, что сортировка работает верно,
// но в шапке криво отображаются стрелки и не видно активной колонки
// Ваша задача написать правильные условия вместо XXX YYY и ZZZ, чтобы:
// 1) Стрелки соответствовали сортировке
// 2) Шапка активной колонки была голубая, а неактивной серая
// ❗ Ответ дайте через пробел
//
// 🖥 Пример ответа: a === '1' b !== a c === state

//===============================================================================================//

import ReactDOM from "react-dom/client";
import axios from "axios";
import React from "react";

export const Jpegs = () => {
  const onClick = () => {
    axios.get("https://neko-back.herokuapp.com/file", { responseType: "arraybuffer" }).then((res) => {
      const blob = new Blob([res.data], { type: "image/jpeg" });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;

      link.setAttribute("download", "exam-img.jpg");

      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  return (
    <div>
      <button onClick={onClick}>get img</button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Jpegs />);

// 📜 Описание:
// Картинка сохраняется поломанной.
// Найдите ошибку.
// В качестве ответа укажите исправленную версию строки.
//
// 🖥 Пример ответа: {type: 'image/gif'}

//===============================================================================================//
