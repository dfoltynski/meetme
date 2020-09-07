import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import "./App.css";

import { Register, Login, Map, Dashboard } from "./components";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/map" component={Map} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
