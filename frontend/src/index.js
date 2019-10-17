import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";

const initialState = {
    // initial variables
  };
  
  const mainReducer = (state = initialState, action) => {
    switch (action.type) {
    // TEMPLATE
    //   case "Action-Name":
    //       return {
    //           ...state,
    //           variables to manipulate
    //       }
      default:
        return state;
    }
  };
  
  const store = createStore(
    mainReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  