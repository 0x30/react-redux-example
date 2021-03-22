import { createSlice, createStore, PayloadAction } from "@reduxjs/toolkit";
import { connect, ConnectedProps, Provider } from "react-redux";

interface State {
  value: number;
  hitokotos: string[];
}

const getInitState = (): State => {
  const { value, hitokotos } = JSON.parse(
    window.localStorage.getItem("CountSlice") ?? "{}"
  );
  return {
    value: value ?? 0,
    hitokotos: hitokotos ?? [],
  };
};

const CountSlice = createSlice({
  name: "CountSlice",
  initialState: getInitState(),
  reducers: {
    increase: (state) => {
      state.value++;
    },
    decrement: (state) => {
      state.value--;
    },
    addHitokoto: (state, action: PayloadAction<string>) => {
      state.hitokotos.push(action.payload);
    },
  },
});

const store = createStore(CountSlice.reducer);

store.subscribe(() => {
  window.localStorage.setItem("CountSlice", JSON.stringify(store.getState()));
});

type StoreState = ReturnType<typeof store.getState>;

const connector = connect(
  (state: StoreState) => {
    return { ...state };
  },
  (dispatch) => {
    return {
      increase: () => dispatch(CountSlice.actions.increase()),
      decrement: () => dispatch(CountSlice.actions.decrement()),
      addHitokoto: async () => {
        const { hitokoto } = await fetch(
          "https://v1.hitokoto.cn/"
        ).then((res) => res.json());
        dispatch(CountSlice.actions.addHitokoto(hitokoto));
      },
    };
  }
);

type PropsFromCountSlice = ConnectedProps<typeof connector>;

const App = ({
  name,
  value,
  hitokotos,
  addHitokoto,
  increase,
  decrement,
}: PropsFromCountSlice & { name: string }) => {
  return (
    <div>
      {value}
      <button onClick={increase}>{name} +1</button>
      <button onClick={decrement}>{name} -1</button>
      <button onClick={addHitokoto}>获取内容</button>
      <ul>
        {hitokotos.map((hitokoto, idx) => (
          <ol key={idx}>${hitokoto}</ol>
        ))}
      </ul>
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
