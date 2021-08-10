import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import Router from "./router";
import "./style/main.scss";
import store from "./ducks/configStore";
import { ChatProvider } from "./pages/chat/ChatProvider";

ReactDOM.render(
  <Provider store={store}>
    <ChatProvider>
      <Router />
    </ChatProvider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
