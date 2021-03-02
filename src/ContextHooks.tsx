import { createContext, FunctionComponent, useContext, useState } from "react";

const CountContext = createContext({
  count: 0,
  setCount: (count: number) => {},
});

const CountProvider: FunctionComponent = ({ children }) => {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
};

const TestComponent = () => {
  const { count, setCount } = useContext(CountContext);
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>context +1</button>
    </div>
  );
};

export default function App() {
  return (
    <CountProvider>
      <TestComponent></TestComponent>
    </CountProvider>
  );
}
