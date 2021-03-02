import React, { useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Prompt,
} from "react-router-dom";
import { TransitionGroup } from "react-transition-group";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}

        <TransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </TransitionGroup>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <Prompt
        when={true}
        message={(location) => {
          console.log(location, "拦截");

          return true;
        }}
      ></Prompt>
      <h2>Home {new Date().getTime()}</h2>
    </>
  );
}

function About() {
  const histroy = useHistory();
  return (
    <>
      <button onClick={() => histroy.push("/users")}>to users</button>
      <h2>About {new Date().getTime()}</h2>
    </>
  );
}

function Users() {
  const [count, setCount] = useState(0);

  const count2 = useMemo(() => count, [count]);

  return (
    <h2>
      Users {new Date().getTime()} {count2}
      <button onClick={() => setCount(count + 1)}>点击</button>
      <Title title="???"></Title>
      <CTitle title="???"></CTitle>
    </h2>
  );
}

const Title = function App(props: { title: string }) {
  console.log("?????=====");
  return <div>{props.title}</div>;
};

const CTitle = React.memo(Title);
