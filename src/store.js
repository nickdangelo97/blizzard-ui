import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import rootReducer from  './modules/rootReducer'


export const history = createBrowserHistory()

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware(history)),
  // other store enhancers if any
);

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    rootReducer: rootReducer
}) 

const store = createStore(createRootReducer(history), enhancer,  /* preloadedState, */
    );

export default store; 