import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./reducers/";

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </Router>
    </Provider>,
    document.getElementById("root")
);
