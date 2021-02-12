import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Market from "./components/Market";
import Purchased from "./components/Purchased";
import Profile from "./components/Profile";
import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/market"
            render={(props) => <Market className="container" props />}
          />
          <Route path="/purchased" component={Purchased} />
          <Route path="/profile" component={Profile} />
          <Redirect to="/" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
