import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import { Register, Login, Dashboard, LandingPage } from "./components";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
        </div>
    );
}

export default App;
