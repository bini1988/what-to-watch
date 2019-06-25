import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import {NotificationContainer} from "react-notifications";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";

import reducer from "./reducer/reducer";
import App from "./components/app/app.jsx";
import {createApi} from "./api";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const api = createApi({
  url: `https://es31-server.appspot.com/wtw`,
  onError: (error) => {
    const HTTP_CODE_FORBIDDEN = 403;
    const HTTP_CODE_BAD_REQUEST = 400;
    const {response = {}} = error;

    if (response.status && (response.status === HTTP_CODE_FORBIDDEN)) {
      throw new Error(`Ошибка. Данное действие доступно только для авторизованных пользователей`);
    }
    if (response.status && (response.status === HTTP_CODE_BAD_REQUEST)) {
      throw new Error(response.data && response.data.error);
    }
  },
});
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

ReactDOM.render(
    <Provider store={store}>
      <App/>
      <NotificationContainer/>
    </Provider>,
    document.getElementById(`root`)
);

