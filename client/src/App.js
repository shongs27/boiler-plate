import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import Footer from "./components/views/Footer/Footer";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./components/hoc/auth";

function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          {/* 이렇게 작성하면 props를 쓸 수 없다
          <Route exact path="/">
            <div>
              <LandingPage />
            </div>
          </Route> */}
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          {/* <Route exact path="/footer" component={Auth(Footer)} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
