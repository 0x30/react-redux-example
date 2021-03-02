import { createSlice, createStore } from "@reduxjs/toolkit";
import { connect, ConnectedProps, Provider } from "react-redux";

const CountSlice = createSlice({
  name: "CountSlice",
  initialState: {
    value: Number.parseInt(localStorage.getItem("count") || "0"),
  },
  reducers: {
    increase: (state) => {
      state.value++;
      localStorage.setItem("count", `${state.value}`);
    },
    decrement: (state) => {
      state.value--;
      localStorage.setItem("count", `${state.value}`);
    },
  },
  extraReducers: {},
});

const store = createStore(CountSlice.reducer);
type StoreState = ReturnType<typeof store.getState>;

const connector = connect(
  (state: StoreState) => {
    return { count: state.value };
  },
  (dispatch) => {
    return {
      increase: () => dispatch(CountSlice.actions.increase()),
      decrement: () => dispatch(CountSlice.actions.decrement()),
    };
  }
);

type PropsFromCountSlice = ConnectedProps<typeof connector>;

const App = ({
  name,
  count,
  increase,
  decrement,
}: PropsFromCountSlice & { name: string }) => {
  return (
    <div>
      {count}
      <button onClick={increase}>{name} +1</button>
      <button onClick={decrement}>{name} -1</button>
    </div>
  );
};

const CApp = connector(App);

export default function x() {
  return (
    <>
      <Provider store={store}>
        <CApp name="Redux"></CApp>
      </Provider>
      <button onClick={() => alert(store.getState().value)}>get value</button>
    </>
  );
}
