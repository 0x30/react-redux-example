import "./App.css";
import React, { FunctionComponent, useRef, useState } from "react";

import { createStore } from "redux";
import {
  connect,
  ConnectedProps,
  Provider,
  useDispatch,
  useSelector,
} from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToDo {
  name: string;
  finished: boolean;
}

const toDoListSlice = createSlice({
  name: "todolist",
  initialState: [] as ToDo[],
  reducers: {
    addTodo(state, actione) {
      state.push({ name: actione.payload, finished: false });
    },
    finishTodo(state, action: PayloadAction<{name: string}>) {
      const todo = state.find((todo) => todo.name === action.payload.name);
      if (todo) {
        todo.finished = !todo.finished;
      }

      console.log("?????");
    },
  },
});

const store = createStore(toDoListSlice.reducer);
type RootState = ReturnType<typeof store.getState>;

const { addTodo, finishTodo } = toDoListSlice.actions;

const connector = connect(
  (state: RootState) => {
    return {
      todos: state,
    };
  },
  (dispatch) => {
    return {
      addTodo: (name: string) => dispatch(addTodo(name)),
      finishTodo: (name: string) => dispatch(finishTodo({name: name})),
    };
  }
);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux) {
  const { todos, addTodo: addTodo2, finishTodo } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const toDoList = useSelector((state: RootState) => state);

  const addTodo = () => {
    const value = inputRef.current?.value;
    if (!value || value.length <= 0) {
      return;
    }
    inputRef.current && (inputRef.current!.value = "");
    addTodo2(value);
  };

  return (
    <>
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={addTodo}>增加</button>
      </div>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.name}>
              <input
                type="checkbox"
                onChange={() => {
                  finishTodo(todo.name);
                }}
                checked={todo.finished}
              />
              {todo.name}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

const CApp = connector(App)

export default function App2() {
  return (
    <Provider store={store}>
      <CApp></CApp>
    </Provider>
  );
}
