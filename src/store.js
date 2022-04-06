import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/main';



const createStoreWithMiddleware = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.navigator.userAgent.includes('Chrome') ?
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
      : compose,
    ),
  );

export default createStoreWithMiddleware;