import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import "./App.css";

import { Register, Login } from "./components";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
