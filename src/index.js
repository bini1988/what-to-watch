import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";

import reducer from "./reducer/reducer";
import {ActionCreator} from "./reducer/user/user";
import App from "./components/app/app.jsx";
import {createApi} from "./api";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const api = createApi({
  url: `https://es31-server.appspot.com/wtw`,
  onError: (error) => {
    const {response = {}} = error;
    if (response.status && (response.status === 403)) {
      store.dispatch(ActionCreator.loginError(`Ошибка авторизации`));
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
    </Provider>,
    document.getElementById(`root`)
);

